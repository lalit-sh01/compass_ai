# Pending Frontend Updates - PRD v4.1 Migration

**Status**: Backend fully implemented (5-node architecture). Frontend types updated. Components need migration.

**Last Updated**: Nov 2025

---

## ✅ Completed

1. ✅ Backend 5-node architecture (Inquisitor, Gap Analyst, Curator, Enricher, Validator)
2. ✅ Backend API endpoints updated
3. ✅ Frontend TypeScript types updated (`lib/types.ts`)
4. ✅ Documentation updated (`frontend/CLAUDE.md`)

---

## ⏳ Pending Frontend Updates

### **Priority 1: Core State Management**

#### **1.1 Update RoadmapContext** (`context/RoadmapContext.tsx`)

**Current Issue**: Context expects legacy schema (Phase/Week/BuildSection)

**Required Changes**:
```typescript
// Add support for new Roadmap type
import { Roadmap, LegacyRoadmap, isNewRoadmap, isLegacyRoadmap } from '@/lib/types'

interface RoadmapContextType {
  roadmap: Roadmap | LegacyRoadmap | null  // Support both formats
  isNewFormat: boolean  // Flag to indicate which schema
  // ... existing methods
}

// In loadRoadmap() and loadRoadmapById():
const detectedFormat = isNewRoadmap(data) ? 'new' : 'legacy'
```

**Files to Update**:
- `context/RoadmapContext.tsx`

**Estimated Effort**: 2-3 hours

---

### **Priority 2: Viewer Components (Gradual Migration)**

These components currently expect the legacy schema. Can be updated incrementally.

#### **2.1 Week View** (`app/viewer/week/[number]/page.tsx`)

**Current**: Expects `buildSection`, `researchSection`, `shareSection`

**Required**: Render tasks grouped by `task_type`

**Changes Needed**:
```typescript
// OLD
week.buildSection.deliverables.map(d => ...)
week.researchSection.resources.map(r => ...)

// NEW
week.tasks.filter(t => t.task_type === "BUILD").map(task => ...)
week.tasks.filter(t => t.task_type === "LEARN").map(task => ...)
week.tasks.filter(t => t.task_type === "PRACTICE").map(task => ...)
```

**Additional Features to Add**:
- Show `quality_score` badge on resources (0-100)
- Show `quality_warning = "LOW_CONFIDENCE"` indicator
- Display `resource_author` for attribution
- Show `estimated_minutes` for each task

**Files to Update**:
- `app/viewer/week/[number]/page.tsx`
- `components/roadmap/WeekCard.tsx` (if exists)

**Estimated Effort**: 3-4 hours

---

#### **2.2 Phase View** (`app/viewer/phase/[id]/page.tsx`)

**Current**: Expects `phases[number].weeks[]`

**Required**: Handle new structure `phases[{phaseName: weeks[]}]`

**Changes Needed**:
```typescript
// OLD
const phase = roadmap.phases[phaseIndex]
const weeks = phase.weeks

// NEW
const phaseObject = roadmap.phases[phaseIndex]
const phaseName = Object.keys(phaseObject)[0]
const weeks = phaseObject[phaseName]
```

**Files to Update**:
- `app/viewer/phase/[id]/page.tsx`
- `components/roadmap/PhaseCard.tsx` (if exists)

**Estimated Effort**: 2-3 hours

---

#### **2.3 Roadmap Overview** (`app/viewer/page.tsx`)

**Current**: Shows phases with old structure

**Required**: Extract phase names from `phases[{phaseName: weeks}]` structure

**Changes Needed**:
```typescript
// Extract all phase names
const phaseNames = roadmap.phases.map(phaseObj => Object.keys(phaseObj)[0])

// Get weeks for a specific phase
const getWeeksForPhase = (phaseName: string) => {
  const phaseObj = roadmap.phases.find(p => Object.keys(p)[0] === phaseName)
  return phaseObj ? phaseObj[phaseName] : []
}
```

**Files to Update**:
- `app/viewer/page.tsx`

**Estimated Effort**: 2 hours

---

### **Priority 3: New Features (PRD v4.1 Specific)**

#### **3.1 Negotiation Dialog Component**

**Purpose**: Handle IMPOSSIBLE status from Gap Analyst

**Required Features**:
- Display `StrategyBrief` with status = IMPOSSIBLE
- Show `required_effort_hours` vs `user_capacity_hours`
- Present `negotiation_options` (extend deadline OR reduce scope)
- Allow user to choose option
- Send choice back to backend to restart Curator

**Component Structure**:
```typescript
// components/onboarding/NegotiationDialog.tsx
interface NegotiationDialogProps {
  strategyBrief: StrategyBrief
  onChoose: (choice: 'extend_deadline' | 'reduce_scope' | 'proceed_anyway') => void
  onCancel: () => void
}
```

**UI Design**:
```
┌─────────────────────────────────────────────────┐
│ ⚠️  Your Goal Might Be Too Ambitious            │
├─────────────────────────────────────────────────┤
│ Required Effort: 650 hours                      │
│ Your Capacity:   480 hours (12 weeks × 10h/wk)  │
│ Discrepancy:     35% over capacity              │
│                                                 │
│ Choose an option:                               │
│                                                 │
│ ○ Extend deadline to 16 months                 │
│   (Comfortable pace, recommended)               │
│                                                 │
│ ○ Reduce target to "Competent" level           │
│   (Fit in 12 weeks, less advanced)              │
│                                                 │
│ ○ Proceed anyway                                │
│   (⚠️ High risk of burnout)                     │
│                                                 │
│ [Cancel]                          [Continue] │
└─────────────────────────────────────────────────┘
```

**Files to Create**:
- `components/onboarding/NegotiationDialog.tsx`

**Files to Update**:
- `app/(dashboard)/onboarding/page.tsx` (integrate dialog)

**Estimated Effort**: 4-5 hours

---

#### **3.2 Inquisitor Interview UI**

**Purpose**: Multi-turn conversational interview (replaces static form)

**Current**: Onboarding uses static form or 10-question wizard

**Required**: Chat interface with streaming responses

**Component Structure**:
```typescript
// components/onboarding/InquisitorChat.tsx
interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface InquisitorChatProps {
  onComplete: (userContext: UserContext) => void
}
```

**Features**:
- Display conversation history
- Stream assistant responses (SSE from `/api/agents/profile-interview/continue`)
- Detect when interview is complete (UserContext JSON returned)
- Parse UserContext and pass to parent

**Files to Create**:
- `components/onboarding/InquisitorChat.tsx`

**Files to Update**:
- `app/(dashboard)/onboarding/page.tsx` (replace wizard with chat)

**Estimated Effort**: 6-8 hours

---

#### **3.3 5-Node Progress Indicator**

**Purpose**: Show real-time progress during roadmap generation

**Current**: Shows 8-node progress (outdated)

**Required**: Update to 5-node workflow

**Progress Stages**:
```typescript
const nodeMessages = {
  inquisitor: {
    message: "🔍 Understanding your learning profile...",
    progress: 10,
  },
  gap_analyst: {
    message: "📊 Calculating feasibility...",
    progress: 30,
  },
  curator: {
    message: "📝 Designing your personalized tasks...",
    progress: 50,
  },
  enricher: {
    message: "🔗 Fetching quality resources...",
    progress: 75,
  },
  validator: {
    message: "✅ Final quality checks...",
    progress: 95,
  },
  complete: {
    message: "✨ Your roadmap is ready!",
    progress: 100,
  },
}
```

**Files to Update**:
- `app/(dashboard)/onboarding/page.tsx` (or wherever streaming happens)
- Any progress indicator component

**Estimated Effort**: 2-3 hours

---

### **Priority 4: Data Migration Utilities**

#### **4.1 Legacy-to-New Converter**

**Purpose**: Convert old roadmaps to new format for unified rendering

**Use Case**: Database has legacy roadmaps, but we want to render with new components

**Utility Function**:
```typescript
// lib/roadmap-converter.ts
export function convertLegacyToNew(legacy: LegacyRoadmap): Roadmap {
  // Extract tasks from buildSection, researchSection, shareSection
  // Map to Task[] with task_type
  // Group weeks by phases
  // Return new Roadmap structure
}
```

**Files to Create**:
- `lib/roadmap-converter.ts`

**Estimated Effort**: 4-5 hours

---

### **Priority 5: Time Unit Updates**

#### **5.1 Change `deadline_weeks` → `deadline_months`**

**Search for**: All references to `deadline_weeks`, `totalDurationWeeks` in user inputs

**Update to**: `deadline_months` (backend expects months)

**Files to Search and Update**:
```bash
# Find all occurrences
grep -r "deadline_weeks" frontend/
grep -r "weeks" frontend/app/(dashboard)/onboarding/
grep -r "weeks" frontend/components/onboarding/
```

**Conversion Logic**:
```typescript
// When sending to backend
const deadline_months = Math.ceil(deadline_weeks / 4)

// When displaying to user
const approximate_weeks = deadline_months * 4
```

**Estimated Effort**: 1-2 hours

---

## 📋 Summary Checklist

### **State Management**
- [ ] Update RoadmapContext to support both schemas
- [ ] Add type guards for runtime detection
- [ ] Handle loading both new and legacy roadmaps

### **Viewer Components**
- [ ] Week View: Render tasks by task_type
- [ ] Week View: Show quality_score and quality_warning
- [ ] Phase View: Handle new phases structure
- [ ] Overview: Extract phase names from new structure

### **New Features**
- [ ] Create NegotiationDialog component
- [ ] Create InquisitorChat component
- [ ] Update progress indicator to 5 nodes
- [ ] Show resource quality indicators

### **Utilities**
- [ ] Create legacy-to-new converter
- [ ] Add type guards and validation helpers

### **API Integration**
- [ ] Update onboarding to use `/api/agents/profile-interview/start`
- [ ] Handle SSE streaming from `/api/agents/profile-interview/continue`
- [ ] Update roadmap generation to use `/api/agents/generate-roadmap-stream`

### **Data Migration**
- [ ] Change all `deadline_weeks` → `deadline_months`
- [ ] Update form inputs and labels
- [ ] Update calculation logic (weeks ↔ months)

---

## 🎯 Estimated Total Effort

| Priority | Component | Hours |
|----------|-----------|-------|
| P1 | RoadmapContext | 2-3 |
| P2 | Week View | 3-4 |
| P2 | Phase View | 2-3 |
| P2 | Overview | 2 |
| P3 | NegotiationDialog | 4-5 |
| P3 | InquisitorChat | 6-8 |
| P3 | Progress Indicator | 2-3 |
| P4 | Legacy Converter | 4-5 |
| P5 | Time Unit Updates | 1-2 |
| **Total** | | **26-35 hours** |

---

## 🚀 Recommended Approach

### **Phase 1: Minimal Viable Migration** (8-10 hours)
1. Update RoadmapContext (dual schema support)
2. Update Week View (task-based rendering)
3. Update Progress Indicator (5 nodes)
4. Change deadline_weeks → deadline_months

**Result**: New roadmaps render correctly, existing ones still work

### **Phase 2: New Features** (10-13 hours)
1. Create InquisitorChat component
2. Create NegotiationDialog component
3. Integrate with onboarding flow

**Result**: Full PRD v4.1 workflow functional

### **Phase 3: Polish** (8-12 hours)
1. Update Phase View and Overview
2. Create legacy-to-new converter
3. Add quality indicators and warnings
4. Comprehensive testing

**Result**: Production-ready with all features

---

## 📝 Notes

- All backend work is complete and tested
- Frontend types are aligned with backend
- Can start testing backend immediately with API tools (Postman, curl)
- Frontend updates can be done incrementally without breaking existing viewer
- Type guards ensure backward compatibility during transition
