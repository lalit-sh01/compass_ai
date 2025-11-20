from datetime import datetime
from typing import Optional
from uuid import UUID, uuid4

from sqlalchemy.dialects.postgresql import UUID as PGUUID
from sqlmodel import Column, Field, SQLModel


class User(SQLModel, table=True):
    __tablename__ = "users"
    
    id: Optional[UUID] = Field(default=None, sa_column=Column(PGUUID(as_uuid=True), primary_key=True, default=uuid4))
    clerk_user_id: str = Field(unique=True, index=True)
    email: str
    full_name: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
