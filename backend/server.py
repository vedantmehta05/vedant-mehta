import os
import shutil
import logging
from pathlib import Path
from datetime import datetime, timedelta, UTC

from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File, BackgroundTasks, Request, Depends, Response, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from dotenv import load_dotenv
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded


def get_client_ip(request: Request) -> str:
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"

from database import (
    contacts_collection,
    settings_collection,
    admins_collection,
    content_collection,
    login_attempts_collection,
)
from models import ContactMessage, ContactMessageCreate, LoginRequest
from email_utils import send_contact_notification
from auth import (
    verify_password,
    create_access_token,
    create_refresh_token,
    get_current_admin,
    seed_admin,
)
from seed_content import SEED_CONTENT

load_dotenv()

BASE_DIR = Path(__file__).parent
UPLOADS_DIR = BASE_DIR / "uploads"
ASSETS_DIR = BASE_DIR / "assets"
UPLOADS_DIR.mkdir(exist_ok=True)
ASSETS_DIR.mkdir(exist_ok=True)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

limiter = Limiter(key_func=get_client_ip)

app = FastAPI(title="Portfolio API")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

api_router = APIRouter(prefix="/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/api/uploads", StaticFiles(directory=str(UPLOADS_DIR)), name="uploads")

DEFAULT_PHOTO_FILENAME = "profile-current.jpg"
CONTENT_SECTIONS = {
    "personal", "about", "experience", "education", "skillCategories",
    "techStack", "projects", "stats", "expertiseRadar", "certifications", "achievements",
}
MAX_FAILED_ATTEMPTS = 5
LOCKOUT_MINUTES = 15


@app.on_event("startup")
async def on_startup():
    await admins_collection.create_index("email", unique=True)
    await login_attempts_collection.create_index("identifier")
    await seed_admin(admins_collection)

    existing_content = await content_collection.find_one({"key": "portfolio"})
    if existing_content is None:
        await content_collection.insert_one({"key": "portfolio", **SEED_CONTENT})


async def require_admin(request: Request):
    return await get_current_admin(request, admins_collection)


@api_router.get("/health")
async def health_check():
    return {"status": "ok"}


# ---------- Auth ----------

@api_router.post("/auth/login")
async def login(payload: LoginRequest, request: Request, response: Response):
    email = payload.email.lower()
    identifier = f"{get_client_ip(request)}:{email}"

    attempt = await login_attempts_collection.find_one({"identifier": identifier})
    if attempt and attempt.get("count", 0) >= MAX_FAILED_ATTEMPTS:
        locked_until = attempt.get("locked_until")
        if locked_until and locked_until > datetime.now(UTC):
            raise HTTPException(status_code=429, detail="Too many failed attempts. Try again later.")

    admin = await admins_collection.find_one({"email": email})
    if not admin or not verify_password(payload.password, admin["password_hash"]):
        await login_attempts_collection.update_one(
            {"identifier": identifier},
            {
                "$inc": {"count": 1},
                "$set": {"locked_until": datetime.now(UTC) + timedelta(minutes=LOCKOUT_MINUTES)},
            },
            upsert=True,
        )
        raise HTTPException(status_code=401, detail="Invalid email or password")

    await login_attempts_collection.delete_one({"identifier": identifier})

    access_token = create_access_token(str(admin["_id"]), admin["email"])
    refresh_token = create_refresh_token(str(admin["_id"]))

    response.set_cookie("access_token", access_token, httponly=True, secure=True, samesite="lax", max_age=60 * 60 * 12, path="/")
    response.set_cookie("refresh_token", refresh_token, httponly=True, secure=True, samesite="lax", max_age=60 * 60 * 24 * 7, path="/")

    return {"email": admin["email"], "name": admin.get("name", "Admin"), "access_token": access_token}


@api_router.post("/auth/logout")
async def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    response.delete_cookie("refresh_token", path="/")
    return {"status": "logged_out"}


@api_router.get("/auth/me")
async def me(admin: dict = Depends(require_admin)):
    return admin


# ---------- Content CMS ----------

@api_router.get("/content")
async def get_content():
    doc = await content_collection.find_one({"key": "portfolio"}, {"_id": 0, "key": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Content not found")
    return doc


@api_router.put("/content/{section}")
async def update_content_section(section: str, payload: dict = Body(...), admin: dict = Depends(require_admin)):
    if section not in CONTENT_SECTIONS:
        raise HTTPException(status_code=400, detail=f"Unknown section '{section}'")
    value = payload.get("value")
    if value is None:
        raise HTTPException(status_code=400, detail="Missing 'value' in request body")
    await content_collection.update_one({"key": "portfolio"}, {"$set": {section: value}})
    return {"section": section, "value": value}


# ---------- Profile photo (admin-only upload, public read) ----------

@api_router.get("/profile/photo")
async def get_profile_photo():
    settings = await settings_collection.find_one({"key": "profile_photo"})
    filename = settings["value"] if settings else DEFAULT_PHOTO_FILENAME
    return {"photo_url": f"/api/uploads/{filename}"}


@api_router.post("/profile/photo")
async def upload_profile_photo(file: UploadFile = File(...), admin: dict = Depends(require_admin)):
    allowed_types = {"image/jpeg", "image/png", "image/webp"}
    if file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail="Only JPEG, PNG or WEBP images are allowed")

    ext = file.filename.split(".")[-1].lower() if "." in file.filename else "jpg"
    new_filename = f"profile-{int(datetime.now(UTC).timestamp())}.{ext}"
    dest_path = UPLOADS_DIR / new_filename

    with dest_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    previous = await settings_collection.find_one({"key": "profile_photo"})

    await settings_collection.update_one(
        {"key": "profile_photo"},
        {"$set": {"key": "profile_photo", "value": new_filename}},
        upsert=True,
    )

    if previous and previous.get("value") and previous["value"] != DEFAULT_PHOTO_FILENAME:
        old_path = UPLOADS_DIR / previous["value"]
        if old_path.exists():
            old_path.unlink()

    return {"photo_url": f"/api/uploads/{new_filename}"}


@api_router.get("/resume/download")
async def download_resume():
    resume_path = ASSETS_DIR / "Vedant_Mehta_Resume.pdf"
    if not resume_path.exists():
        raise HTTPException(status_code=404, detail="Resume not found")
    return FileResponse(
        path=str(resume_path),
        filename="Vedant_Mehta_Resume.pdf",
        media_type="application/pdf",
    )


# ---------- Contact ----------

@api_router.post("/contact", response_model=ContactMessage, response_model_by_alias=False)
@limiter.limit("5/hour")
async def create_contact_message(request: Request, payload: ContactMessageCreate, background_tasks: BackgroundTasks):
    contact = ContactMessage(**payload.model_dump())
    result = await contacts_collection.insert_one(contact.to_mongo())
    contact.id = str(result.inserted_id)

    background_tasks.add_task(
        send_contact_notification,
        contact.name,
        contact.email,
        contact.subject,
        contact.message,
    )

    return contact


@api_router.get("/contact", response_model=list[ContactMessage], response_model_by_alias=False)
async def list_contact_messages(admin: dict = Depends(require_admin)):
    docs = await contacts_collection.find().sort("created_at", -1).to_list(200)
    return [ContactMessage.from_mongo(doc) for doc in docs]


app.include_router(api_router)
