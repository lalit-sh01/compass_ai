from typing import List
from uuid import UUID

from fastapi import APIRouter, HTTPException

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
