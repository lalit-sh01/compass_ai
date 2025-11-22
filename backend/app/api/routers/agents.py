from typing import Any, Dict, List, AsyncGenerator, Optional
import json

from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import StreamingResponse
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
from app.agents.graph import generate_roadmap as generate_roadmap_workflow
from app.agents.nodes.inquisitor import (
    INQUISITOR_SYSTEM_PROMPT,
    build_initial_question,
)
from app.api.deps import CurrentUser, SessionDep
from app.core.llm import call_openai_json, create_openai_client, stream_openai_text

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


# ============================================================================
# NEW AGENTIC WORKFLOW: Generate Roadmap V2 with Streaming
# ============================================================================

class GenerateRoadmapV2Input(BaseModel):
    """Input for the new LangGraph-based agentic roadmap generation."""
    goal_domain: str  # e.g., "PM", "Data Science", "Engineering"
    target_role: str  # e.g., "Product Manager at FAANG"
    current_background: str  # e.g., "Software Engineer"
    skill_level: str  # e.g., "Intermediate", "Beginner"
    deadline_weeks: int  # Total weeks available
    weekly_hours_cap: int  # Maximum hours per week
    additional_context: str = ""  # Any additional notes/preferences

    class Config:
        """Allow flexible field names from frontend."""
        allow_population_by_field_name = True


class StreamUpdate(BaseModel):
    """Structure of each SSE update sent to client."""
    event: str  # "profiler", "architect", "adapter", "specialists", "integrator", "validator", "complete"
    progress: int  # 0-100
    message: str  # User-friendly message
    partial_roadmap: Optional[Dict[str, Any]] = None  # Partial roadmap preview (if available)


async def generate_roadmap_stream(
    user_input: Dict[str, Any]
) -> AsyncGenerator[str, None]:
    """
    Stream roadmap generation progress to client via Server-Sent Events (SSE).

    Yields:
        SSE-formatted strings with StreamUpdate JSON
    """
    node_messages = {
        "profiler": {
            "message": "🧠 Understanding your learning profile...",
            "progress": 10,
        },
        "pedagogy_architect": {
            "message": "📚 Selecting the perfect curriculum framework...",
            "progress": 20,
        },
        "cognitive_adapter": {
            "message": "⚙️ Personalizing the roadmap to your style...",
            "progress": 30,
        },
        "tech_lead": {
            "message": "🛠️ Designing technical deep-dives...",
            "progress": 45,
        },
        "career_coach": {
            "message": "💼 Adding networking and interview prep...",
            "progress": 55,
        },
        "meta_coach": {
            "message": "🎯 Setting success metrics and rituals...",
            "progress": 65,
        },
        "integrator": {
            "message": "🔗 Merging all components together...",
            "progress": 80,
        },
        "validator": {
            "message": "✅ Final quality checks...",
            "progress": 95,
        },
    }

    try:
        # Execute the agentic workflow
        result = await generate_roadmap_workflow(user_input)

        # Check for errors
        if result.get("error"):
            yield f'data: {json.dumps({"event": "error", "message": result["error"]})}\n\n'
            return

        # Stream per-node updates
        for node_name, config in node_messages.items():
            update = StreamUpdate(
                event=node_name,
                progress=config["progress"],
                message=config["message"],
                partial_roadmap=None,
            )
            yield f'data: {update.model_dump_json()}\n\n'

        # Stream final completion
        final_roadmap = result.get("final_roadmap")
        validation_report = result.get("validation_report", {})

        if final_roadmap:
            complete_update = StreamUpdate(
                event="complete",
                progress=100,
                message="✨ Your personalized roadmap is ready!",
                partial_roadmap=final_roadmap,
            )
            yield f'data: {complete_update.model_dump_json()}\n\n'
        else:
            yield f'data: {json.dumps({"event": "error", "message": "Failed to generate roadmap"})}\n\n'

    except Exception as e:
        error_update = {
            "event": "error",
            "progress": -1,
            "message": f"Error during roadmap generation: {str(e)}",
        }
        yield f'data: {json.dumps(error_update)}\n\n'


@router.post("/generate-roadmap-stream")
async def stream_roadmap_generation(
    input_data: GenerateRoadmapV2Input,
):
    """
    Stream the roadmap generation process to the client via Server-Sent Events.

    This endpoint executes the full LangGraph agentic workflow and streams
    progress updates for each node, culminating in the final roadmap.

    Note: For development/testing, auth is not required. In production, add:
      session: SessionDep,
      user_id: CurrentUser,
    """
    user_input = input_data.model_dump()

    # Map frontend field names to backend expected names
    user_input["current_skill_level"] = user_input.pop("skill_level")
    user_input["background"] = user_input.pop("current_background")

    return StreamingResponse(
        generate_roadmap_stream(user_input),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",  # Disable Nginx buffering
        },
    )


# ============================================================================
# CONVERSATIONAL PROFILER (Node A): Multi-turn Interactive Interview
# ============================================================================

class ProfilerMessage(BaseModel):
    """A single message in the profiler conversation."""
    role: str  # "user" or "assistant"
    content: str


class ProfilerRequest(BaseModel):
    """Request for profiler conversation continuation."""
    conversation_history: List[ProfilerMessage]


@router.post("/profile-interview/start")
async def start_profile_interview():
    """
    Start the Inquisitor interview (Node A).

    Returns the opening message from The Inquisitor.
    """
    opening_message = build_initial_question()
    return {
        "status": "interview_started",
        "message": opening_message,
        "conversation": [
            {
                "role": "assistant",
                "content": opening_message
            }
        ]
    }


async def profiler_interview_stream(
    conversation_history: List[Dict[str, str]]
) -> AsyncGenerator[str, None]:
    """
    Stream the Inquisitor's response based on conversation history.

    The Inquisitor (Node A) will either:
    1. Ask the next clarification question
    2. Output complete UserContext JSON when interview is complete

    Yields:
        SSE-formatted strings with response chunks
    """
    try:
        from app.core.config import get_settings
        from openai import AsyncOpenAI

        settings = get_settings()
        client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)

        # Build message list for LLM from conversation history
        # Add system prompt as first message
        messages = [
            {"role": "system", "content": INQUISITOR_SYSTEM_PROMPT}
        ]

        # Add conversation history
        for msg in conversation_history:
            messages.append({
                "role": msg["role"],
                "content": msg["content"]
            })

        # Stream the response from OpenAI
        buffer = ""
        json_detected = False

        stream = await client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            temperature=0.8,
            max_tokens=1500,
            stream=True,
        )

        async for chunk in stream:
            if chunk.choices[0].delta.content:
                content = chunk.choices[0].delta.content
                buffer += content
                yield f'data: {json.dumps({"content": content})}\n\n'

                # Detect if we've reached JSON completion (UserContext complete)
                if "{" in buffer and "\"goal_domain\"" in buffer:
                    json_detected = True

        # If JSON was detected, signal completion
        if json_detected:
            yield f'data: {json.dumps({"interview_complete": True})}\n\n'

    except Exception as e:
        error_msg = f"Error during Inquisitor interview: {str(e)}"
        yield f'data: {json.dumps({"error": error_msg})}\n\n'


@router.post("/profile-interview/continue")
async def continue_profile_interview(
    request: ProfilerRequest,
):
    """
    Continue the profiler interview with user's response.

    Takes the conversation history and streams the next question or
    outputs the complete profile JSON when interview is done.
    """
    # Convert Pydantic models to dicts for streaming
    conversation = [msg.model_dump() for msg in request.conversation_history]

    return StreamingResponse(
        profiler_interview_stream(conversation),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
        },
    )
