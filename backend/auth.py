import os
import bcrypt
import jwt
from datetime import datetime, timedelta, UTC
from fastapi import Request, HTTPException, Depends

JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_MINUTES = 60 * 12  # 12 hours - single admin convenience session
REFRESH_TOKEN_DAYS = 7


def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode("utf-8"), salt).decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))


def _get_secret() -> str:
    return os.environ["JWT_SECRET"]


def create_access_token(admin_id: str, email: str) -> str:
    payload = {
        "sub": admin_id,
        "email": email,
        "exp": datetime.now(UTC) + timedelta(minutes=ACCESS_TOKEN_MINUTES),
        "type": "access",
    }
    return jwt.encode(payload, _get_secret(), algorithm=JWT_ALGORITHM)


def create_refresh_token(admin_id: str) -> str:
    payload = {
        "sub": admin_id,
        "exp": datetime.now(UTC) + timedelta(days=REFRESH_TOKEN_DAYS),
        "type": "refresh",
    }
    return jwt.encode(payload, _get_secret(), algorithm=JWT_ALGORITHM)


def decode_token(token: str) -> dict:
    return jwt.decode(token, _get_secret(), algorithms=[JWT_ALGORITHM])


async def get_current_admin(request: Request, admins_collection) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = decode_token(token)
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

    admin = await admins_collection.find_one({"email": payload["email"]})
    if not admin:
        raise HTTPException(status_code=401, detail="Admin not found")
    return {"email": admin["email"], "name": admin.get("name", "Admin")}


async def seed_admin(admins_collection):
    admin_email = os.environ["ADMIN_EMAIL"].lower()
    admin_password = os.environ["ADMIN_PASSWORD"]
    existing = await admins_collection.find_one({"email": admin_email})
    if existing is None:
        await admins_collection.insert_one(
            {
                "email": admin_email,
                "password_hash": hash_password(admin_password),
                "name": "Vedant Mehta",
                "created_at": datetime.now(UTC),
            }
        )
    elif not verify_password(admin_password, existing["password_hash"]):
        await admins_collection.update_one(
            {"email": admin_email}, {"$set": {"password_hash": hash_password(admin_password)}}
        )
