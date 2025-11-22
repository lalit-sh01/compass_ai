# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Compass AI - Roadmap Viewer** is a full-stack SaaS application that generates personalized, week-by-week learning roadmaps for Product Managers. It combines a schema-driven roadmap viewer with AI-powered content generation, user authentication, database persistence, and progress tracking.

**Tech Stack**:
- Frontend: Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS 4, Clerk (auth), Supabase (database)
- Backend: FastAPI, Python 3.12+, SQLModel, PostgreSQL (via Supabase)
- AI: OpenAI GPT-4 (user-provided API keys)

## Development Commands

### Frontend

```bash
cd frontend

# Development
npm run dev              # Start dev server at localhost:3000
npm run build            # Production build
npm start                # Start production server
npm run lint             # Run ESLint
npm test                 # Run Jest tests
npm run test:watch       # Jest watch mode
```

### Backend

```bash
cd backend

# Setup
uv sync                  # Install dependencies (locked versions)

# Development
uv run uvicorn app.main:app --reload  # Dev server at localhost:8000
uv run ruff check .      # Linting
uv run ruff format .     # Auto-format code
uv run mypy .            # Type checking

# Testing
uv run pytest            # Run all tests
uv run pytest -v         # Verbose output
uv run pytest --cov      # With coverage report
uv run pytest <file>::<test_name>  # Run specific test
```

### Docker (Local Development)

```bash
# Run both services with docker-compose
docker-compose up

# Backend at http://localhost:8000
# Frontend at http://localhost:3000
# Database at localhost:5432
```

## Architecture

### Monorepo Structure

```
roadmap-viewer/
├── frontend/              # Next.js SPA
│   ├── app/              # App Router pages and layouts
│   ├── components/       # React components
│   ├── lib/              # Utilities, API client, AI agents
│   ├── context/          # React Context state management
│   ├── hooks/            # Custom React hooks
│   ├── public/           # Static assets and example roadmaps
│   ├── supabase/         # Database migrations
│   └── brand-kit/        # Design system and themes
│
├── backend/               # FastAPI REST API
│   ├── app/
│   │   ├── api/          # REST API routers
│   │   ├── models/       # SQLModel database models
│   │   ├── services/     # Business logic layer
│   │   ├── agents/       # AI agent implementations
│   │   ├── core/         # Config, dependencies, security
│   │   └── main.py       # FastAPI app entry point
│   ├── scripts/          # Utility scripts
│   ├── pyproject.toml    # Python dependencies
│   └── Dockerfile
│
├── docker-compose.yml    # Local development orchestration
└── CLAUDE.md            # This file
```

### Two-Mode System

The application operates in two distinct modes:

#### 1. **Viewer Mode** (`/viewer/*`) - Generic Roadmap Viewer
- **No authentication required** - Can be used standalone
- Can load roadmaps from:
  - File upload (JSON conforming to schema)
  - URL (JSON endpoint)
  - Database (if user is authenticated)
- Full schema validation via AJV
- Renders any valid roadmap JSON
- Routes: `/viewer`, `/viewer/phase/[id]`, `/viewer/week/[number]`

#### 2. **SaaS Mode** (`/dashboard/*`) - Full Authenticated Platform
- **Clerk authentication required**
- User accounts synced to Supabase via webhook
- Three-step AI onboarding:
  1. Assessment agent (10-question wizard)
  2. Gap analysis agent (identify skill gaps)
  3. Roadmap generation agent (create personalized JSON roadmap)
- Dashboard for managing multiple roadmaps
- Progress tracking at deliverable level
- Roadmap editing and customization
- Encrypted API key storage (AES-256)
- Routes: `/dashboard`, `/onboarding`, `/settings`

### State Management

#### Frontend State

**RoadmapContext** (`context/RoadmapContext.tsx`):
- Global state for roadmap data across all viewer pages
- Methods:
  - `loadRoadmap(file)` - Load from file upload
  - `loadRoadmapById(id)` - Load from database
  - `setRoadmapDirect(roadmap)` - Set directly (for testing)
- Automatically validates against schema
- Consumed by all `/viewer` and `/dashboard` pages

**Zustand** (if used):
- Lightweight state for UI state patterns

#### Hybrid Flow UI Architecture

The Week View (`/viewer/week/[number]`) implements a scroll-based focus mechanism using three integrated components:

**ScrollFocusWrapper** (`components/viewer/hybrid/ScrollFocusWrapper.tsx`):
- Uses Intersection Observer API to detect when elements are in the viewport's "focus zone"
- Applies visual effects based on focus state:
  - Focused: `opacity-100 blur-0 scale-100 grayscale-0`
  - Unfocused: `opacity-40 blur-[2px] scale-95 grayscale`
- Configurable threshold (default 0.5) and rootMargin (default `-20% 0px -20% 0px`)
- Smooth 700ms transitions between states
- Wraps section components (BuildSection, ResearchSection, ShareSection)

**HeroAction** (`components/viewer/hybrid/HeroAction.tsx`):
- Displays the currently focused week's primary deliverable as a prominent call-to-action
- Shows week title and theme with gradient background and glassmorphic design
- Two action buttons: "Start Session" and "Mark Complete"
- Updated automatically as user scrolls to different sections
- Positioned in the main content area at the top of the week view

**CopilotSidebar** (`components/viewer/hybrid/CopilotSidebar.tsx`):
- Fixed-position AI assistant sidebar (right side, 1/3 width on xl screens)
- Displays context-aware help related to the currently focused section
- Shows chat history and input field for asking questions
- Full height responsive to viewport (with sticky positioning on xl and larger)

**Layout Structure** (8/4 grid):
- Main content: `xl:col-span-8` (2/3 width) - Contains sections wrapped in ScrollFocusWrapper
- Sidebar: `xl:col-span-4` (1/3 width) - Contains CopilotSidebar
- Responsive: Sidebar moves below content on screens smaller than xl
- Each section has configurable focus thresholds optimized for different screen sizes

**Focus Logic**:
- Build section: `threshold={0.1}` (triggers early for prominent display)
- Research section: `threshold={0.5}` (medium threshold)
- Share section: `threshold={0.5}` (medium threshold)
- rootMargin `-5% 0px -20% 0px` creates a focus zone in the middle 60% of the viewport
- HeroAction updates to match whichever section's focus state just changed

### Database Schema

**Core Tables** (Supabase PostgreSQL with Row Level Security):

- **users**: Synced from Clerk via webhook, tracks user metadata
- **roadmaps**: Stores roadmap data with versioning support
  - `original_roadmap` (JSONB): AI-generated version (never modified)
  - `current_roadmap` (JSONB): User's working copy (editable)
  - `edit_history` (JSONB): Array tracking last 50 edits
  - `customizations` (JSONB): Separate user modifications
- **user_api_keys**: Encrypted OpenAI API keys (AES-256)
- **assessments**: Assessment responses and gap analysis results
- **roadmap_progress**: Granular deliverable-level progress tracking
  - Uses `deliverable_path` (e.g., "week-1.buildSection.deliverables[0]")
  - Tracks completion status, notes, effectiveness ratings

**Migrations**: `supabase/migrations/` (SQL files managed via Supabase CLI)

#### Database Security - Row Level Security (RLS)

All tables in the database have RLS enabled with policies that restrict access to authenticated users' own data.

**RLS Pattern Used**:
```sql
CREATE POLICY "Users can view own data" ON tablename
FOR ALL USING (user_id IN (SELECT id FROM users WHERE clerk_user_id = current_user));
```

This pattern:
- Uses `current_user` (Supabase built-in) which is set to the Clerk user ID during authentication
- Performs a subquery to get the internal UUID from the `clerk_user_id` text field
- Applies to all operations (SELECT, INSERT, UPDATE, DELETE) with `FOR ALL`
- Ensures users can only access their own records

**Applied to tables**:
- `users`: Users can view their own profile
- `user_api_keys`: Users can only access their own API keys
- `roadmaps`: Users can only access roadmaps they created
- `roadmap_progress`: Users can only see progress on their own roadmaps
- `assessments`: Users can only see their own assessments

**RLS Troubleshooting**:
If queries fail with permission denied despite correct user authentication:
1. Verify Clerk webhook is correctly syncing users to the `users` table
2. Check that authenticated requests include valid Clerk JWT in Authorization header
3. Ensure Supabase JWT claims include the Clerk user ID as the database `current_user`
4. Check policy logic in Supabase dashboard (Authentication > Policies) for the affected table
5. Test with Supabase Dashboard's "SQL Editor" using your authenticated token

### AI Agent System

Three-stage agentic workflow (`lib/agents/` frontend, `app/agents/` backend):

1. **Assessment Agent** (`assessment-agent.ts`)
   - 10-question questionnaire to understand user background
   - Stores responses in `assessments` table
   - Output: Structured assessment data

2. **Gap Analysis Agent** (`gap-analysis-agent.ts`)
   - Analyzes assessment responses
   - Identifies specific skill gaps in PM domain
   - Output: Gap analysis JSON

3. **Roadmap Generator Agent** (`roadmap-generator-agent.ts`)
   - Creates full 14-week personalized roadmap
   - Output JSON MUST conform to `public/json_schema_final.json`
   - Validated before saving via `lib/schema-validator.ts`
   - Stored in `original_roadmap` field

**Agent Features**:
- Use user-provided OpenAI API keys (encrypted)
- Detailed prompts in `lib/agents/prompts/`
- Strict schema validation post-generation
- Detailed error messages on validation failure

### Authentication Flow

1. User navigates to `/sign-in` or `/sign-up`
2. Clerk handles OAuth (Google, GitHub, email/password)
3. Clerk issues JWT token stored in Clerk context
4. API client (`lib/api-client.ts`) automatically injects token in Authorization header
5. Backend validates JWT signature via Clerk issuer URL
6. Webhook endpoint (`app/api/webhooks/clerk/route.ts`) syncs user to Supabase on sign-up
7. User can now access `/dashboard` and API endpoints

**Note**: Middleware-based route protection currently disabled (see `middleware.ts:2`) - protected routes should be manually checked client-side.

### API Architecture

#### Frontend API Client

**Location**: `frontend/lib/api-client.ts`

```typescript
useApiClient() → {
  get(endpoint): Promise<T>
  post(endpoint, body): Promise<T>
  put(endpoint, body): Promise<T>
  patch(endpoint, body): Promise<T>
  delete(endpoint): Promise<void>
}
```

Features:
- Automatic Clerk JWT injection
- Error handling with Pydantic validation error parsing
- Configurable `NEXT_PUBLIC_API_URL` environment variable
- Supports both authenticated and public endpoints

#### Backend API Endpoints

**Roadmaps**:
- `GET /api/roadmaps` - List user's roadmaps (paginated)
- `POST /api/roadmaps` - Create new roadmap
- `GET /api/roadmaps/{id}` - Get specific roadmap
- `PATCH /api/roadmaps/{id}` - Update roadmap (supports full or partial updates)
- `DELETE /api/roadmaps/{id}` - Delete roadmap
- `POST /api/roadmaps/import` - Import external roadmap (with validation)
- `GET /api/roadmaps/stats` - Roadmap statistics

**Users**:
- `GET /api/users/me` - Get current authenticated user
- `GET /api/users/has-api-key/{provider}` - Check if API key exists for provider
- `POST /api/users/api-keys` - Store encrypted API key
- `DELETE /api/users/api-keys/{provider}` - Remove API key

**AI Agents**:
- `POST /api/agents/assess` - Run 10-question assessment
- `POST /api/agents/gap-analysis` - Analyze skill gaps
- `POST /api/agents/generate-roadmap` - Generate personalized roadmap

**Health**:
- `GET /health` - Server health check
- `GET /` - Root endpoint

### Type System & Schema Validation

**Core Roadmap Type Hierarchy** (mirrors between frontend TypeScript and backend Python):

```
Roadmap
├── Phase[] (e.g., "Foundation", "Specialization")
│   └── Week[]
│       ├── buildSection
│       │   └── Deliverable[] (with optional subtasks)
│       ├── researchSection
│       │   ├── DeepDiveTopic[] (with optional subtasks)
│       │   └── Resource[]
│       └── shareSection
│           └── Deliverable[]
├── CoreSkill[]
├── SupplementalSections
│   ├── WeeklyTimeAllocationTemplate
│   ├── SuccessMetric[]
│   ├── MasterResource[]
│   ├── InterviewBank[]
│   ├── DemonstrationMoment[]
│   ├── WeeklyRituals
│   └── CompetitiveAdvantage[]
└── Profile
```

**Frontend Types**: `frontend/lib/types.ts` (TypeScript interfaces)
**Backend Models**: `backend/app/models/roadmap.py` (SQLModel/Pydantic classes)

#### Type System Synchronization

The frontend and backend maintain parallel type definitions that must stay synchronized:

**Frontend Type Definition** (`frontend/lib/types.ts`):
```typescript
export interface Deliverable {
  description: string;
  isCompleted: boolean;
  subtasks?: Subtask[];
  notes?: string;
}
```

**Backend Type Definition** (`backend/app/models/roadmap.py`):
```python
class Deliverable(BaseModel):
    description: str
    isCompleted: bool
    subtasks: Optional[List[Subtask]] = None
    notes: Optional[str] = None
```

**Key Synchronization Pattern**:
- Field names must match exactly (camelCase for both frontend and backend JSON)
- Optional/Required status must match (TypeScript `?`, Python `Optional`)
- Type correspondences: `string ↔ str`, `number ↔ float/int`, `boolean ↔ bool`, `Type[] ↔ List[Type]`
- Backend types inherit from Pydantic `BaseModel`, frontend uses plain TypeScript interfaces

**When to Update Types**:
1. Adding a new field to a roadmap section:
   - Add to `frontend/lib/types.ts`
   - Add to `backend/app/models/roadmap.py` with same field name and type
   - Update schema in `frontend/public/json_schema_final.json` to validate it
   - Update AI generation prompt if it should be populated by AI

2. Changing a field's type (e.g., `string` → `string[]`):
   - Update both frontend and backend simultaneously
   - Test with existing roadmaps to ensure backward compatibility or plan migration
   - Update schema validation

3. Making a field optional (e.g., required → optional):
   - Frontend: Add `?` to field name (`field?: Type`)
   - Backend: Wrap in `Optional[]` (`field: Optional[Type] = None`)
   - Update schema to reflect optional status

**Validation Approach**:
- Frontend validates JSON against `frontend/public/json_schema_final.json` before sending to backend
- Backend validates using Pydantic model validation (automatic from type hints)
- If types diverge, validation fails with clear error messages pointing to the mismatch
- Use `backend/app/agents/roadmap_quality_validator.py` for additional custom validation rules

**Schema Validation**:
- **Schema File**: `frontend/public/json_schema_final.json` (JSON Schema Draft 7)
- **Frontend Validator**: `frontend/lib/validator.ts` (AJV-based)
- **Backend Validator**: `backend/app/agents/roadmap_quality_validator.py` (Pydantic + custom)
- **Coverage**: All roadmaps must include phases, weeks, sections, deliverables
- **Optional Fields**: Subtasks, resources, details, tags supported throughout

### Data Persistence & Versioning

**Never-Modify Pattern**:
- `original_roadmap`: Preserves AI-generated version (immutable)
- `current_roadmap`: User's working copy (fully editable)
- `edit_history`: JSONB array tracking last 50 edits
- `customizations`: Separate field for manual modifications

This allows:
- Rollback to original AI version
- Tracking what user changed
- Comparing AI suggestions vs. user edits
- Rerunning AI agents on original without losing edits

## Key Files & Patterns

### Frontend Key Files

#### State & Context
- `context/RoadmapContext.tsx` - Global roadmap state
- `hooks/useRoadmapMutations.ts` - Mutation operations (create, update, delete)

#### API & Utilities
- `lib/api-client.ts` - HTTP client with Clerk auth
- `lib/types.ts` - TypeScript type definitions (mirrors backend models)
- `lib/validator.ts` - AJV-based schema validation
- `lib/encryption/api-key-encryption.ts` - AES-256 encryption utilities
- `lib/schema-validator.ts` - Schema validation with detailed errors

#### AI Agents
- `lib/agents/assessment-agent.ts`
- `lib/agents/gap-analysis-agent.ts`
- `lib/agents/roadmap-generator-agent.ts`
- `lib/agents/prompts/` - Agent prompt templates

#### Routing
- `app/(dashboard)/` - Protected authenticated routes
- `app/viewer/` - Public roadmap viewer
- `app/api/` - Next.js API routes

#### Components
- `components/roadmap/` - Roadmap rendering (Phase, Week, Section components)
- `components/viewer/` - Viewer UI (controls, actions, notes, sidebar)
- `components/viewer/hybrid/` - Hybrid Flow UI (HeroAction, Copilot, ScrollFocus)
- `components/onboarding/` - Assessment wizard components
- `components/dashboard/` - Dashboard components
- `components/ui/` - Base UI elements

### Backend Key Files

#### API Routers
- `app/api/routers/roadmaps.py` - Roadmap CRUD endpoints
- `app/api/routers/users.py` - User and API key endpoints
- `app/api/routers/agents.py` - AI agent endpoints

#### Models
- `app/models/roadmap.py` - Roadmap SQLModel + schemas
- `app/models/user.py` - User model
- `app/models/user_api_key.py` - Encrypted API key storage
- `app/models/assessment.py` - Assessment data

#### Services
- `app/services/roadmap_service.py` - Roadmap business logic
- `app/services/api_key_service.py` - API key encryption/decryption

#### AI Agents
- `app/agents/roadmap_quality_validator.py` - Validates AI outputs against schema
- `app/agents/prompts/` - Prompt templates

#### Configuration
- `app/core/config.py` - Application settings
- `app/core/security.py` - JWT validation, Clerk integration
- `app/main.py` - FastAPI app setup with CORS, middleware

## Environment Variables

### Frontend (.env.local)

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
CLERK_WEBHOOK_SECRET=whsec_...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Encryption (generate: openssl rand -base64 32)
ENCRYPTION_SECRET=your-32-character-base64-string

# API
NEXT_PUBLIC_API_URL=http://localhost:8000

# Optional: System-wide OpenAI key (for fallback)
OPENAI_API_KEY=sk-...
```

### Backend (.env)

```bash
# Database
DATABASE_URL=postgresql://user:password@host:5432/database

# Clerk (copy from Clerk dashboard)
CLERK_ISSUER_URL=https://your-instance.clerk.accounts.dev

# Encryption (must match frontend ENCRYPTION_SECRET)
ENCRYPTION_KEY=your-32-character-base64-string

# Optional: System-wide OpenAI key (for fallback)
OPENAI_API_KEY=sk-...
```

## Routing Structure

### Frontend Routes

```
/                           # Landing/home page
/sign-in                    # Clerk sign-in
/sign-up                    # Clerk sign-up
/dashboard                  # Protected: User's roadmaps list
/onboarding                 # Protected: 3-step wizard
/settings                   # Protected: API key management
/viewer                     # Public: Roadmap overview
/viewer/phase/[id]          # Public: Phase detail view
/viewer/week/[number]       # Public: Week detail (Hybrid Flow UI)
/viewer/experiments/...      # Public: Experimental UI prototypes
  ├── smart-stream/
  ├── living-space/
  └── hybrid-flow/
```

### Next.js 16 App Router Specifics

- Uses App Router (not deprecated Pages Router)
- Components in `app/` are Server Components by default
- Interactive components require `'use client'` directive at top
- Route groups like `(dashboard)` don't appear in URLs
- Dynamic routes use `[id]` or `[param]` syntax
- Layouts with `layout.tsx` wrap nested routes

## Styling & Design

### Tailwind CSS 4

- **Config**: `frontend/tailwind.config.ts`
- **Dark Mode**: Class-based (`.dark` selector), not media query
- **CSS Variables**: Custom properties in `frontend/app/globals.css`
- **Color Scheme**: Primary, secondary, surface colors configurable

### Brand Kit

Located in `frontend/brand-kit/`:
- Multiple color themes (Serene, Warm, Twilight, Dusk)
- Typography guidelines
- Component specifications
- Implementation guides

## Testing

### Frontend (Jest + React Testing Library)

```bash
cd frontend
npm test                 # Run all tests
npm run test:watch      # Watch mode
```

- Test files: `__tests__/` directories
- Jest 30.2.0 configured
- React Testing Library 16.3.0 for component testing

### Backend (pytest)

```bash
cd backend
uv run pytest            # Run all tests
uv run pytest -v         # Verbose
uv run pytest --cov      # Coverage report
```

- pytest 8.3.3 with asyncio support
- Type checking with mypy

## Git Workflow & Commit Standards

### Branch Naming Conventions

```
feature/descriptive-feature-name    # New features (e.g., feature/hybrid-flow-week-view)
fix/descriptive-bug-fix             # Bug fixes (e.g., fix/api-errors-and-schema-alignment)
chore/descriptive-task              # Maintenance tasks (e.g., chore/update-dependencies)
docs/descriptive-doc-update         # Documentation updates
```

### Commit Message Format

Follow conventional commit style:
```
<type>: <brief description>

<optional longer explanation>
```

Examples from recent commits:
- `feat: Implement Hybrid Flow design for Week View`
- `fix: resolve API errors and schema alignment issues`
- `fix: correct Tailwind darkMode syntax for v4 compatibility`

**Types**:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring without feature/fix changes
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build, dependency, or tooling changes

### Pull Request Workflow

1. Create feature branch from `main`: `git checkout -b feature/your-feature-name`
2. Make commits with clear messages following convention above
3. Push to origin: `git push -u origin feature/your-feature-name`
4. Open PR against `main` with descriptive title and summary
5. Address code review feedback
6. Merge via GitHub PR interface (uses squash or merge commit strategy)
7. Delete feature branch after merge

Recent PRs follow pattern: numbered PRs (#1, #2, #3, #4) with feature/fix branch sources.

## Experimental Routes & UI Prototypes

The application uses an experimental routes system for testing new UI concepts without disrupting production.

**Location**: `/viewer/experiments/*` routes are publicly accessible and load example roadmaps.

**Experiment Types**:

1. **Roadmap-Level Experiments** (whole roadmap view):
   - `smart-stream/` - Hero action cards with context-aware AI copilot
   - `living-space/` - Micro-learning tips with progress pulse visualization
   - `hybrid-flow/` - Current production design (scroll-focus with sidebar)
   - `carousel/` - Swipeable roadmap phase carousel
   - `accordion/` - Collapsible phase/week accordion UI
   - `timeline-stream/` - Vertical timeline with streaming animation
   - `progressive/` - Progressive disclosure UI
   - `vertical-stack/` - Vertical stacked layout
   - `roadmap-redesign-final/` - Final redesign iteration

2. **Phase-Level Experiments** (phase detail view):
   - `phase-redesign/`, `phase-redesign-a/`, `phase-redesign-b/` - Phase redesign iterations
   - `phase-canvas/` - Canvas-based phase visualization
   - `phase-smart-stack/` - Smart stacking algorithm
   - `phase-hybrid/` - Hybrid layout combining multiple approaches
   - `phase-immersion/` - Immersive full-screen phase view
   - `phase-split-command/` - Split-view with command palette
   - `phase-focus-stream/` - Focus-based streaming with BlurEffect
   - `phase-integrated-horizon/` - Integrated horizon view combining weeks

3. **Component Experiments**:
   - `morphing/` - Morphing animations between states
   - `unified-split/` - Unified split layout concept

**How Experiments Work**:

Each experiment route loads a complete UI implementation and renders it with a sample/uploaded roadmap from RoadmapContext. Experiments:
- Use the same data (roadmap) as the main viewer
- Can test new components without modifying production routes
- Are isolated in their own pages (no shared state contamination)
- Can be shared via URL for feedback/testing

**Graduation Process** (Experiment → Production):

1. **Development**: Build UI in `components/experiments/` or dedicated subdirectory
2. **Testing**: Create route in `/viewer/experiments/name-of-experiment/`
3. **Validation**: Test with multiple roadmaps, gather feedback
4. **Refinement**: Iterate on design based on feedback
5. **Integration**: If approved, components graduate to main viewer routes:
   - Move component to appropriate location in `components/roadmap/` or `components/viewer/`
   - Update main viewer pages (`page.tsx` files) to use new components
   - Example: Hybrid Flow components started in `/experiments/hybrid-flow/`, then integrated into `/viewer/week/[number]/page.tsx`
6. **Cleanup**: Remove experiment route once in production

**Current Production Experiments**:
- `hybrid-flow/` has graduated and is now the default week view (`/viewer/week/[number]`)
- `smart-stream/` and `living-space/` remain as alternatives for user testing

**Adding a New Experiment**:
1. Create route: `frontend/app/viewer/experiments/my-experiment/page.tsx`
2. Implement experiment page (uses RoadmapContext like other viewer pages)
3. Test with local dev server at `http://localhost:3000/viewer/experiments/my-experiment`
4. Share with stakeholders for feedback
5. Follow graduation process if feedback is positive

## Common Development Scenarios

### Testing the Viewer Locally

```bash
npm run dev
# Visit http://localhost:3000/viewer
# Upload frontend/public/final_roadmap.json or click "Load example"
```

### Testing AI Generation

1. Set up environment variables (all services)
2. Run database migrations (Supabase CLI or dashboard)
3. Add OpenAI API key in `/settings` page
4. Navigate to `/onboarding`
5. Complete assessment → gap analysis → roadmap generation

### Adding a New Section Type to Roadmaps

1. Update `frontend/lib/types.ts` with new interface
2. Update `frontend/public/json_schema_final.json` schema
3. Create rendering component in `frontend/components/roadmap/`
4. Update AI agent prompt in `frontend/lib/agents/prompts/`
5. Add backend model support in `backend/app/models/roadmap.py`

### Database Migrations

1. Create SQL file in `supabase/migrations/` with timestamp prefix
2. Run via Supabase CLI: `supabase db push`
3. Update TypeScript types in `frontend/lib/types.ts` if schema changed
4. Update SQLModel in `backend/app/models/` if needed

### Adding API Endpoint

1. Create/update router in `backend/app/api/routers/`
2. Include router in `backend/app/main.py` with `app.include_router()`
3. Add method to `frontend/lib/api-client.ts` if new
4. Update TypeScript types if needed
5. Create frontend component/hook to consume endpoint

## Security Considerations

- **API Keys**: Encrypted with AES-256 before database storage (never sent to client)
- **JWT Auth**: Validated via Clerk issuer URL on every request
- **RLS**: Database-level security via Supabase Row Level Security policies
- **CORS**: Configured for frontend origin only
- **Sensitive Data**: Never commit `.env` files with real secrets
- **Password Reset**: Handled by Clerk (no custom password logic)

## Build Artifacts & Gitignore

The repository uses a top-level `.gitignore` to exclude build artifacts and dependencies:

**Patterns Ignored**:
```
# Build outputs
/.next/                    # Next.js build directory
/build/                    # Production build
/out/                      # Static export output

# Dependencies
/node_modules/             # npm/yarn dependencies
frontend/node_modules/     # Frontend-specific (belt and suspenders)
frontend/.next/            # Frontend-specific (belt and suspenders)

# Environment
.env*                      # All .env files (never commit secrets)

# OS files
.DS_Store                  # macOS system files

# Development
.vercel/                   # Vercel deployment cache
npm-debug.log*             # npm debug logs
.pnpm-debug.log*           # pnpm debug logs
*.tsbuildinfo              # TypeScript build info
```

**Build Artifact Cleanup**:

If `.next/` or `node_modules/` accidentally creep into git:

```bash
# Remove from git history (but not from disk)
git rm -r --cached .next/ frontend/node_modules/

# Verify they're in .gitignore, then commit
git add .gitignore
git commit -m "chore: remove cached build artifacts from version control"
```

**Checking Gitignore Compliance**:

```bash
# See what's currently tracked vs ignored
git status

# Verify specific files would be ignored
git check-ignore -v .next/ node_modules/
```

## Known Issues & Limitations

From git status and development:

1. **Middleware Auth Disabled**: Route protection via middleware currently disabled (see `middleware.ts:2`) - use client-side checks instead
2. **File Upload Disabled**: Schema validator initialization commented out in RoadmapContext - re-enable when needed
3. **UUID Type Mismatch**: `/api/users/has-api-key/{provider}` endpoint has UUID handling issue in SQLAlchemy
4. **Progress Tracking UI**: Database schema ready but frontend UI not yet implemented

## Technology Decisions & Rationale

| Decision | Tech | Rationale |
|----------|------|-----------|
| Full Stack | Next.js + FastAPI | Type-safe across stack, modern patterns |
| Frontend State | Context + Zustand | Minimal boilerplate, local state focused |
| Database | PostgreSQL/Supabase | Mature, JSON support, RLS security, real-time |
| Schema Validation | JSON Schema + Pydantic | Strong validation, clear contract |
| Auth | Clerk | OAuth providers, webhook sync, secure |
| Styling | Tailwind CSS 4 | Utility-first, CSS variables, responsive |
| ORM | SQLModel | Combined SQL + Pydantic, type-safe queries |
| API | FastAPI | Auto-docs, dependency injection, async |
| Package Manager | uv (backend) | Fast, lock file based, reproducible |
| Drag & Drop | @dnd-kit | Lightweight, accessible, headless |
| Markdown | react-markdown + remark-gfm | Safe HTML rendering with extensions |

## Performance & Optimization

- **Next.js Caching**: Server components leverage caching by default
- **Lazy Loading**: Dynamic imports for experimental routes
- **Schema Validation**: Client-side validation with AJV (fast)
- **Database Queries**: SQLModel generates efficient SQL
- **API Response**: Backend uses pagination for list endpoints
- **CSS**: Tailwind JIT generates only used classes

## Debugging Tips

### Frontend

```bash
# Check Clerk auth state
console.log(useAuth()) // Outputs auth context

# Check RoadmapContext
const { roadmap } = useRoadmap()
console.log(JSON.stringify(roadmap, null, 2))

# Debug validation errors
useApiClient().post('/api/roadmaps', roadmap)
  .catch(e => console.log(e.response?.data?.detail))
```

### Backend

```bash
# Check logs
tail -f logs/app.log

# Test JWT validation
curl -H "Authorization: Bearer <token>" http://localhost:8000/api/users/me

# Interactive docs
http://localhost:8000/docs
http://localhost:8000/redoc
```

## Resources

- [Next.js 16 Docs](https://nextjs.org/docs)
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [SQLModel Docs](https://sqlmodel.tiangolo.com/)
- [Supabase Docs](https://supabase.com/docs)
- [Clerk Docs](https://clerk.com/docs)
- [Tailwind CSS 4](https://tailwindcss.com/docs)
