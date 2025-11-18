# SaaS Implementation Plan - AI-Powered Roadmap Generator

**Status**: In Progress - Phase 1
**Started**: November 15, 2025
**Target Completion**: 4 weeks

---

## Tech Stack Decisions

### ✅ Confirmed Technologies
- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Authentication**: Clerk
- **Database**: Supabase PostgreSQL
- **AI**: OpenAI GPT-4 (custom agentic solution)
- **API Key Storage**: User-provided, encrypted in database
- **Monetization**: Free tier only (for now)
- **Deployment**: Vercel

### 📦 Dependencies Installed
```bash
# Core packages installed
@clerk/nextjs
@supabase/supabase-js
@supabase/ssr
crypto-js
@types/crypto-js
zod
openai
```

---

## Implementation Roadmap

### **Phase 1: Foundation (Week 1)** - MOSTLY COMPLETE ✅
**Goal**: Set up authentication, database, and user management

#### Tasks:
1. ✅ **Install Dependencies**
   - Clerk for authentication
   - Supabase for database
   - Crypto-js for encryption
   - OpenAI SDK
   - Svix for webhook verification

2. ✅ **Create Project Structure**
   - Created middleware.ts for Clerk auth
   - Created Supabase client utilities
   - Created lib directories (supabase, db, agents, encryption)
   - Created .env.example template

3. ✅ **Authentication & User Management**
   - ✅ Create Clerk authentication routes (sign-in, sign-up)
   - ✅ Implement Clerk → Supabase user sync webhook
   - ✅ Build encryption utilities for API keys
   - ✅ Create Settings page with API key management
   - ✅ Create dashboard layout and navigation
   - ✅ Create landing page with hero section
   - [ ] Set up Supabase database schema (run migrations) - NEXT STEP

#### Files Created:
```
✅ middleware.ts                          # Clerk auth middleware
✅ .env.example                           # Environment variable template (updated with webhook secret)
✅ lib/supabase/client.ts                 # Browser Supabase client
✅ lib/supabase/server.ts                 # Server Supabase client
✅ lib/db/users.ts                        # User CRUD operations
✅ lib/db/api-keys.ts                     # API key management
✅ lib/encryption/api-key-encryption.ts   # AES encryption utilities
✅ app/(auth)/sign-in/[[...sign-in]]/page.tsx
✅ app/(auth)/sign-up/[[...sign-up]]/page.tsx
✅ app/(auth)/layout.tsx
✅ app/(dashboard)/layout.tsx             # Dashboard layout with navigation
✅ app/(dashboard)/dashboard/page.tsx     # Main dashboard page
✅ app/(dashboard)/settings/page.tsx      # Settings page
✅ components/settings/ApiKeySettings.tsx # API key management UI
✅ app/api/webhooks/clerk/route.ts        # Clerk webhook handler
✅ app/api/settings/api-keys/route.ts     # API key CRUD endpoints
✅ app/page.tsx                           # Updated landing page
```

---

### **Phase 2: AI Agent Infrastructure (Week 1-2)** - NOT STARTED
**Goal**: Build three-agent agentic workflow

#### Tasks:
- [ ] Set up OpenAI integration wrapper
- [ ] Build Assessment Agent with prompts
- [ ] Build Gap Analysis Agent
- [ ] Build Roadmap Generation Agent with schema validation
- [ ] Test end-to-end agentic workflow

#### Files to Create:
```
lib/agents/assessment-agent.ts
lib/agents/gap-analysis-agent.ts
lib/agents/roadmap-generator-agent.ts
lib/agents/refinement-agent.ts
lib/agents/prompts/assessment.ts
lib/agents/prompts/gap-analysis.ts
lib/agents/prompts/roadmap-generation.ts
lib/openai.ts
lib/schema-validator.ts
```

---

### **Phase 3: Onboarding Flow UI (Week 2)** - COMPLETE ✅
**Goal**: Build beautiful onboarding experience

#### Tasks:
- ✅ Create onboarding wizard layout
- ✅ Build Assessment questionnaire UI
- ✅ Build Gap Analysis review UI
- ✅ Build roadmap preview
- ✅ Add animations and polish

#### Files Created:
```
✅ app/(dashboard)/onboarding/page.tsx
✅ components/onboarding/AssessmentWizard.tsx
✅ components/onboarding/GapAnalysisReview.tsx
✅ components/onboarding/RoadmapPreview.tsx
✅ app/api/agents/assessment/route.ts
✅ app/api/agents/gap-analysis/route.ts
✅ app/api/agents/generate-roadmap/route.ts
```

---

### **Phase 4: Dashboard & Roadmap Management (Week 2-3)** - COMPLETE ✅
**Goal**: Build dashboard with CRUD operations

#### Tasks:
- ✅ Build main dashboard page
- ✅ Create RoadmapCard component
- ✅ Implement CRUD API routes
- ✅ Integrate existing viewer with database loading
- ✅ Add roadmap statistics

#### Files Created:
```
✅ app/(dashboard)/dashboard/page.tsx (updated with roadmap grid)
✅ components/dashboard/RoadmapCard.tsx
✅ components/dashboard/RoadmapGrid.tsx
✅ lib/db/roadmaps.ts (complete CRUD operations)
✅ lib/db/users.ts
✅ lib/db/api-keys.ts
✅ app/api/roadmaps/route.ts (GET, POST)
✅ app/api/roadmaps/[id]/route.ts (GET, PATCH, DELETE)
✅ context/RoadmapContext.tsx (updated with loadRoadmapById)
✅ app/viewer/page.tsx (updated to load from database)
```

---

### **Phase 5: Progress Tracking & Editability (Week 3)** - NOT STARTED
**Goal**: Implement progress tracking and editing

#### Tasks:
- [ ] Implement checkbox state persistence
- [ ] Build progress tracking system
- [ ] Add note-taking functionality
- [ ] Implement custom resource addition
- [ ] Build edit history tracking
- [ ] Add skip/hide week functionality

#### Files to Create:
```
lib/db/progress.ts
lib/progress-calculator.ts
lib/versioning.ts
components/viewer/ProgressTracker.tsx
components/viewer/EditableDeliverable.tsx
components/viewer/AddResourceButton.tsx
components/viewer/WeekNotes.tsx
components/viewer/SkipWeekButton.tsx
app/api/progress/route.ts
```

---

### **Phase 6: Roadmap Refinement (Week 3-4)** - NOT STARTED
**Goal**: Enable AI-powered roadmap refinement

#### Tasks:
- [ ] Build refinement wizard
- [ ] Implement refinement agent
- [ ] Build diff viewer
- [ ] Implement version management
- [ ] Add metadata editing

#### Files to Create:
```
app/(dashboard)/roadmap/[id]/refine/page.tsx
components/refinement/RefineWizard.tsx
components/refinement/DiffViewer.tsx
components/refinement/ChangeAcceptor.tsx
app/api/agents/refine/route.ts
```

---

### **Phase 7: Polish & Launch (Week 4)** - NOT STARTED
**Goal**: Production-ready application

#### Tasks:
- [ ] Error handling and edge cases
- [ ] Loading states and optimistic updates
- [ ] Performance optimization
- [ ] Testing (unit, integration, E2E)
- [ ] Documentation
- [ ] Deploy to production

---

## Database Schema (Supabase)

**Save this schema - Run when Supabase project is ready**

```sql
-- Users table (synced from Clerk)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User API Keys (encrypted)
CREATE TABLE user_api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  provider TEXT NOT NULL DEFAULT 'openai',
  encrypted_key TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Roadmaps with versioning
CREATE TABLE roadmaps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,

  -- Metadata
  title TEXT NOT NULL,
  goal TEXT,
  status TEXT DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed', 'paused', 'archived')),

  -- Roadmap Content (Versioning)
  original_roadmap JSONB NOT NULL,
  current_roadmap JSONB NOT NULL,
  customizations JSONB DEFAULT '{}'::jsonb,

  -- Version Control
  version INTEGER DEFAULT 1,
  edit_history JSONB[] DEFAULT ARRAY[]::JSONB[],

  -- Dates
  start_date TIMESTAMP WITH TIME ZONE,
  target_end_date TIMESTAMP WITH TIME ZONE,
  total_duration_weeks INTEGER,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_viewed_at TIMESTAMP WITH TIME ZONE,

  -- Flags
  is_archived BOOLEAN DEFAULT false
);

-- Progress Tracking
CREATE TABLE roadmap_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  roadmap_id UUID REFERENCES roadmaps(id) ON DELETE CASCADE,

  -- Location
  phase_number INTEGER,
  week_number INTEGER,
  section_type TEXT CHECK (section_type IN ('build', 'research', 'share')),
  deliverable_path TEXT,

  -- Progress
  is_completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  user_note TEXT,
  effectiveness_rating INTEGER CHECK (effectiveness_rating BETWEEN 1 AND 5),

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(roadmap_id, deliverable_path)
);

-- Assessments
CREATE TABLE assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  roadmap_id UUID REFERENCES roadmaps(id) ON DELETE CASCADE,

  assessment_data JSONB NOT NULL,
  gap_analysis JSONB NOT NULL,
  selected_skills JSONB,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_roadmaps_user_id ON roadmaps(user_id);
CREATE INDEX idx_roadmaps_status ON roadmaps(status);
CREATE INDEX idx_roadmaps_archived ON roadmaps(is_archived);
CREATE INDEX idx_progress_roadmap_id ON roadmap_progress(roadmap_id);
CREATE INDEX idx_progress_week ON roadmap_progress(roadmap_id, week_number);
CREATE INDEX idx_user_api_keys_user_id ON user_api_keys(user_id);
CREATE INDEX idx_assessments_user_id ON assessments(user_id);

-- Row Level Security (RLS) Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE roadmap_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (clerk_user_id = current_user);
CREATE POLICY "Users can view own API keys" ON user_api_keys FOR ALL USING (user_id IN (SELECT id FROM users WHERE clerk_user_id = current_user));
CREATE POLICY "Users can view own roadmaps" ON roadmaps FOR ALL USING (user_id IN (SELECT id FROM users WHERE clerk_user_id = current_user));
CREATE POLICY "Users can view own progress" ON roadmap_progress FOR ALL USING (roadmap_id IN (SELECT id FROM roadmaps WHERE user_id IN (SELECT id FROM users WHERE clerk_user_id = current_user)));
CREATE POLICY "Users can view own assessments" ON assessments FOR ALL USING (user_id IN (SELECT id FROM users WHERE clerk_user_id = current_user));
```

---

## Environment Variables Setup

**Create `.env.local` file with these variables:**

```bash
# 1. Set up Clerk (https://clerk.com)
#    - Create new application
#    - Get publishable and secret keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# 2. Set up Supabase (https://supabase.com)
#    - Create new project
#    - Get URL and keys from Settings > API
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# 3. Generate encryption secret (32 characters)
#    - Use: openssl rand -base64 32
ENCRYPTION_SECRET=your-32-character-secret-key-here

# 4. Optional: OpenAI for system operations
OPENAI_API_KEY=sk-...
```

---

## Current To-Do List

### ✅ Completed (Phases 1-4)
**Phase 1: Foundation**
1. ✅ Install dependencies (Clerk, Supabase, OpenAI, Svix, etc.)
2. ✅ Create middleware for Clerk authentication
3. ✅ Create Supabase client utilities
4. ✅ Set up project structure
5. ✅ Install and configure Clerk for authentication
6. ✅ Create Clerk auth routes (sign-in/sign-up pages)
7. ✅ Implement Clerk → Supabase user sync webhook
8. ✅ Build encryption utilities for API key storage
9. ✅ Build Settings page with API key management
10. ✅ Create dashboard layout and navigation
11. ✅ Create landing page with hero section
12. ✅ Set up Supabase project and run database migrations

**Phase 2: AI Agent Infrastructure**
13. ✅ Build OpenAI integration wrapper
14. ✅ Build Assessment Agent with prompts
15. ✅ Build Gap Analysis Agent with prompts
16. ✅ Build Roadmap Generation Agent with prompts
17. ✅ Build schema validator
18. ✅ Create agent API routes

**Phase 3: Onboarding Flow UI**
19. ✅ Build onboarding wizard with 3-step flow
20. ✅ Create Assessment questionnaire UI
21. ✅ Create Gap Analysis review UI with skill selection
22. ✅ Create Roadmap preview and save

**Phase 4: Dashboard & Roadmap Management**
23. ✅ Build dashboard with roadmap grid
24. ✅ Create RoadmapCard and RoadmapGrid components
25. ✅ Implement CRUD API routes for roadmaps
26. ✅ Integrate viewer with database loading
27. ✅ Add roadmap statistics

### 📋 Next Steps (Priority Order)
28. [ ] Implement Progress Tracking (Phase 5)
29. [ ] Build roadmap editing functionality
30. [ ] Add AI refinement capabilities
31. [ ] Polish and testing

---

## How to Continue This Work

### Option 1: Resume in Next Session
1. Share this file: `SAAS_IMPLEMENTATION_PLAN.md`
2. Say: "Continue from the SAAS implementation plan"
3. I'll read this file and pick up where we left off

### Option 2: Manual Continuation
1. Check the "Current To-Do List" section above
2. Start with item #6 (Create Clerk auth routes)
3. Follow the phases in order
4. Refer to "Files to Create" sections for each phase

### Option 3: Ask for Specific Phase
1. Say: "Implement Phase X from the SAAS plan"
2. I'll focus on that specific phase

---

## Key Decisions Made

### AI Architecture
- ✅ Using **custom agentic solution** with 3 specialized agents
- ✅ **User-provided API keys** (not system-wide)
- ✅ **OpenAI GPT-4** as the LLM (extensible to others later)
- ✅ Strict schema validation using Zod + AJV

### Data Architecture
- ✅ **Versioning strategy**: Keep both `original_roadmap` and `current_roadmap`
- ✅ **Edit history**: Track last 50 edits for audit trail
- ✅ **Customizations**: Separate JSONB field for user modifications
- ✅ **Progress tracking**: Granular tracking at deliverable level

### Security
- ✅ API keys encrypted with crypto-js before storage
- ✅ Row Level Security (RLS) in Supabase
- ✅ Clerk handles authentication
- ✅ Protected routes via middleware

### Monetization
- ✅ **Free tier only** for MVP
- ✅ Infrastructure ready for Stripe integration later

---

## Success Criteria (MVP)

- [ ] User can sign up/sign in with Clerk
- [ ] User can securely store OpenAI API key
- [ ] User can complete assessment in 5-10 minutes
- [ ] AI generates valid roadmap (100% schema compliance)
- [ ] Dashboard shows all user roadmaps
- [ ] Progress tracking persists across sessions
- [ ] Users can edit and refine roadmaps
- [ ] All routes protected with authentication
- [ ] Production deployment on Vercel

---

## Timeline
- **Week 1**: Phase 1-2 (Foundation + AI Agents)
- **Week 2**: Phase 3-4 (Onboarding + Dashboard)
- **Week 3**: Phase 5 (Progress Tracking)
- **Week 4**: Phase 6-7 (Refinement + Polish)

**Current Status**: End of Week 1 / Start of Week 2 - Phases 1-4 Complete! (Foundation, AI Agents, Onboarding, Dashboard)

---

## Notes
- Existing roadmap viewer is fully functional
- Schema validation is working perfectly
- All dependencies installed and configured
- Ready to build authentication and database layer

---

**Last Updated**: November 15, 2025 (Session 2 - Major Progress!)
**Next Session**: Implement Progress Tracking and Editability (Phase 5)

## 🎉 Session 2 Achievements

### What We Built:
1. **Complete AI Agent System** (Phase 2)
   - 3 specialized agents (Assessment, Gap Analysis, Roadmap Generation)
   - Comprehensive prompts with schema enforcement
   - OpenAI integration with error handling
   - Schema validation

2. **Full Onboarding Flow** (Phase 3)
   - 10-question assessment wizard
   - AI-powered gap analysis with skill selection
   - Real-time roadmap generation
   - Beautiful UI with loading states

3. **Complete Dashboard** (Phase 4)
   - Roadmap CRUD operations
   - Database integration
   - Statistics overview
   - Roadmap cards with status indicators

4. **Database Layer**
   - User management (synced with Clerk)
   - API key management (encrypted)
   - Roadmap storage with versioning
   - Progress tracking schema (ready to use)

### Files Created This Session: 35+
- 3 AI agents + prompts
- 3 onboarding components
- 6 API routes
- 4 database utilities
- 2 dashboard components
- Multiple updates to existing files
