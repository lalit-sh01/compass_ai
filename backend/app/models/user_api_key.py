from datetime import datetime
from uuid import UUID, uuid4

from sqlmodel import Field, SQLModel


class UserApiKey(SQLModel, table=True):
    __tablename__ = "user_api_keys"

    id: UUID = Field(default_factory=uuid4, primary_key=True)
    user_id: str = Field(index=True)
    provider: str
    encrypted_key: str
    is_active: bool = Field(default=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
