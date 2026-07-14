import os
import shutil
import logging
from pathlib import Path
from datetime import datetime, UTC

from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from dotenv import load_dotenv

from database import contacts_collection, settings_collection
from models import ContactMessage, ContactMessageCreate
from email_utils import send_contact_notification

load_dotenv()

BASE_DIR = Path(__file__).parent
UPLOADS_DIR = BASE_DIR / "uploads"
ASSETS_DIR = BASE_DIR / "assets"
UPLOADS_DIR.mkdir(exist_ok=True)
ASSETS_DIR.mkdir(exist_ok=True)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Portfolio API")
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


@api_router.get("/health")
async def health_check():
    return {"status": "ok"}


@api_router.get("/profile/photo")
async def get_profile_photo():
    settings = await settings_collection.find_one({"key": "profile_photo"})
    filename = settings["value"] if settings else DEFAULT_PHOTO_FILENAME
    return {"photo_url": f"/api/uploads/{filename}"}


@api_router.post("/profile/photo")
async def upload_profile_photo(file: UploadFile = File(...)):
    allowed_types = {"image/jpeg", "image/png", "image/webp"}
    if file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail="Only JPEG, PNG or WEBP images are allowed")

    ext = file.filename.split(".")[-1].lower() if "." in file.filename else "jpg"
    new_filename = f"profile-{int(datetime.now(UTC).timestamp())}.{ext}"
    dest_path = UPLOADS_DIR / new_filename

    with dest_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    await settings_collection.update_one(
        {"key": "profile_photo"},
        {"$set": {"key": "profile_photo", "value": new_filename}},
        upsert=True,
    )

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


@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(payload: ContactMessageCreate, background_tasks: BackgroundTasks):
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


@api_router.get("/contact", response_model=list[ContactMessage])
async def list_contact_messages():
    docs = await contacts_collection.find().sort("created_at", -1).to_list(200)
    return [ContactMessage.from_mongo(doc) for doc in docs]


app.include_router(api_router)
