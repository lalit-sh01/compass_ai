"""
Data models for the Agentic Roadmap Generation System (PRD v4.1 Compliant)
These define the exact schemas specified in the PRD.
"""

from typing import Any, Dict, List, Optional, Literal
from pydantic import BaseModel, Field
from datetime import datetime


# ============================================================================
# SECTION 3.1: UserContext (The State Object) - EXACT FROM PRD
# ============================================================================

class UserContext(BaseModel):
    """
    The complete user context vector built by The Inquisitor (Node A).
    This is the single source of truth for user constraints and preferences.
    """
    # Core Goal Definition
    goal_domain: Optional[str] = Field(
        default=None,
        description="[OPTIONAL] Broad category hint: Cognitive, Physical, or Market. If not provided, effort will be estimated from specific_goal alone."
    )
    specific_goal: str = Field(
        description="The exact objective, e.g., 'Learn React', 'Master Table Tennis', 'Launch a B2B SaaS with 100 customers'"
    )

    # Skill Levels
    current_skill_level: Optional[Literal["Beginner", "Intermediate", "Advanced"]] = Field(
        default=None,
        description="[DEPRECATED] Use current_state_description for better accuracy. Legacy 3-level categorization."
    )
    target_skill_level: Optional[Literal["Competent", "Proficient", "Master"]] = Field(
        default=None,
        description="[DEPRECATED] Use desired_outcome for better accuracy. Legacy 3-level categorization."
    )
    current_state_description: Optional[str] = Field(
        default=None,
        description="Open-ended description of current skill level (e.g., 'Built 2 React apps, comfortable with hooks and state, never used TypeScript', 'Can rally in table tennis but backhand is weak'). If provided, Gap Analyst will use LLM-based effort estimation instead of hardcoded matrix."
    )
    desired_outcome: Optional[str] = Field(
        default=None,
        description="Open-ended description of desired end state (e.g., 'Ship a production SaaS with auth, payments, and 100 paying customers', 'Win local table tennis tournament'). More specific than target_skill_level."
    )

    # Time & Resource Constraints
    weekly_hours_cap: int = Field(
        description="Maximum hours per week user can commit",
        gt=0,
        le=168
    )
    deadline_months: int = Field(
        description="Desired completion time in MONTHS (not weeks)",
        gt=0,
        le=60
    )
    budget_tier: Optional[Literal["Free_Only", "Low_Budget", "Premium"]] = Field(
        default=None,
        description="[DEPRECATED] Use budget_constraint instead. Legacy 3-tier categorization."
    )
    budget_constraint: Optional[str] = Field(
        default=None,
        description="Open-ended budget description (e.g., 'Free resources only', '$50/month max', 'Company pays for courses', 'One-time $200 budget'). If provided, overrides budget_tier."
    )

    # Psychographics
    learning_style: Optional[Literal["Visual_Video", "Text_Documentation", "Project_Based"]] = Field(
        default=None,
        description="[DEPRECATED] Use learning_preferences instead. Legacy 3-option categorization."
    )
    learning_preferences: Optional[str] = Field(
        default=None,
        description="Open-ended learning preferences (e.g., 'Videos for concepts, docs for reference, podcasts for commute, interactive exercises for practice'). If provided, overrides learning_style."
    )
    motivation_anchor: Optional[str] = Field(
        default=None,
        description="Why they are doing this (e.g., 'Career advancement', 'Personal interest')"
    )


# ============================================================================
# SECTION 3.2: StrategyBrief (Node B Output)
# ============================================================================

class StrategyBrief(BaseModel):
    """
    Output from Node B: The Gap Analyst.
    Represents the feasibility calculation and negotiation state.
    """
    status: Literal["OPTIMAL", "TIGHT", "IMPOSSIBLE"] = Field(
        description="Feasibility status from Effort vs. Capacity comparison"
    )
    required_effort_hours: int = Field(
        description="Total hours estimated to reach target skill level"
    )
    user_capacity_hours: int = Field(
        description="Total hours available (weekly_hours_cap × 4 × deadline_months)"
    )
    discrepancy_percentage: Optional[float] = Field(
        default=None,
        description="How much effort exceeds capacity (as percentage)"
    )
    negotiation_options: Optional[List[Dict[str, str]]] = Field(
        default=None,
        description="Options to make the goal feasible (only if IMPOSSIBLE)"
    )
    approved_strategy: Optional[str] = Field(
        default=None,
        description="The user's chosen path forward after negotiation"
    )


# ============================================================================
# SECTION 3.3: Task (The Granular Unit)
# ============================================================================

class Task(BaseModel):
    """
    Individual task generated by Node C: The Curator.
    Contains both LLM-generated (search query) and tool-populated (URLs) data.
    """
    task_id: str = Field(
        description="Unique ID for tracking progress in Firestore"
    )
    task_name: str = Field(
        description="Human-readable task name"
    )
    task_type: str = Field(
        description="Task category - domain-specific (e.g., 'learn', 'practice', 'build' for cognitive skills; 'watch-demo', 'drill', 'match-play' for physical skills; 'research', 'outreach', 'close' for market skills). Curator determines optimal categories per goal."
    )
    task_category_label: Optional[str] = Field(
        default=None,
        description="Human-readable label for the task category (e.g., 'Watch Demo', 'Practice Drill', 'Match Play'). Displayed in UI."
    )
    estimated_minutes: int = Field(
        description="Time estimate for task completion",
        gt=0
    )
    description: str = Field(
        description="Detailed description of what to do"
    )

    # Generated by Node C (Curator)
    resource_search_query: str = Field(
        description="High-precision search query for finding resources (e.g., 'site:youtube.com PingSkills forehand')"
    )

    # Populated by Node D (Enricher - Python tool)
    resource_url: Optional[str] = Field(
        default=None,
        description="URL of the selected resource"
    )
    resource_title: Optional[str] = Field(
        default=None,
        description="Title of the resource"
    )
    resource_author: Optional[str] = Field(
        default=None,
        description="Author or channel name"
    )
    quality_score: Optional[float] = Field(
        default=None,
        description="Quality score from QualityResourceFetcher (0-100)"
    )
    quality_warning: Optional[Literal["LOW_CONFIDENCE"]] = Field(
        default=None,
        description="Flag if quality score < 30 (requires validation)"
    )


# ============================================================================
# SECTION 3.3: Week (Hierarchical Structure)
# ============================================================================

class Week(BaseModel):
    """
    A single week in the roadmap with specific goal and tasks.
    """
    week_number: int = Field(
        description="Week number (1-indexed)",
        gt=0
    )
    goal: str = Field(
        description="The specific, achievable goal for this week"
    )
    total_minutes: int = Field(
        description="Total estimated time for all tasks this week",
        ge=0
    )
    tasks: List[Task] = Field(
        description="List of tasks for this week"
    )


# ============================================================================
# SECTION 3.3: Roadmap (Final Artifact)
# ============================================================================

class Roadmap(BaseModel):
    """
    The complete roadmap output from the system.
    Hierarchical structure: Roadmap → Phases → Weeks → Tasks
    """
    roadmap_title: str = Field(
        description="Title of the roadmap"
    )
    total_duration_weeks: int = Field(
        description="Total weeks for completion",
        gt=0
    )
    phases: List[Dict[str, List[Week]]] = Field(
        description="Hierarchical structure: Phase name maps to list of weeks"
    )


# ============================================================================
# SECTION 2.1: GraphState (LangGraph State Machine)
# ============================================================================

class GraphState(BaseModel):
    """
    Complete state for the LangGraph workflow.
    Persists across all 5 nodes.
    """
    # Input
    user_context: Optional[UserContext] = None

    # Gap Analyst output
    strategy_brief: Optional[StrategyBrief] = None

    # Curator output
    roadmap: Optional[Roadmap] = None

    # Error tracking
    error_log: Optional[List[str]] = None

    # Negotiation handling
    negotiation_state: Optional[Dict[str, Any]] = None

    # UI metadata
    intensity_warning: Optional[str] = None


# ============================================================================
# API Input/Output Models
# ============================================================================

class InquisitorMessage(BaseModel):
    """Single message in Inquisitor conversation."""
    role: Literal["user", "assistant"]
    content: str


class InquisitorRequest(BaseModel):
    """Request for Inquisitor multi-turn chat."""
    conversation_history: List[InquisitorMessage]


class NegotiationRequest(BaseModel):
    """Request to resolve negotiation after IMPOSSIBLE status."""
    user_context: UserContext
    choice: Literal["extend_time", "reduce_scope"]
    extended_months: Optional[int] = None  # For extend_time choice
    reduced_target: Optional[str] = None   # For reduce_scope choice


class RoadmapGenerationRequest(BaseModel):
    """Request to trigger full A→B→C→D→E workflow."""
    user_context: UserContext
