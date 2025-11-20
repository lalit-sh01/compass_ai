from typing import Any, Dict, List

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.agents.prompts.assessment import (
    ASSESSMENT_SYSTEM_PROMPT,
    build_assessment_prompt,
)
from app.agents.prompts.gap_analysis import (
    GAP_ANALYSIS_SYSTEM_PROMPT,
    build_gap_analysis_prompt,
)
from app.agents.prompts.roadmap_generation import (
    ROADMAP_GENERATION_SYSTEM_PROMPT,
    build_roadmap_generation_prompt,
)
from app.agents.roadmap_quality_validator import validate_roadmap_quality
from app.api.deps import CurrentUser, SessionDep
from app.core.llm import call_openai_json, create_openai_client

router = APIRouter()

class GenerateRoadmapInput(BaseModel):
    assessment: Dict[str, Any]
    gapAnalysis: Dict[str, Any]
    selectedSkills: List[str]

@router.post("/generate-roadmap")
async def generate_roadmap(
    input_data: GenerateRoadmapInput,
    session: SessionDep,
    user_id: CurrentUser
):
    try:
        client = await create_openai_client(session, user_id)
        
        # Build prompt
        user_prompt = build_roadmap_generation_prompt(
            input_data.assessment,
            input_data.gapAnalysis,
            input_data.selectedSkills
        )
        
        # Call OpenAI
        roadmap = await call_openai_json(
            client,
            ROADMAP_GENERATION_SYSTEM_PROMPT,
            user_prompt,
            model="gpt-4o",
            temperature=0.4,
            max_tokens=16000 # Note: OpenAI API might have different limits depending on model/tier
        )
        
        # Validate Quality
        quality_result = validate_roadmap_quality(roadmap)
        
        # Attach quality score to response if needed, or just log it
        # For now, we return the roadmap as expected by frontend
        # The frontend expects { roadmap: ... }
        
        return {"roadmap": roadmap, "quality": quality_result}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Optional: Endpoints for assessment and gap analysis if frontend wants to move them to backend too
# Currently frontend runs them via server actions or API routes. 
# If we want full migration, we should add them.

class AssessmentInput(BaseModel):
    answers: Dict[str, str]

@router.post("/assessment")
async def run_assessment(
    input_data: AssessmentInput,
    session: SessionDep,
    user_id: CurrentUser
):
    try:
        client = await create_openai_client(session, user_id)
        user_prompt = build_assessment_prompt(input_data.answers)
        assessment = await call_openai_json(
            client,
            ASSESSMENT_SYSTEM_PROMPT,
            user_prompt,
            model="gpt-4-turbo-preview"
        )
        return assessment
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class GapAnalysisInput(BaseModel):
    assessment: Dict[str, Any]

@router.post("/gap-analysis")
async def run_gap_analysis(
    input_data: GapAnalysisInput,
    session: SessionDep,
    user_id: CurrentUser
):
    try:
        client = await create_openai_client(session, user_id)
        user_prompt = build_gap_analysis_prompt(input_data.assessment)
        gap_analysis = await call_openai_json(
            client,
            GAP_ANALYSIS_SYSTEM_PROMPT,
            user_prompt,
            model="gpt-4-turbo-preview",
            max_tokens=3000
        )
        return gap_analysis
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
