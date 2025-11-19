# Architecture & Technical Documentation

## Overview
This is an AI-powered roadmap generator SaaS application that creates personalized, week-by-week learning roadmaps. It combines a schema-driven viewer with an AI-powered onboarding flow.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **UI**: React 19, Tailwind CSS 4, Lucide Icons
- **Auth**: Clerk
- **Database**: Supabase (PostgreSQL)
- **AI**: OpenAI GPT-4 (Custom Agentic Workflow)
- **Validation**: AJV (JSON Schema), Zod

## System Architecture

### 1. Two-Mode System
*   **Viewer Mode** (`/viewer/*`): Public, generic roadmap viewer. Accepts any JSON conforming to `public/json_schema_final.json`. No auth required.
*   **SaaS Mode** (`/dashboard/*`): Authenticated experience. Manages user roadmaps, progress tracking, and AI generation.

### 2. Data Flow
1.  **Input**: User completes assessment (SaaS) or uploads JSON (Viewer).
2.  **Processing**: AI Agents generate roadmap JSON (SaaS) or Validator checks file (Viewer).
3.  **Storage**: Supabase stores roadmap + metadata.
4.  **Rendering**: React components render the validated JSON.

### 3. Database Schema (Supabase)
*   **`users`**: Synced from Clerk.
*   **`roadmaps`**: Stores `original_roadmap` (immutable) and `current_roadmap` (editable).
*   **`roadmap_progress`**: Granular tracking at deliverable/topic level.
*   **`user_api_keys`**: Encrypted OpenAI keys (AES-256).
*   **`assessments`**: User assessment data.

### 4. AI Agent System (`lib/agents/`)
*   **Assessment Agent**: Generates questions based on user profile.
*   **Gap Analysis Agent**: Identifies skill gaps.
*   **Roadmap Generator Agent**: Creates JSON conforming to strict schema.

### 5. Editable Roadmap Architecture (Phase 5)
*   **Versioning**: Tracks `edit_history` (last 50 edits) for Undo/Redo.
*   **Guardrails System**:
    *   *Tier 1 (Structural)*: Locked fields (Duration, Phase count).
    *   *Tier 2 (Content)*: Validated edits (Deliverable counts, Resource limits).
    *   *Tier 3 (Quality)*: Warnings (Vague titles, missing resources).
*   **Sanitization**: All user input is sanitized (XSS prevention, safe Markdown).

## Project Structure
```
app/
├── (dashboard)/        # Authenticated routes (Dashboard, Onboarding)
├── viewer/             # Public roadmap viewer
├── api/                # API Routes (Agents, CRUD, Webhooks)
components/
├── roadmap/            # Roadmap rendering components
├── onboarding/         # Assessment & Wizard components
├── viewer/             # Viewer specific UI
lib/
├── agents/             # AI logic & prompts
├── db/                 # Database operations
├── validation/         # Schema & Guardrails validation
├── versioning/         # Edit history & Diff logic
```

## Key Configuration
*   **Schema**: `public/json_schema_final.json` is the source of truth.
*   **Env Variables**: Required for Clerk, Supabase, and Encryption.
