from typing import Optional
from pydantic import BaseModel, EmailStr, Field
import uuid
from datetime import datetime

# [Feature: User Authentication] [Story: AUTH-TEACHER-001] [Ticket: AUTH-TEACHER-001-BE-T02]

class UserRegister(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8)
    full_name: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserRead(BaseModel):
    id: uuid.UUID
    email: EmailStr
    full_name: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True
