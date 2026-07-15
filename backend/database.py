import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

mongo_url = os.environ["MONGO_URL"]
db_name = os.environ["DB_NAME"]

client = AsyncIOMotorClient(mongo_url, tz_aware=True)
db = client[db_name]

contacts_collection = db["contacts"]
settings_collection = db["settings"]
admins_collection = db["admins"]
content_collection = db["content"]
login_attempts_collection = db["login_attempts"]
