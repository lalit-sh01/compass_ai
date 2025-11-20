# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an AI-powered roadmap generator SaaS application that creates personalized, week-by-week learning roadmaps. It combines:
- A schema-driven roadmap viewer (generic, can render any JSON conforming to the schema)
- An AI-powered onboarding flow (assessment → gap analysis → roadmap generation)
- User authentication and database persistence
- Progress tracking and roadmap customization

**Tech Stack**: Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS 4, Clerk (auth), Supabase (database), OpenAI GPT-4 (AI agents)

## Development Commands

```bash
# Development
npm run dev              # Start dev server at localhost:3000
npm run build            # Production build
npm run start            # Start production server
npm run lint             # Run ESLint
```

## Architecture

### Two-Mode System

1. **Viewer Mode** (`/viewer/*`): Generic roadmap viewer that accepts JSON
   - Can load from file upload, URL, or database
   - Schema validation via AJV (`lib/validator.ts`)
   - No authentication required (can be used standalone)

2. **SaaS Mode** (`/dashboard/*`, `/onboarding`): Full authenticated experience
   - User accounts via Clerk
   - AI-generated roadmaps stored in Supabase
   - Progress tracking and customization
   - Currently in development (Phases 1-4 complete)

### State Management

**RoadmapContext** (`context/RoadmapContext.tsx`): Global state for roadmap data
- `roadmap`: Current roadmap object
- `loadRoadmap(source)`: Load from File or URL
- `loadRoadmapById(id)`: Load from database
- `setRoadmapDirect(roadmap)`: Set roadmap directly
- All pages under `/viewer` consume this context

### Database Schema (Supabase)

Key tables:
- `users`: Synced from Clerk via webhook
- `user_api_keys`: Encrypted OpenAI keys (users bring their own)
- `roadmaps`: Stores `original_roadmap` and `current_roadmap` JSONB, supports versioning
- `roadmap_progress`: Granular deliverable-level tracking
- `assessments`: Stores assessment data and gap analysis

Row Level Security (RLS) enabled on all tables.

### AI Agent System

Three-agent agentic workflow (`lib/agents/`):
1. **Assessment Agent** (`assessment-agent.ts`): 10-question assessment
2. **Gap Analysis Agent** (`gap-analysis-agent.ts`): Identifies skill gaps
3. **Roadmap Generator Agent** (`roadmap-generator-agent.ts`): Creates JSON roadmap conforming to schema

All agents:
- Use user-provided OpenAI API keys (encrypted in database)
- Have detailed prompts in `lib/agents/prompts/`
- Validate output against JSON schema (`public/json_schema_final.json`)
- Return structured JSON responses

### Authentication Flow

- Clerk handles all authentication (`@clerk/nextjs`)
- Middleware protects dashboard routes (currently disabled - see `middleware.ts:2`)
- Webhook syncs users to Supabase (`app/api/webhooks/clerk/route.ts`)
- API keys encrypted with crypto-js before storage (`lib/encryption/api-key-encryption.ts`)

### Type System

**Core Types** (`lib/types.ts`):
- `Roadmap`: Top-level roadmap structure
- `Phase`: Collection of weeks (e.g., "Foundation", "Specialization")
- `Week`: Contains `buildSection`, `researchSection`, `shareSection`
- `BuildSection`, `ResearchSection`, `ShareSection`: Different activity types
- `Deliverable`: Checkable items with optional subtasks
- Optional fields throughout (handles schema variations gracefully)

### Routing Structure

```
app/
├── page.tsx                    # Landing page (marketing)
├── (dashboard)/                # Authenticated routes
│   ├── layout.tsx             # Dashboard navigation
│   ├── dashboard/page.tsx     # User's roadmaps grid
│   ├── onboarding/page.tsx    # 3-step wizard (assessment → gap → roadmap)
│   └── settings/page.tsx      # API key management
├── viewer/                     # Public roadmap viewer
│   ├── page.tsx               # Roadmap overview
│   ├── phase/[id]/page.tsx    # Phase details
│   └── week/[number]/page.tsx # Week details
└── api/
    ├── agents/                # AI agent endpoints
    ├── roadmaps/              # CRUD operations
    ├── settings/              # API key management
    └── webhooks/              # Clerk user sync
```

## Key Files and Their Purposes

### Data Loading Flow
1. User uploads JSON or loads from database
2. `lib/validator.ts` validates against `public/json_schema_final.json`
3. `context/RoadmapContext.tsx` stores validated roadmap
4. Viewer pages render from context

### Schema Validation
- **Schema file**: `public/json_schema_final.json` (JSON Schema Draft 7)
- **Validator**: `lib/validator.ts` (AJV-based)
- **Usage**: Both client-side (file upload) and server-side (AI generation)
- **Error handling**: Human-readable error messages for validation failures

### API Routes

**Roadmaps**:
- `GET /api/roadmaps`: List user's roadmaps
- `POST /api/roadmaps`: Create new roadmap
- `GET /api/roadmaps/[id]`: Get specific roadmap
- `PATCH /api/roadmaps/[id]`: Update roadmap
- `DELETE /api/roadmaps/[id]`: Delete roadmap

**AI Agents**:
- `POST /api/agents/assessment`: Run assessment
- `POST /api/agents/gap-analysis`: Analyze gaps
- `POST /api/agents/generate-roadmap`: Generate roadmap

All API routes use Clerk authentication (when enabled).

## Important Implementation Details

### JSON Schema Enforcement
- AI agents MUST return JSON conforming to `public/json_schema_final.json`
- Schema validator (`lib/schema-validator.ts`) validates before saving to database
- Roadmap generation prompt includes full schema definition
- If validation fails, user sees detailed error message

### Versioning Strategy
- `original_roadmap`: Never modified, preserves AI-generated version
- `current_roadmap`: User's working copy (editable)
- `edit_history`: JSONB array tracking last 50 edits
- `customizations`: Separate field for user modifications

### Progress Tracking (Not Yet Implemented)
- Designed to track at deliverable level (not just week/phase)
- Uses `deliverable_path` (e.g., "week-1.buildSection.deliverables[0]")
- Supports completion status, notes, effectiveness ratings
- State persisted in `roadmap_progress` table

### Encryption
- OpenAI API keys encrypted using AES-256 (`lib/encryption/api-key-encryption.ts`)
- Requires `ENCRYPTION_SECRET` environment variable
- Keys never exposed to client (server-side only)

## Environment Variables Required

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

# Encryption (generate with: openssl rand -base64 32)
ENCRYPTION_SECRET=your-32-character-secret-key

# Optional: System-wide OpenAI key (for fallback)
OPENAI_API_KEY=sk-...
```

## Current Development Status

**Completed (Phases 1-4)**:
- Authentication and user management
- Database schema and migrations
- AI agent infrastructure (all 3 agents working)
- Onboarding wizard UI (assessment → gap analysis → roadmap generation)
- Dashboard with roadmap CRUD
- Roadmap viewer integration with database

**Not Yet Implemented (Phases 5-7)**:
- Progress tracking persistence
- Roadmap editing and customization
- AI refinement capabilities
- Comprehensive testing

See `SAAS_IMPLEMENTATION_PLAN.md` for detailed implementation roadmap.

## Common Development Scenarios

### Testing the Viewer
```bash
npm run dev
# Visit http://localhost:3000/viewer
# Upload public/final_roadmap.json or use "Load example" button
```

### Testing AI Generation
1. Set up environment variables (Clerk, Supabase, ENCRYPTION_SECRET)
2. Run database migrations: `supabase/migrations/001_initial_schema.sql`
3. Add OpenAI API key in `/settings`
4. Navigate to `/onboarding`
5. Complete assessment wizard

### Adding a New Roadmap Section Type
1. Update `lib/types.ts` with new section interface
2. Update `public/json_schema_final.json` schema
3. Create component in `components/roadmap/`
4. Update AI prompts in `lib/agents/prompts/roadmap-generation.ts`
5. Add rendering logic in week page

### Database Changes
1. Create new migration file in `supabase/migrations/`
2. Run migration in Supabase dashboard or via CLI
3. Update types in `lib/types.ts` if needed
4. Update database utilities in `lib/db/`

## Known Issues

- Middleware authentication is currently disabled (see `middleware.ts:2`)
- Clerk integration is commented out in layout (see `app/layout.tsx:4`)
- Schema validator initialization is disabled in RoadmapContext (file upload won't work)
- Progress tracking UI not yet implemented (database schema ready)

## File Upload vs Database Loading

**File Upload** (currently disabled):
- Requires `initializeValidator()` in RoadmapContext
- Validates against schema before loading
- No persistence

**Database Loading** (current approach):
- Loads pre-validated roadmaps from Supabase
- Persists across sessions
- Supports versioning and editing

## Schema Conformance

All roadmaps MUST include:
- `title`, `goal`, `startDate`, `targetEndDate`
- `phases[]` with at least one phase
- Each phase has `weeks[]` with at least one week
- Each week has `buildSection`, `researchSection`, `shareSection`
- Progress tracking via `isCompleted` booleans on deliverables

Optional but supported:
- `subtasks` on deliverables and deep dive topics
- `suggestedResources` on various items
- `details`, `tags`, `components` on sections
- All fields in `supplementalSections`

## Next.js 16 Specifics

- Uses App Router (not Pages Router)
- All components in `app/` directory are Server Components by default
- Client components marked with `'use client'` directive
- Route groups like `(dashboard)` don't affect URL structure
- Dynamic routes use `[id]` or `[number]` syntax
