
from typing import Optional
from sqlmodel import SQLModel, Field
from uuid import UUID, uuid4
from datetime import datetime
from enum import Enum

class UserRole(str, Enum):
    STUDENT = "student"
    TEACHER = "teacher"
    ADMIN = "admin"

class UserBase(SQLModel):
    email: str = Field(unique=True, index=True)
    full_name: Optional[str] = None
    role: UserRole = Field(default=UserRole.STUDENT)
    is_active: bool = True

class User(UserBase, table=True):
    id: Optional[UUID] = Field(default_factory=uuid4, primary_key=True, index=True)
    hashed_password: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class UserCreate(UserBase):
    password: str

class UserRead(UserBase):
    id: UUID
    created_at: datetime
