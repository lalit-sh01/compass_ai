from datetime import datetime
from typing import Any, Dict, List
from uuid import UUID, uuid4

from sqlmodel import JSON, Column, Field, SQLModel


class Assessment(SQLModel, table=True):
    __tablename__ = "assessments"

    id: UUID = Field(default_factory=uuid4, primary_key=True)
    user_id: UUID = Field(index=True)
    roadmap_id: UUID = Field(foreign_key="roadmaps.id")
    
    assessment_data: Dict[str, Any] = Field(sa_column=Column(JSON))
    gap_analysis: Dict[str, Any] = Field(sa_column=Column(JSON))
    selected_skills: List[str] = Field(sa_column=Column(JSON))
    
    created_at: datetime = Field(default_factory=datetime.utcnow)
