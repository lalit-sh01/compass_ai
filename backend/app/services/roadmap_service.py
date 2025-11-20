from datetime import datetime
from typing import Dict, List, Optional
from uuid import UUID

from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from app.models.assessment import Assessment
from app.models.roadmap import Roadmap, RoadmapCreate, RoadmapImport, RoadmapUpdate


class RoadmapService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create_roadmap(self, user_id: str, input_data: RoadmapCreate) -> Roadmap:
        # Parse dates and strip timezone to match database schema
        start_date = None
        if input_data.roadmap.startDate:
            dt = datetime.fromisoformat(input_data.roadmap.startDate.replace('Z', '+00:00'))
            start_date = dt.replace(tzinfo=None)  # Strip timezone
        
        target_end_date = None
        if input_data.roadmap.targetEndDate:
            dt = datetime.fromisoformat(input_data.roadmap.targetEndDate.replace('Z', '+00:00'))
            target_end_date = dt.replace(tzinfo=None)  # Strip timezone
        
        # Create Roadmap
        roadmap = Roadmap(
            user_id=user_id,
            title=input_data.roadmap.title,
            goal=input_data.roadmap.goal,
            status="not_started",
            original_roadmap=input_data.roadmap.model_dump(),
            current_roadmap=input_data.roadmap.model_dump(),
            total_duration_weeks=input_data.roadmap.totalDurationWeeks,
            start_date=start_date,
            target_end_date=target_end_date,
        )
        self.session.add(roadmap)
        await self.session.flush() # Get ID

        # Create Assessment
        assessment = Assessment(
            user_id=user_id,
            roadmap_id=roadmap.id,
            assessment_data=input_data.assessment,
            gap_analysis=input_data.gapAnalysis,
            selected_skills=input_data.selectedSkills
        )
        self.session.add(assessment)
        
        await self.session.commit()
        await self.session.refresh(roadmap)
        return roadmap

    async def import_roadmap(self, user_id: str, input_data: RoadmapImport) -> Roadmap:
        # Parse dates and strip timezone to match database schema
        start_date = None
        if input_data.roadmap.startDate:
            dt = datetime.fromisoformat(input_data.roadmap.startDate.replace('Z', '+00:00'))
            start_date = dt.replace(tzinfo=None)  # Strip timezone
        
        target_end_date = None
        if input_data.roadmap.targetEndDate:
            dt = datetime.fromisoformat(input_data.roadmap.targetEndDate.replace('Z', '+00:00'))
            target_end_date = dt.replace(tzinfo=None)  # Strip timezone
        
        # Create Roadmap
        roadmap = Roadmap(
            user_id=user_id,
            title=input_data.roadmap.title,
            goal=input_data.roadmap.goal,
            status="not_started",
            original_roadmap=input_data.roadmap.model_dump(),
            current_roadmap=input_data.roadmap.model_dump(),
            total_duration_weeks=input_data.roadmap.totalDurationWeeks,
            start_date=start_date,
            target_end_date=target_end_date,
        )
        self.session.add(roadmap)
        await self.session.flush() # Get ID

        # Create Empty Assessment for consistency
        assessment = Assessment(
            user_id=user_id,
            roadmap_id=roadmap.id,
            assessment_data={},
            gap_analysis={},
            selected_skills=[]
        )
        self.session.add(assessment)
        
        await self.session.commit()
        await self.session.refresh(roadmap)
        return roadmap

    async def get_user_roadmaps(self, user_id: UUID) -> List[Roadmap]:
        statement = select(Roadmap).where(Roadmap.user_id == user_id, Roadmap.is_archived == False).order_by(Roadmap.created_at.desc())
        result = await self.session.execute(statement)
        return result.scalars().all()

    async def get_roadmap_by_id(self, roadmap_id: UUID, user_id: UUID) -> Optional[Roadmap]:
        statement = select(Roadmap).where(Roadmap.id == roadmap_id, Roadmap.user_id == user_id)
        result = await self.session.execute(statement)
        roadmap = result.scalars().first()
        if roadmap:
            roadmap.last_viewed_at = datetime.utcnow()
            self.session.add(roadmap)
            await self.session.commit()
            await self.session.refresh(roadmap)
        return roadmap

    async def update_roadmap(self, roadmap_id: UUID, roadmap_data: RoadmapUpdate, user_id: UUID) -> Optional[Roadmap]:
        roadmap = await self.get_roadmap_by_id(roadmap_id, user_id)
        if not roadmap:
            return None

        update_data = roadmap_data.model_dump(exclude_unset=True)
        
        # Handle special logic
        if "status" in update_data:
             if update_data["status"] == "in_progress" and not roadmap.started_at:
                 roadmap.started_at = datetime.utcnow()
             if update_data["status"] == "completed":
                 roadmap.completed_at = datetime.utcnow()
        
        if "current_roadmap" in update_data:
             # Versioning logic could go here
             roadmap.version += 1
             # update_data["current_roadmap"] is already a dict if using model_dump? No, it's a RoadmapContent object if not dumped properly?
             # Pydantic model_dump handles it.
             pass

        for key, value in update_data.items():
            setattr(roadmap, key, value)
        
        roadmap.updated_at = datetime.utcnow()
        self.session.add(roadmap)
        await self.session.commit()
        await self.session.refresh(roadmap)
        return roadmap

    async def get_roadmap_stats(self, user_id: UUID) -> Dict[str, int]:
        statement = select(Roadmap).where(Roadmap.user_id == user_id, Roadmap.is_archived == False)
        result = await self.session.execute(statement)
        roadmaps = result.scalars().all()
        
        total = len(roadmaps)
        not_started = sum(1 for r in roadmaps if r.status == "not_started")
        in_progress = sum(1 for r in roadmaps if r.status == "in_progress")
        completed = sum(1 for r in roadmaps if r.status == "completed")
        paused = sum(1 for r in roadmaps if r.status == "paused")
        # Archived is filtered out in query, but if we want archived count we need another query or remove filter
        
        return {
            "total": total,
            "notStarted": not_started,
            "inProgress": in_progress,
            "completed": completed,
            "paused": paused,
            "archived": 0 # Placeholder or fetch if needed
        }

    async def delete_roadmap(self, roadmap_id: UUID, user_id: UUID) -> bool:
        roadmap = await self.get_roadmap_by_id(roadmap_id, user_id)
        if not roadmap:
            return False
            
        await self.session.delete(roadmap)
        await self.session.commit()
        return True

