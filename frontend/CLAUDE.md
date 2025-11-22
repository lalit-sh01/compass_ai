# CLAUDE.md - Frontend Documentation

**IMPORTANT**: The backend has been completely refactored to PRD v4.1 specifications (5-node architecture). This document reflects the CURRENT state as of Nov 2025.

## Project Overview

**Compass AI - Roadmap Viewer** is a full-stack SaaS application that generates personalized, week-by-week learning roadmaps using a 5-node agentic AI system.

**Frontend Tech Stack**: Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS 4, Clerk (auth), Supabase (database client)

**Backend Tech Stack** (see `../backend/`): FastAPI, Python 3.12+, LangGraph, OpenAI GPT-4o/GPT-4o-mini, SerpAPI, YouTube Data API v3

---

## Development Commands

```bash
cd frontend

# Development
npm run dev              # Start dev server at localhost:3000
npm run build            # Production build
npm start                # Start production server
npm run lint             # Run ESLint
```

---

## Backend Architecture (PRD v4.1 - 5-Node System)

The backend implements a **strictly deterministic** 5-node workflow per PRD:

```
START → A (Inquisitor) → B (Gap Analyst) → C (Curator) → D (Enricher) → E (Validator) → END
                              │                                               │
                         [Negotiation]                                 [Loop to C if rejected]
```

### Node Descriptions

1. **Node A: Inquisitor** (GPT-4o-mini)
   - Multi-turn conversational interview
   - Populates `UserContext` with all required fields
   - Infers `learning_style` and `motivation_anchor` from conversation
   - **Critical change**: Uses `deadline_months` (not weeks!)

2. **Node B: Gap Analyst** (GPT-4o)
   - Executes **Effort vs. Capacity Algorithm**
   - Calculates: `Required_Effort` vs `User_Capacity` with 1.2× buffer
   - Returns `StrategyBrief` with status: OPTIMAL | TIGHT | IMPOSSIBLE
   - If IMPOSSIBLE: Generates negotiation options (extend time OR reduce scope)

3. **Node C: Curator** (GPT-4o)
   - Generates granular, time-boxed tasks
   - **Volume Rule**: Weekly tasks MUST sum to `weekly_hours_cap × 60` minutes (±5%)
   - Task types: LEARN (50%), PRACTICE (30%), BUILD (20%)
   - **Resource Authority Protocol**: Generates search queries, NOT URLs
     - Example: `"site:youtube.com PingSkills forehand topspin"`
     - NEVER generates hallucinated URLs

4. **Node D: Enricher** (Python Tool - NOT an LLM)
   - Executes search queries in parallel (asyncio)
   - Uses **QualityResourceFetcher** with weighted scoring:
     - 50% Domain Authority (trusted domains/authors)
     - 30% Social Proof (view counts)
     - 20% Relevance & Quality (description, freshness)
   - If score < 30: Sets `quality_warning = "LOW_CONFIDENCE"`
   - Fallback to mock data if API keys not configured

5. **Node E: Validator** (GPT-4o-mini)
   - Automated checks: Time audit, resource completeness, required fields
   - LLM semantic review for LOW_CONFIDENCE resources
   - If APPROVED: Roadmap complete
   - If REJECTED: Returns detailed `error_log` and loops back to Curator

### Key Backend Models (Pydantic)

Located at `backend/app/agents/models.py`:

```python
class UserContext(BaseModel):
    goal_domain: str  # Cognitive | Physical | Market
    specific_goal: str
    current_skill_level: Literal["Beginner", "Intermediate", "Advanced"]
    target_skill_level: Literal["Competent", "Proficient", "Master"]
    weekly_hours_cap: int
    deadline_months: int  # ⚠️ MONTHS not weeks!
    budget_tier: Literal["Free_Only", "Low_Budget", "Premium"]
    learning_style: Literal["Visual_Video", "Text_Documentation", "Project_Based"]
    motivation_anchor: Optional[str]

class Task(BaseModel):
    task_id: str  # UUID
    task_name: str
    task_type: Literal["LEARN", "PRACTICE", "BUILD"]
    estimated_minutes: int
    description: str
    resource_search_query: str  # Curator generates
    resource_url: Optional[str]  # Enricher populates
    resource_title: Optional[str]
    resource_author: Optional[str]
    quality_score: Optional[float]
    quality_warning: Optional[Literal["LOW_CONFIDENCE"]]

class Week(BaseModel):
    week_number: int
    goal: str
    total_minutes: int
    tasks: List[Task]

class Roadmap(BaseModel):
    roadmap_title: str
    total_duration_weeks: int
    phases: List[Dict[str, List[Week]]]  # {"Foundation": [Week1, Week2, ...]}
```

---

## Frontend State Management

### RoadmapContext (`context/RoadmapContext.tsx`)

**Status**: Needs updating to support new backend schema

**Current Implementation** (OLD - uses Phase/Week/BuildSection structure):
```typescript
interface Roadmap {
  phases: Phase[]
  weeks: Week[]
  buildSection, researchSection, shareSection
}
```

**Required Update** (NEW - PRD v4.1):
```typescript
interface Roadmap {
  roadmap_title: string
  total_duration_weeks: number
  phases: Array<{ [phaseName: string]: Week[] }>
}

interface Week {
  week_number: number
  goal: string
  total_minutes: number
  tasks: Task[]
}

interface Task {
  task_id: string
  task_name: string
  task_type: "LEARN" | "PRACTICE" | "BUILD"
  estimated_minutes: number
  description: string
  resource_search_query: string
  resource_url?: string
  resource_title?: string
  resource_author?: string
  quality_score?: number
  quality_warning?: "LOW_CONFIDENCE"
}
```

---

## Frontend Routes

### Viewer Mode (Public)
- `/viewer` - Roadmap overview
- `/viewer/phase/[id]` - Phase detail view
- `/viewer/week/[number]` - Week detail with Hybrid Flow UI

### SaaS Mode (Authenticated)
- `/dashboard` - User's roadmaps grid
- `/onboarding` - Inquisitor interview wizard
- `/settings` - API key management

---

## Backend API Endpoints

### AI Agents (5-Node Workflow)
```typescript
POST /api/agents/profile-interview/start
// Returns: { status: "interview_started", message: string }

POST /api/agents/profile-interview/continue
// Body: { conversation_history: Array<{role, content}> }
// Returns: SSE stream with next question OR complete UserContext JSON

POST /api/agents/generate-roadmap-stream
// Body: GenerateRoadmapV2Input (converted to UserContext)
// Returns: SSE stream with progress updates from each node
```

### Roadmaps CRUD
```typescript
GET /api/roadmaps          // List user's roadmaps
POST /api/roadmaps         // Create new roadmap
GET /api/roadmaps/[id]     // Get specific roadmap
PATCH /api/roadmaps/[id]   // Update roadmap
DELETE /api/roadmaps/[id]  // Delete roadmap
```

---

## Environment Variables (.env.local)

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# Backend API
NEXT_PUBLIC_API_URL=http://localhost:8000

# Encryption (for API key storage)
ENCRYPTION_SECRET=your-32-character-base64-string
```

---

## Current Development Status (as of Nov 2025)

### ✅ Completed (Backend)
- Phase 1: 5-node architecture (Inquisitor, Gap Analyst, Curator, Enricher, Validator)
- Phase 2: PRD-compliant Pydantic models
- Phase 3: Effort vs. Capacity algorithm + QualityResourceFetcher
- Phase 4: System prompts from PRD Section 4
- Phase 5: SerpAPI + YouTube Data API integration (with mock fallback)
- Phase 6: Error handling (exponential backoff, fallback queries)
- Phase 7: Backend API endpoints updated
- Phase 9: Using OpenAI GPT-4o/GPT-4o-mini (will swap to Claude later)

### 🚧 In Progress (Frontend)
- **Phase 8: Frontend updates for 5-node workflow**
  - Update `lib/types.ts` to match new Roadmap schema
  - Update RoadmapContext to handle Task-based structure
  - Create Negotiation dialog UI for IMPOSSIBLE scenarios
  - Update streaming progress indicators (5 nodes, not 8)
  - Change all references from `deadline_weeks` to `deadline_months`

### ⏳ Pending
- Phase 10: Comprehensive testing (unit, integration, E2E)

---

## Known Breaking Changes (Frontend Needs Update)

1. **Roadmap Schema Change**:
   - OLD: `phases[].weeks[].buildSection.deliverables[]`
   - NEW: `phases[{phaseName: weeks[].tasks[]}]`

2. **Time Unit Change**:
   - OLD: `deadline_weeks` (integer, weeks)
   - NEW: `deadline_months` (integer, months)

3. **Resource Structure**:
   - OLD: Resources in `researchSection.resources[]`
   - NEW: Each task has `resource_url`, `resource_title`, `resource_author`, `quality_score`

4. **Section Structure Removed**:
   - OLD: `buildSection`, `researchSection`, `shareSection`
   - NEW: Single `tasks[]` array with `task_type` discriminator (LEARN/PRACTICE/BUILD)

---

## Testing the System

### Backend Only (Mock Data)
```bash
cd backend
uv run uvicorn app.main:app --reload

# Test Inquisitor
curl -X POST http://localhost:8000/api/agents/profile-interview/start

# Test full workflow (with mock user context)
curl -X POST http://localhost:8000/api/agents/generate-roadmap-stream \
  -H "Content-Type: application/json" \
  -d '{"goal_domain": "Cognitive", "target_role": "PM at Google", ...}'
```

### With Real APIs (Optional)
Add to `backend/.env`:
```bash
SERPAPI_API_KEY=your_key_here
YOUTUBE_API_KEY=your_key_here
```

Then run:
```bash
cd backend
uv sync  # Install aiohttp dependency
uv run uvicorn app.main:app --reload
```

---

## Migration Guide for Frontend Developers

If you're updating frontend code that expects the OLD schema:

1. **Replace `Phase` references** with new structure:
   ```typescript
   // OLD
   roadmap.phases[0].weeks[0].buildSection.deliverables

   // NEW
   Object.values(roadmap.phases[0])[0][0].tasks.filter(t => t.task_type === "BUILD")
   ```

2. **Update time calculations**:
   ```typescript
   // OLD
   const weeks = userInput.deadline_weeks

   // NEW
   const weeks = userInput.deadline_months * 4  // Approximate
   ```

3. **Handle new resource structure**:
   ```typescript
   // OLD
   week.researchSection.resources.map(r => r.url)

   // NEW
   week.tasks
     .filter(t => t.resource_url)
     .map(t => ({ url: t.resource_url, title: t.resource_title, quality: t.quality_score }))
   ```

---

## References

- **PRD v4.1**: `/Users/lalitshewani/projects/PRDs/PRD.pdf`
- **Backend Documentation**: `../backend/README.md`
- **API Keys Setup**: `../backend/API_KEYS_SETUP.md`
- **Main Project CLAUDE.md**: `../CLAUDE.md` (root-level, covers both frontend and backend)
