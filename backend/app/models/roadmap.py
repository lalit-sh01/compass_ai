from datetime import datetime
from typing import Any, Dict, List, Optional
from uuid import UUID, uuid4

from pydantic import BaseModel
from sqlalchemy.dialects.postgresql import UUID as PGUUID
from sqlmodel import JSON, Column, Field, SQLModel

# --- Pydantic Models for JSON Content (Mirrors frontend/lib/types.ts) ---

class Resource(BaseModel):
    title: str
    type: str
    url: Optional[str] = None
    notes: Optional[str] = None

class Subtask(BaseModel):
    description: str
    isCompleted: bool
    suggestedResources: Optional[List[Resource]] = None

class DeepDiveTopic(BaseModel):
    description: str
    isCompleted: bool
    suggestedResources: Optional[List[Resource]] = None
    subtasks: Optional[List[Subtask]] = None
    notes: Optional[str] = None

class Deliverable(BaseModel):
    description: str
    isCompleted: bool
    subtasks: Optional[List[Subtask]] = None
    notes: Optional[str] = None

class BuildSection(BaseModel):
    hours: float
    projectTitle: str
    description: str
    technicalStack: Optional[List[str]] = None
    components: Optional[List[str]] = None
    deliverables: Optional[List[Deliverable]] = None

class ResearchSection(BaseModel):
    hours: float
    deepDiveTopics: Optional[List[DeepDiveTopic]] = None
    resources: Optional[List[Resource]] = None
    deliverables: Optional[List[Deliverable]] = None

class ShareSection(BaseModel):
    hours: float
    artifactTitle: str
    artifactDescription: str
    details: Optional[List[str]] = None
    tags: Optional[List[str]] = None
    deliverables: Optional[List[Deliverable]] = None

class TimeBreakdown(BaseModel):
    build: float
    research: float
    share: float

class Week(BaseModel):
    weekNumber: int
    title: str
    theme: str
    totalHours: float
    status: str
    timeBreakdown: TimeBreakdown
    buildSection: Optional[BuildSection] = None
    researchSection: Optional[ResearchSection] = None
    shareSection: Optional[ShareSection] = None
    notes: Optional[str] = None

class Phase(BaseModel):
    phaseNumber: int
    title: str
    summary: str
    weekRange: str
    weeks: List[Week]

class CoreSkill(BaseModel):
    skill: str
    description: str
    relevantWeeks: str

class Profile(BaseModel):
    description: str
    experience: str

class WeeklyTimeAllocationTemplate(BaseModel):
    monTue: str
    wedThu: str
    friSat: str
    sun: str

class Metric(BaseModel):
    description: str
    isCompleted: bool

class SuccessMetric(BaseModel):
    category: str
    metrics: List[Metric]

class MasterResourceItem(BaseModel):
    name: str
    description: str

class MasterResource(BaseModel):
    category: str
    items: List[MasterResourceItem]

class InterviewBank(BaseModel):
    category: str
    weight: str
    framework: Optional[str] = None
    notes: Optional[str] = None
    questions: List[str]

class DemonstrationMoment(BaseModel):
    category: str
    items: List[str]

class WeeklyRituals(BaseModel):
    daily: str
    weekly: str
    biWeekly: str

class RedFlagCheckpoint(BaseModel):
    checkpoint: str
    items: List[str]
    adjustment: str

class CompetitiveAdvantage(BaseModel):
    advantage: str
    description: str
    leverage: Optional[Dict[str, str]] = None

class SupplementalSections(BaseModel):
    weeklyTimeAllocationTemplate: WeeklyTimeAllocationTemplate
    successMetrics: List[SuccessMetric]
    masterResources: List[MasterResource]
    interviewBank: List[InterviewBank]
    demonstrationMoments: List[DemonstrationMoment]
    weeklyRituals: WeeklyRituals
    redFlagsAndAdjustments: List[RedFlagCheckpoint]
    competitiveAdvantages: List[CompetitiveAdvantage]
    finalMotivation: str
    nextSteps: List[str]

class RoadmapContent(BaseModel):
    title: str
    goal: str
    startDate: str
    targetEndDate: str
    totalDurationWeeks: int
    timeCommitmentPerWeek: str
    profile: Profile
    learningStyle: str
    coreSkills: List[CoreSkill]
    phases: List[Phase]
    supplementalSections: SupplementalSections

# --- SQLModel Table ---

class Roadmap(SQLModel, table=True):
    __tablename__ = "roadmaps"

    id: Optional[UUID] = Field(default=None, sa_column=Column(PGUUID(as_uuid=True), primary_key=True, default=uuid4))
    user_id: UUID = Field(sa_column=Column(PGUUID(as_uuid=True), index=True))
    title: str
    goal: str
    status: str = Field(default="not_started") # 'not_started' | 'in_progress' | 'completed' | 'paused' | 'archived'
    
    # JSON fields
    original_roadmap: Dict[str, Any] = Field(sa_column=Column(JSON))
    current_roadmap: Dict[str, Any] = Field(sa_column=Column(JSON))
    customizations: Dict[str, Any] = Field(default={}, sa_column=Column(JSON))
    edit_history: List[Dict[str, Any]] = Field(default=[], sa_column=Column(JSON))
    
    version: int = Field(default=1)
    
    start_date: Optional[datetime] = None
    target_end_date: Optional[datetime] = None
    total_duration_weeks: int
    
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    last_viewed_at: Optional[datetime] = None
    is_archived: bool = Field(default=False)

    user_notes: Dict[str, Any] = Field(default={}, sa_column=Column(JSON))

    class Config:
        arbitrary_types_allowed = True

# --- API Schemas ---

class RoadmapCreate(BaseModel):
    roadmap: RoadmapContent
    assessment: Dict[str, Any]
    gapAnalysis: Dict[str, Any]
    selectedSkills: List[str]

class RoadmapUpdate(BaseModel):
    status: Optional[str] = None
    current_roadmap: Optional[RoadmapContent] = None
    is_archived: Optional[bool] = None
    edit_history: Optional[List[Dict[str, Any]]] = None
    version: Optional[int] = None
    customizations: Optional[Dict[str, Any]] = None
    user_notes: Optional[Dict[str, Any]] = None
    title: Optional[str] = None
    goal: Optional[str] = None

class RoadmapImport(BaseModel):
    roadmap: RoadmapContent

class RoadmapResponse(BaseModel):
    """Response model for GET /api/roadmaps/{id}"""
    roadmap: Roadmap

    class Config:
        from_attributes = True
