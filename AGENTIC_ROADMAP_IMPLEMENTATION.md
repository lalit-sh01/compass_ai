# Agentic Roadmap Generation - Implementation Plan

## Executive Summary

This document outlines the integration of the new Context-Aware Agentic Roadmap Generator (from PRD) into the existing Compass AI application. The key challenge is **strict schema compatibility**: the LangGraph agents must generate output that conforms precisely to the existing `RoadmapContent` data model.

---

## 1. Schema Mapping: PRD Models ↔ Existing Application Schema

### 1.1 Input Layer Mapping

**PRD Input**: `UserContext` + `CognitiveProfile`
```python
class CognitiveProfile(BaseModel):
    learning_style: Literal["Visual", "Text_Based", "Project_First", "Academic"]
    neuro_type: Literal["Neurotypical", "ADHD", "High_Anxiety"]
    executive_function: Literal["High", "Low"]
    schedule_rigidity: Literal["Fluid", "Weekend_Warrior", "Strict_Calendar"]

class UserContext(BaseModel):
    goal_domain: str
    target_role: str
    current_skill_level: Literal["Beginner", "Intermediate", "Advanced"]
    weekly_hours_cap: int
    deadline_weeks: int
    profile: CognitiveProfile
```

**Application Integration Point**:
- Frontend collects this during onboarding (replace/extend current AssessmentWizard)
- Backend receives as part of roadmap generation request
- Stored in `assessments` table with `assessment_data: JSONB` field

**Migration Strategy**:
- Extend existing `AssessmentData` type to include `CognitiveProfile`
- Keep backward compatibility with existing assessment format
- Store both the raw cognitive profile and traditional assessment data

---

### 1.2 Intermediate State Mapping

**PRD**: Blueprint → Personalized Skeleton
```python
class WeekSkeleton(BaseModel):
    week_number: int
    theme: str
    focus_area: Literal["Foundation", "Build", "Career_Prep"]
    requires_build: bool
    requires_research: bool
    requires_outreach: bool

class Blueprint(BaseModel):
    phases: List[Dict[str, str]]
    week_skeletons: List[WeekSkeleton]
```

**Storage**:
- These are **NOT stored in database** - they're transient agent outputs
- Stored in LangGraph state only
- Logged for debugging/telemetry in a separate agent_logs table (optional)

---

### 1.3 Output Layer Mapping: CRITICAL - Must Match RoadmapContent Exactly

**PRD Output Models**:
```python
class Resource(BaseModel):
    title: str
    url: str
    type: Literal["Video", "Article", "Course", "Paper", "Tool"]
    is_proven: bool
    estimated_minutes: int

class LearningBlock(BaseModel):
    hours_allocated: int
    goals: List[str]
    deliverables: List[str]
    resources: List[Resource]
    subtasks: Optional[List[Dict[str, Any]]]

class Week(BaseModel):
    week_number: int
    title: str
    theme: str
    total_hours: int
    build_section: Optional[LearningBlock]
    research_section: Optional[LearningBlock]
    share_section: Optional[LearningBlock]

class Roadmap(BaseModel):
    title: str
    total_duration_weeks: int
    phases: List[Dict[str, List[Week]]]
    red_flags: List[str]
    success_metrics: List[Dict[str, Any]]
    weekly_rituals: Dict[str, str]
```

**Application Schema** (`RoadmapContent`):
```python
class Resource(BaseModel):
    title: str
    type: str
    url: Optional[str] = None
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
```

### 1.4 Mapping Rules (Agents Must Follow)

**LearningBlock → BuildSection/ResearchSection/ShareSection**:

| PRD Field | App Field | Notes |
|-----------|-----------|-------|
| `hours_allocated` | `hours` | Must be float, cap to weeklyHoursCap |
| `goals` | `(derived from theme + deliverables)` | Goals are implicit in the Week structure |
| `deliverables` (List[str]) | `deliverables[*].description` | Each string becomes a Deliverable with isCompleted: false |
| `resources` | `resources` (for research_section) / `(ignore for build_section)` | Build doesn't typically have resources array |
| `subtasks` | `deliverables[*].subtasks` | Only used for ADHD users (executive_function: Low) |

**Week Structure**:
- `week_number` → `weekNumber`
- `theme` → `theme`
- `title` → `title`
- `total_hours` → `totalHours`
- `build_section` → `buildSection` (map LearningBlock to BuildSection)
- `research_section` → `researchSection` (map LearningBlock to ResearchSection)
- `share_section` → `shareSection` (map LearningBlock to ShareSection)
- `status` (computed) → Must be "not_started" for all new roadmaps
- `timeBreakdown` (computed) → Calculate from section hours

**Phase Structure**:
- PRD: `phases: List[Dict[str, str]]` (e.g., `[{"name": "Fundamentals"}]`)
- App: Requires `phaseNumber`, `title`, `summary`, `weekRange`, `weeks: List[Week]`
- **Agent must expand blueprint phases into full Phase objects**

**Supplemental Sections**:
- PRD `red_flags` → App `redFlagsAndAdjustments: List[RedFlagCheckpoint]`
- PRD `success_metrics` → App `successMetrics: List[SuccessMetric]`
- PRD `weekly_rituals` → App `weeklyRituals: WeeklyRituals`
- Other fields (masterResources, interviewBank, etc.) populated by agents with context-aware data

---

## 2. LangGraph Architecture & State

### 2.1 GraphState Definition

```python
from typing import TypedDict, Optional, List, Dict, Any
from app.models.roadmap import RoadmapContent

class GraphState(TypedDict):
    # Input
    user_context: Dict[str, Any]  # UserContext + CognitiveProfile

    # Intermediate States
    blueprint: Dict[str, Any]  # Output of Node B (Pedagogy Architect)
    personalized_skeleton: Dict[str, Any]  # Output of Node B2 (Cognitive Adapter)

    # Fragment Outputs (Node C)
    fragment_tech: Dict[str, Any]  # Output of C1 (Tech Lead)
    fragment_career: Dict[str, Any]  # Output of C2 (Career Coach)
    fragment_meta: Dict[str, Any]  # Output of C3 (Meta-Coach)

    # Final Output
    final_roadmap: Optional[RoadmapContent] = None

    # Error Handling
    error_log: List[str]

    # Telemetry
    moat_utilization: Dict[str, int]  # Tracks source of each resource (proven vs. live search)
```

### 2.2 Node Specifications

```
┌─────────────────────────────────────────────────────────────┐
│  Node A: Profiler (Fast Intake)                             │
│  - Model: GPT-4o-mini                                       │
│  - Input: user_context (raw user input)                     │
│  - Output: Validated UserContext + CognitiveProfile         │
│  - Action: Extract cognitive signals from user input        │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  Node B: Pedagogy Architect (Strategy)                      │
│  - Model: Claude 3.5 Sonnet                                 │
│  - Input: user_context                                      │
│  - Tools: Repo.get_blueprint(goal_domain)                   │
│  - Output: Blueprint (week skeletons + phase structure)     │
│  - Action: Retrieve template, apply scaling logic           │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  Node B2: Cognitive Adapter (Personalization)               │
│  - Model: Claude 3.5 Sonnet                                 │
│  - Input: blueprint + user_context.profile                  │
│  - Output: PersonalizedSkeleton (same structure, tweaked)   │
│  - Rules:                                                   │
│    - IF ADHD: Fragmentation (20-min chunks)               │
│    - IF Project_First: Reverse focus (80/20)              │
│    - IF Weekend_Warrior: Time shift (Sat/Sun focus)       │
└─────────────────────────────────────────────────────────────┘
                            ↓
                   ┌────┴────┬────┴────┬────────┐
                   ↓         ↓         ↓        ↓
    ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
    │ Node C1:         │  │ Node C2:         │  │ Node C3:         │
    │ Tech Lead        │  │ Career Coach     │  │ Meta-Coach       │
    │ (Parallel)       │  │ (Parallel)       │  │ (Parallel)       │
    │ - Build sections │  │ - Share section  │  │ - Red flags      │
    │ - Research       │  │ - Networking     │  │ - Rituals        │
    │ - Deep dives     │  │ - Mock interviews│  │ - Metrics        │
    └──────────────────┘  └──────────────────┘  └──────────────────┘
                   │         │         │        │
                   └────┬────┴────┬────┴────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│  Node D: Integrator (Merge & Enrich)                        │
│  - Input: fragment_tech + fragment_career + fragment_meta   │
│  - Process:                                                 │
│    1. Merge fragments into RoadmapContent structure         │
│    2. For each Resource/Task:                              │
│       a. Try Repo.find_proven_resource()                   │
│       b. If miss, fetch via SerpAPI + YouTube              │
│       c. Apply domain blacklist                            │
│  - Output: Complete RoadmapContent (pre-validation)        │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  Node E: Validator (Quality Gate)                           │
│  - Checks:                                                  │
│    1. Volume: Sum(hours) <= user.weekly_hours_cap          │
│    2. Empty Links: All resource URLs != null                │
│    3. Pedagogy: ≥1 Build OR Share per week                │
│  - Actions:                                                │
│    - PASS: Return final_roadmap                           │
│    - FAIL: Log error, regenerate specific fragment         │
└─────────────────────────────────────────────────────────────┘
                            ↓
                    ┌──────────────┐
                    │ Final Output │
                    │ RoadmapContent
                    └──────────────┘
```

---

## 3. Context-Aware Repository Layer

### 3.1 Efficacy Funnel

**Layer 3 (Staging)**: Unproven web resources
- Source: SerpAPI/YouTube scrapes
- Risk: May be outdated or incorrect
- Usage: Last resort only
- Action: Trigger semantic audit (not MVP)

**Layer 2 (Proven)**: Validated by validator node, served to 50+ users
- Source: Database of previously used resources
- Reliability: Moderate
- Usage: Safe to use
- Action: Use without audit

**Layer 1 (Contextual - THE MOAT)**: High-precision data with metadata
- Source: Internal curated repository + usage telemetry
- Metadata Example:
  ```python
  {
    "resource_id": "vid_123",
    "title": "Intro to PM",
    "url": "https://youtube.com/...",
    "type": "Video",
    "success_rate_visual_learners": 0.95,
    "avg_completion_time_beginner": 45,  # minutes
    "avg_completion_time_intermediate": 30,
    "preferred_for_adhd": True,
    "domain": "youtube.com",
    "is_proven": True
  }
  ```
- Usage: Preferred, overrides LLM estimates

### 3.2 Repository API Methods

```python
# In a new file: backend/app/services/repository_service.py

class RepositoryService:

    async def get_blueprint(self, goal_domain: str) -> Dict[str, Any]:
        """
        Retrieve a gold-standard blueprint template.
        Example: get_blueprint("Product Management") → FAANG PM Standard
        """
        # Query database for blueprint matching goal_domain
        # Return WeekSkeleton[] + phase structure
        pass

    async def find_proven_resource(
        self,
        topic: str,
        style: str,  # e.g., "Visual", "Text_Based"
        duration_cap: int  # minutes
    ) -> Optional[Dict[str, Any]]:
        """
        Find a resource from Layer 1 or Layer 2.
        Returns Resource dict with url, is_proven, metadata.
        """
        # Query Layer 1 (Contextual) first
        # Fall back to Layer 2 (Proven)
        # Return None if not found (caller will use SerpAPI)
        pass

    async def get_true_effort(
        self,
        task_type: str,  # e.g., "video_watch", "project_build"
        user_level: str  # e.g., "Beginner", "Intermediate"
    ) -> int:
        """
        Return historical average effort in minutes.
        """
        # Query telemetry table for avg completion time
        pass

    async def log_telemetry(
        self,
        resource_id: str,
        actual_time: int,  # minutes taken
        completed: bool,  # user completed?
        effectiveness_rating: Optional[int] = None  # 1-5
    ) -> None:
        """
        Record user outcome for feedback loop.
        Used to improve Layer 1 metadata over time.
        """
        pass
```

### 3.3 Database Schema Extensions

```sql
-- Repository Tables

-- Layer 1 & 2 Resources (Contextual + Proven)
CREATE TABLE repository_resources (
    id UUID PRIMARY KEY,
    title TEXT NOT NULL,
    url TEXT NOT NULL UNIQUE,
    type TEXT CHECK (type IN ('Video', 'Article', 'Course', 'Paper', 'Tool')),
    goal_domain TEXT NOT NULL,  -- e.g., "Product Management"
    topic TEXT,  -- e.g., "User Research"
    learning_style TEXT,  -- e.g., "Visual", "Text_Based"
    efficacy_layer INT DEFAULT 3,  -- 1 (Contextual), 2 (Proven), 3 (Staging)

    -- Metadata (Layer 1 only)
    success_rate_visual_learners FLOAT,
    success_rate_text_learners FLOAT,
    avg_completion_time_beginner INT,  -- minutes
    avg_completion_time_intermediate INT,
    avg_completion_time_advanced INT,
    preferred_for_adhd BOOLEAN DEFAULT FALSE,
    preferred_for_anxiety BOOLEAN DEFAULT FALSE,

    -- Validation
    uses_count INT DEFAULT 0,  -- How many roadmaps include this?
    error_reports INT DEFAULT 0,  -- Broken links, etc
    last_verified_at TIMESTAMP,

    -- Blacklist
    is_blacklisted BOOLEAN DEFAULT FALSE,
    blacklist_reason TEXT,

    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Blueprints (Templates for different goal_domains)
CREATE TABLE blueprints (
    id UUID PRIMARY KEY,
    goal_domain TEXT UNIQUE NOT NULL,  -- e.g., "Product Management", "Data Science"
    name TEXT NOT NULL,  -- e.g., "FAANG PM Standard"
    description TEXT,
    week_skeletons JSONB NOT NULL,  -- List[WeekSkeleton]
    phase_structure JSONB NOT NULL,  -- Phase templates
    min_weeks INT,
    max_weeks INT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Telemetry (Feedback loop for Layer 1 improvements)
CREATE TABLE resource_telemetry (
    id UUID PRIMARY KEY,
    resource_id UUID REFERENCES repository_resources(id),
    user_id UUID REFERENCES users(id),
    roadmap_id UUID REFERENCES roadmaps(id),
    actual_completion_time INT,  -- minutes
    was_completed BOOLEAN,
    effectiveness_rating INT CHECK (effectiveness_rating BETWEEN 1 AND 5),
    user_notes TEXT,
    learning_style_actual TEXT,  -- User's actual style (for ML training)
    recorded_at TIMESTAMP DEFAULT NOW()
);

-- Domain blacklist (centralized)
CREATE TABLE domain_blacklist (
    id UUID PRIMARY KEY,
    domain TEXT UNIQUE NOT NULL,
    reason TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Blueprint → Goal mapping (for discovery)
CREATE INDEX idx_blueprints_goal_domain ON blueprints(goal_domain);
CREATE INDEX idx_resources_topic ON repository_resources(topic, goal_domain);
CREATE INDEX idx_resources_efficacy ON repository_resources(efficacy_layer);
```

---

## 4. Integration Points with Frontend

### 4.1 Extended Onboarding Flow

**Current**: Assessment → Gap Analysis → Roadmap Preview

**New**:
1. **Cognitive Profile Questionnaire** (new step or integrated)
   - Learning style (Visual/Text_Based/Project_First/Academic)
   - Neuro type (Neurotypical/ADHD/High_Anxiety)
   - Executive function (High/Low)
   - Schedule rigidity (Fluid/Weekend_Warrior/Strict_Calendar)

2. **Goal & Context** (existing + extended)
   - Goal domain (e.g., "Product Management")
   - Target role
   - Current skill level
   - Weekly hours available
   - Deadline (weeks)

3. **Roadmap Generation** (new backend workflow)
   - Calls new `/api/agents/generate-roadmap-v2` endpoint
   - Streams progress (optional, for UX feedback)
   - Returns final RoadmapContent

4. **Roadmap Preview & Save** (existing, reused)

### 4.2 New API Endpoint

```python
# backend/app/api/routers/agents.py (extend existing)

@router.post("/agents/generate-roadmap-v2")
async def generate_roadmap_agentic(
    request: GenerateRoadmapV2Input,
    session: SessionDep,
    user_id: CurrentUser,
    background_tasks: BackgroundTasks
):
    """
    Agentic roadmap generation using LangGraph.

    Input: UserContext + CognitiveProfile + AssessmentData
    Output: RoadmapContent (fully validated)
    """
    try:
        # Initialize graph
        graph = build_roadmap_generation_graph()

        # Invoke with user context
        result = await graph.ainvoke({
            "user_context": request.user_context,
            "error_log": []
        })

        # Extract final roadmap
        roadmap_dict = result["final_roadmap"]

        # Validate schema compatibility
        roadmap_content = RoadmapContent.model_validate(roadmap_dict)

        # Optionally save to database
        background_tasks.add_task(
            save_roadmap,
            user_id=user_id,
            roadmap=roadmap_content,
            assessment=request.assessment,
            cognitive_profile=request.user_context.get("profile")
        )

        return {"roadmap": roadmap_content}

    except ValueError as e:
        # Schema validation failed
        raise HTTPException(status_code=422, detail=f"Invalid roadmap structure: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

---

## 5. Implementation Phases

### Phase 1: Foundation (Week 1)
- [ ] Design repository schema and populate seed data (FAANG PM blueprint)
- [ ] Implement RepositoryService with basic find/get methods
- [ ] Create input data models (CognitiveProfile, UserContext with camelCase compatibility)
- [ ] Set up LangGraph state and basic node structure

### Phase 2: Core Agents (Week 2)
- [ ] Node A (Profiler) - Extract cognitive context
- [ ] Node B (Pedagogy Architect) - Retrieve and scale blueprints
- [ ] Node B2 (Cognitive Adapter) - Apply personalization rules
- [ ] Test with sample inputs

### Phase 3: Specialists (Week 3)
- [ ] Node C1 (Tech Lead) - Generate build/research sections
- [ ] Node C2 (Career Coach) - Generate share/networking sections
- [ ] Node C3 (Meta-Coach) - Generate rituals/red flags/metrics
- [ ] Parallel execution orchestration

### Phase 4: Integration (Week 4)
- [ ] Node D (Integrator) - Merge fragments + resource fetching
- [ ] Node E (Validator) - Quality gates and feedback loops
- [ ] Schema transformation layer (PRD models → RoadmapContent)
- [ ] End-to-end testing with schema validation

### Phase 5: Frontend & Polish (Week 5)
- [ ] Extend onboarding UI for cognitive profile collection
- [ ] Create new API endpoint wrapper
- [ ] Error handling and user feedback
- [ ] Telemetry logging and monitoring

---

## 6. Key Constraints & Notes

1. **Schema Strictness**: Agents MUST output data that validates against `RoadmapContent` without post-processing exceptions
2. **Camel Case**: All week/phase/section fields must use camelCase (weekNumber, totalHours, buildSection, etc)
3. **Resource URLs**: Every resource MUST have a non-null `url` field (enforced by Validator)
4. **Time Budgets**: Sum of all section hours must not exceed `user.weekly_hours_cap * deadline_weeks`
5. **Backward Compatibility**: New roadmaps use v2 generator, old ones still accessible (version field in DB)
6. **Telemetry First**: Log all agent outputs (even failures) to improve the moat over time

---

## 7. Success Metrics (From PRD)

- **Moat Utilization**: >40% of resources from Layer 1/2 (vs. live search)
- **Completion Delta**: <15% variance between estimated and actual effort
- **Adaptation Rate**: 100% of roadmaps differ from base blueprint (personalized)
- **Build-Throughput**: >5 deliverables per roadmap

---

## Appendix: File Structure

```
backend/app/
├── agents/
│   ├── __init__.py
│   ├── graph.py                 # LangGraph definition + build_roadmap_generation_graph()
│   ├── nodes/
│   │   ├── __init__.py
│   │   ├── profiler.py          # Node A
│   │   ├── pedagogy_architect.py # Node B
│   │   ├── cognitive_adapter.py  # Node B2
│   │   ├── tech_lead.py          # Node C1
│   │   ├── career_coach.py       # Node C2
│   │   ├── meta_coach.py         # Node C3
│   │   ├── integrator.py         # Node D
│   │   └── validator.py          # Node E
│   ├── prompts/
│   │   ├── __init__.py
│   │   ├── profiler.py
│   │   ├── pedagogy_architect.py
│   │   ├── cognitive_adapter.py
│   │   ├── specialist_prompts.py
│   │   ├── validator.py
│   │   └── transformation.py     # PRD models → RoadmapContent
│   ├── tools/
│   │   ├── __init__.py
│   │   ├── repository.py         # Repository service interactions
│   │   ├── resource_fetcher.py   # SerpAPI, YouTube, blacklist
│   │   └── validation.py         # RoadmapContent validators
│   └── models.py                 # GraphState, intermediate models
│
├── services/
│   ├── __init__.py
│   └── repository_service.py     # Layer 1/2/3 management + telemetry
│
├── api/
│   └── routers/
│       └── agents.py             # Extend with /agents/generate-roadmap-v2
│
└── models/
    └── roadmap.py                # Existing (no changes needed)
```

