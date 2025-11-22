from datetime import datetime
from typing import Optional
from uuid import UUID, uuid4

from sqlalchemy.dialects.postgresql import UUID as PGUUID
from sqlmodel import Column, Field, SQLModel

class RoadmapProgress(SQLModel, table=True):
    __tablename__ = "roadmap_progress"

    id: Optional[UUID] = Field(default=None, sa_column=Column(PGUUID(as_uuid=True), primary_key=True, default=uuid4))
    roadmap_id: UUID = Field(sa_column=Column(PGUUID(as_uuid=True), index=True))

    # Location
    phase_number: int
    week_number: int
    section_type: str  # 'build', 'research', 'share'
    deliverable_path: str

    # Progress
    is_completed: bool = Field(default=False)
    completed_at: Optional[datetime] = None
    user_note: Optional[str] = None
    effectiveness_rating: Optional[int] = None
    
    # Time Tracking
    total_time_spent_seconds: int = Field(default=0)
    last_session_started_at: Optional[datetime] = None

    # Timestamps
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        arbitrary_types_allowed = True
