"""
Admin credential management script.

Run this directly on the backend to create a new admin, reset an existing
admin's password, or list all admins. Modify the DEFAULT_EMAIL / DEFAULT_PASSWORD
constants below if you want a one-liner `python manage_admin.py create` to use
your own preferred defaults, or just pass --email / --password explicitly.

Usage:
  python manage_admin.py create --email you@example.com --password "YourPassword123"
  python manage_admin.py reset-password --email you@example.com --password "NewPassword456"
  python manage_admin.py list
"""
import argparse
import os
import sys
from datetime import datetime, UTC
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from dotenv import load_dotenv
from pymongo import MongoClient
import bcrypt

load_dotenv(Path(__file__).resolve().parent.parent / ".env")

# Change these if you want script defaults without passing CLI args every time.
DEFAULT_EMAIL = os.environ.get("ADMIN_EMAIL", "admin@example.com")
DEFAULT_PASSWORD = os.environ.get("ADMIN_PASSWORD", "changeme123")


def get_collection():
    client = MongoClient(os.environ["MONGO_URL"])
    db = client[os.environ["DB_NAME"]]
    return db["admins"]


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def create_admin(email: str, password: str):
    collection = get_collection()
    email = email.lower()
    existing = collection.find_one({"email": email})
    if existing:
        print(f"Admin '{email}' already exists. Use 'reset-password' to change credentials.")
        return
    collection.insert_one(
        {
            "email": email,
            "password_hash": hash_password(password),
            "name": "Admin",
            "created_at": datetime.now(UTC),
        }
    )
    print(f"Admin created: {email}")


def reset_password(email: str, password: str):
    collection = get_collection()
    email = email.lower()
    result = collection.update_one({"email": email}, {"$set": {"password_hash": hash_password(password)}})
    if result.matched_count == 0:
        print(f"No admin found with email '{email}'. Use 'create' first.")
    else:
        print(f"Password reset for: {email}")


def list_admins():
    collection = get_collection()
    admins = list(collection.find({}, {"password_hash": 0}))
    if not admins:
        print("No admins found.")
        return
    for a in admins:
        print(f"- {a['email']} (name: {a.get('name', 'Admin')}, created: {a.get('created_at')})")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Manage portfolio admin credentials")
    sub = parser.add_subparsers(dest="command", required=True)

    p_create = sub.add_parser("create", help="Create a new admin account")
    p_create.add_argument("--email", default=DEFAULT_EMAIL)
    p_create.add_argument("--password", default=DEFAULT_PASSWORD)

    p_reset = sub.add_parser("reset-password", help="Reset an existing admin's password")
    p_reset.add_argument("--email", default=DEFAULT_EMAIL)
    p_reset.add_argument("--password", required=True)

    sub.add_parser("list", help="List all admin accounts")

    args = parser.parse_args()

    if args.command == "create":
        create_admin(args.email, args.password)
    elif args.command == "reset-password":
        reset_password(args.email, args.password)
    elif args.command == "list":
        list_admins()
