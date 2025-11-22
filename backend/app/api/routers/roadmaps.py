from typing import List, Optional
from uuid import UUID

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.api.deps import CurrentUser, SessionDep
from app.models.roadmap import Roadmap, RoadmapCreate, RoadmapImport, RoadmapResponse, RoadmapUpdate
from app.services.roadmap_service import RoadmapService

router = APIRouter()

@router.get("/", response_model=List[Roadmap])
async def get_roadmaps(
    session: SessionDep,
    user_id: CurrentUser
):
    service = RoadmapService(session)
    return await service.get_user_roadmaps(user_id)

@router.get("/stats", response_model=dict)
async def get_roadmap_stats(
    session: SessionDep,
    user_id: CurrentUser
):
    service = RoadmapService(session)
    return await service.get_roadmap_stats(user_id)

@router.post("/", response_model=Roadmap, status_code=201)
async def create_roadmap(
    roadmap_in: RoadmapCreate,
    session: SessionDep,
    user_id: CurrentUser
):
    service = RoadmapService(session)
    return await service.create_roadmap(user_id, roadmap_in)

@router.post("/import", response_model=Roadmap, status_code=201)
async def import_roadmap(
    roadmap_in: RoadmapImport,
    session: SessionDep,
    user_id: CurrentUser
):
    service = RoadmapService(session)
    return await service.import_roadmap(user_id, roadmap_in)

@router.get("/{roadmap_id}", response_model=RoadmapResponse)
async def get_roadmap(
    roadmap_id: UUID,
    session: SessionDep,
    user_id: CurrentUser
):
    service = RoadmapService(session)
    roadmap = await service.get_roadmap_by_id(roadmap_id, user_id)
    if not roadmap:
        raise HTTPException(status_code=404, detail="Roadmap not found")
    return {"roadmap": roadmap}

@router.patch("/{roadmap_id}", response_model=Roadmap)
async def update_roadmap(
    roadmap_id: UUID,
    roadmap_data: RoadmapUpdate,
    session: SessionDep,
    user_id: CurrentUser
):
    service = RoadmapService(session)
    roadmap = await service.update_roadmap(roadmap_id, roadmap_data, user_id)
    if not roadmap:
        raise HTTPException(status_code=404, detail="Roadmap not found")
    return roadmap

@router.delete("/{roadmap_id}", status_code=204)
async def delete_roadmap(
    roadmap_id: UUID,
    session: SessionDep,
    user_id: CurrentUser
):
    service = RoadmapService(session)
    success = await service.delete_roadmap(roadmap_id, user_id)
    if not success:
        raise HTTPException(status_code=404, detail="Roadmap not found")
    return None

class ProgressUpdate(BaseModel):
    phase_number: int
    week_number: int
    section_type: str
    deliverable_path: str
    is_completed: bool
    user_note: Optional[str] = None
    effectiveness_rating: Optional[int] = None
    total_time_spent_seconds: Optional[int] = None

@router.post("/{roadmap_id}/progress", response_model=dict)
async def update_progress(
    roadmap_id: UUID,
    progress_data: ProgressUpdate,
    session: SessionDep,
    user_id: CurrentUser
):
    service = RoadmapService(session)
    progress = await service.update_progress(
        roadmap_id=roadmap_id,
        user_id=user_id,
        phase_number=progress_data.phase_number,
        week_number=progress_data.week_number,
        section_type=progress_data.section_type,
        deliverable_path=progress_data.deliverable_path,
        is_completed=progress_data.is_completed,
        user_note=progress_data.user_note,
        effectiveness_rating=progress_data.effectiveness_rating,
        total_time_spent_seconds=progress_data.total_time_spent_seconds
    )
    
    if not progress:
        raise HTTPException(status_code=404, detail="Roadmap not found")
        
    return {"status": "success", "progress_id": progress.id}

class TaskAction(BaseModel):
    phase_number: int
    week_number: int
    section_type: str
    deliverable_path: str

@router.post("/{roadmap_id}/tasks/start", response_model=dict)
async def start_task(
    roadmap_id: UUID,
    action: TaskAction,
    session: SessionDep,
    user_id: CurrentUser
):
    service = RoadmapService(session)
    progress = await service.start_task(
        roadmap_id=roadmap_id,
        user_id=user_id,
        phase_number=action.phase_number,
        week_number=action.week_number,
        section_type=action.section_type,
        deliverable_path=action.deliverable_path
    )
    
    if not progress:
        raise HTTPException(status_code=404, detail="Roadmap or task not found")
        
    return {"status": "started", "progress_id": progress.id}

@router.post("/{roadmap_id}/tasks/pause", response_model=dict)
async def pause_task(
    roadmap_id: UUID,
    action: TaskAction,
    session: SessionDep,
    user_id: CurrentUser
):
    service = RoadmapService(session)
    progress = await service.pause_task(
        roadmap_id=roadmap_id,
        user_id=user_id,
        deliverable_path=action.deliverable_path
    )
    
    if not progress:
        raise HTTPException(status_code=404, detail="Roadmap or task not found")
        
    return {"status": "paused", "total_time": progress.total_time_spent_seconds}

@router.post("/{roadmap_id}/tasks/resume", response_model=dict)
async def resume_task(
    roadmap_id: UUID,
    action: TaskAction,
    session: SessionDep,
    user_id: CurrentUser
):
    service = RoadmapService(session)
    progress = await service.resume_task(
        roadmap_id=roadmap_id,
        user_id=user_id,
        deliverable_path=action.deliverable_path
    )
    
    if not progress:
        raise HTTPException(status_code=404, detail="Roadmap or task not found")
        
    return {"status": "resumed", "progress_id": progress.id}
