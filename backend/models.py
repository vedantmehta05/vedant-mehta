from datetime import datetime, UTC
from typing import Annotated, Any, Optional
from bson import ObjectId
from pydantic import BaseModel, BeforeValidator, EmailStr, Field, ConfigDict


def _validate_object_id(v: Any) -> str:
    if isinstance(v, ObjectId):
        return str(v)
    if isinstance(v, str):
        return v
    raise ValueError("Invalid ObjectId")


PyObjectId = Annotated[str, BeforeValidator(_validate_object_id)]


class BaseDocument(BaseModel):
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    model_config = ConfigDict(populate_by_name=True, arbitrary_types_allowed=True)

    @classmethod
    def from_mongo(cls, doc: dict):
        if doc is None:
            return None
        return cls(**doc)

    def to_mongo(self) -> dict:
        data = self.model_dump(by_alias=True, exclude_none=True)
        data.pop("_id", None)
        return data


class ContactMessage(BaseDocument):
    name: str
    email: EmailStr
    subject: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(UTC))


class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str
