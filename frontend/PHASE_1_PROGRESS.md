# Frontend Migration Phase 1: Core Components Update

**Status**: 🔄 **IN PROGRESS** (50% complete)
**Started**: Nov 22, 2025
**Estimated**: 10-12 hours
**Completed So Far**: ~5 hours

---

## Objective

Update core frontend components to support PRD v4.1 5-node architecture and new personalization features.

---

## ✅ Completed Tasks

### 1. Updated RoadmapGenerationStream Component

**File**: `components/streaming/RoadmapGenerationStream.tsx`

**Changes**:
- ✅ Updated from 8-node to 5-node architecture (Inquisitor → Gap Analyst → Curator → Enricher → Validator)
- ✅ Changed props to accept `UserContext` instead of individual parameters
- ✅ Updated progress messages for 5 nodes
- ✅ Added negotiation handling for IMPOSSIBLE scenarios
- ✅ Fixed type imports (Roadmap, UserContext from lib/types)
- ✅ Sends complete UserContext JSON to backend endpoint

**Before** (Old 8-node architecture):
```typescript
interface RoadmapGenerationStreamProps {
  goalDomain: string;
  targetRole: string;
  currentBackground: string;
  skillLevel: string;
  deadlineWeeks: number;  // ❌ Old: weeks
  weeklyHoursCap: number;
  additionalContext?: string;
  // ...
}

const stages = [
  'profiler', 'pedagogy_architect', 'cognitive_adapter',
  'tech_lead', 'career_coach', 'meta_coach', 'integrator', 'validator'
];
```

**After** (New 5-node architecture):
```typescript
interface RoadmapGenerationStreamProps {
  userContext: UserContext;  // ✅ New: complete context object
  onComplete: (roadmap: Roadmap) => void;
  onError: (error: string) => void;
  onNegotiationRequired?: (strategyBrief: any) => void;
}

const stages = [
  'inquisitor',    // Node A
  'gap_analyst',   // Node B
  'curator',       // Node C
  'enricher',      // Node D
  'validator',     // Node E
];
```

---

### 2. Updated Onboarding Page

**File**: `app/(dashboard)/onboarding/page.tsx`

**Changes**:
- ✅ Updated to use `UserContext` type from lib/types
- ✅ Changed `handleProfilerComplete` to accept UserContext
- ✅ Updated RoadmapGenerationStream to receive full userContext
- ✅ Updated success page to display new UserContext fields:
  - `specific_goal` (instead of goal_domain)
  - `learning_preferences` (instead of learning_style)
  - `deadline_months` (instead of deadline_weeks)
  - `budget_constraint` (optional)
  - Shows both old and new fields for backward compatibility

**Before**:
```typescript
<RoadmapGenerationStream
  goalDomain={userContext.goal_domain || 'Learning'}
  targetRole={userContext.target_role || 'Expert'}
  currentBackground={userContext.background_summary || ''}
  skillLevel={userContext.current_skill_level || 'Intermediate'}
  deadlineWeeks={userContext.constraints?.hard_deadline_weeks || 14}
  weeklyHoursCap={userContext.constraints?.hours_per_week || 12}
  // ...
/>
```

**After**:
```typescript
<RoadmapGenerationStream
  userContext={userContext}
  onComplete={handleGenerationComplete}
  onError={handleGenerationError}
/>
```

---

### 3. TypeScript Types Already Updated

**File**: `lib/types.ts` (completed in backend personalization phase)

**Changes Already Done**:
- ✅ UserContext interface supports both old and new fields
- ✅ Roadmap interface uses new PRD v4.1 structure
- ✅ Task interface includes domain-specific task_type
- ✅ All fields properly typed as Optional where applicable

---

## 🔄 In Progress Tasks

### 4. RoadmapContext Updates (NOT STARTED YET)

**File**: `context/RoadmapContext.tsx`

**Needed Changes**:
- [ ] Add type guards for new vs legacy Roadmap format
- [ ] Update loadRoadmapById to handle new Roadmap structure
- [ ] Add helper methods for extracting weeks from phases
- [ ] Update validation logic for new schema

**Current State**: RoadmapContext loads roadmaps but doesn't differentiate between old and new formats yet.

---

### 5. Week/Phase Viewer Components (NOT STARTED YET)

**Files to Update**:
- `components/roadmap/WeekCard.tsx`
- `components/roadmap/PhaseCard.tsx`
- `app/viewer/week/[number]/page.tsx`
- `app/viewer/phase/[id]/page.tsx`

**Needed Changes**:
- [ ] Update to render new Task[] structure instead of buildSection/researchSection/shareSection
- [ ] Handle domain-specific task_type values (e.g., "drill", "outreach")
- [ ] Display task_category_label for better UX
- [ ] Show quality_warning for LOW_CONFIDENCE resources
- [ ] Support new phase structure: `Array<{ [phaseName: string]: Week[] }>`

**Current State**: Viewers expect old schema (buildSection, researchSection, shareSection). Will break with new roadmaps.

---

## 📝 Not Started Tasks

### 6. Type Guards and Validation

**File**: New utility file `lib/roadmap-utils.ts`

**Needed**:
- [ ] Create `isNewRoadmap()` type guard (already in types.ts but not used)
- [ ] Create `isLegacyRoadmap()` type guard (already in types.ts but not used)
- [ ] Create helper functions:
  - `extractAllWeeks(roadmap)` - Get all weeks from phases
  - `getPhaseNames(roadmap)` - Extract phase names
  - `getTasksByType(week, taskType)` - Filter tasks by type

---

### 7. Update RoadmapPreview Component (OPTIONAL)

**File**: `components/onboarding/RoadmapPreview.tsx`

**Needed Changes**:
- [ ] Update to render new Roadmap structure
- [ ] Show task breakdown by domain-specific types (not just LEARN/PRACTICE/BUILD)
- [ ] Display personalized phase names

**Current State**: May be using old structure. Needs verification.

---

## 🚫 Out of Scope (Phase 2+)

The following are NOT part of Phase 1:

- ❌ Form updates (Phase 2) - Replace dropdowns with text inputs
- ❌ Negotiation dialog (Phase 3) - Handle IMPOSSIBLE scenarios
- ❌ Inquisitor UI updates (Phase 4) - Already works, no changes needed

---

## Impact Summary

### What Works Now ✅

1. **Inquisitor Interview**: ProfilerInterview component already uses new endpoints, outputs UserContext
2. **Roadmap Generation**: RoadmapGenerationStream now sends correct format to backend
3. **Onboarding Flow**: Page correctly passes UserContext and saves new Roadmap format
4. **Backend Integration**: All backend endpoints expect and return correct formats

### What Needs Work 🔄

1. **RoadmapContext**: Needs to differentiate between old and new formats
2. **Viewer Components**: Week/Phase viewers expect old schema, will break with new roadmaps
3. **Type Guards**: Need to use isNewRoadmap() / isLegacyRoadmap() helpers

### Estimated Remaining Work

| Task | Status | Estimated Time |
|------|--------|----------------|
| RoadmapContext updates | Not started | 2-3 hours |
| Week/Phase viewer updates | Not started | 3-4 hours |
| Type guards & utilities | Not started | 1-2 hours |
| Testing & bug fixes | Not started | 1 hour |
| **Total Phase 1 Remaining** | | **7-10 hours** |

---

## Testing Plan (After Phase 1 Complete)

1. **Test New Roadmap Flow**:
   - Complete Inquisitor interview with new open-ended fields
   - Verify roadmap generation with 5-node architecture
   - Confirm new roadmap saves to database
   - Load roadmap in viewer and verify rendering

2. **Test Backward Compatibility**:
   - Load existing roadmaps from database (old format)
   - Verify they still render correctly in viewer
   - Test type guards correctly identify format

3. **Test Personalization Features**:
   - Generate tennis roadmap, verify 65% drill tasks
   - Generate sales roadmap, verify "outreach" task types
   - Check task_category_label displays correctly

---

## Next Steps

**Immediate Priority** (to complete Phase 1):

1. **Update RoadmapContext** to handle both formats
2. **Update Week/Phase viewers** to render new Task[] structure
3. **Create utility functions** for common operations
4. **Test end-to-end** flow with new roadmap generation

**After Phase 1**:
- Move to Phase 2: Form updates (8-10 hours)
- Then Phase 3: Negotiation dialog (6-8 hours)
- Finally Phase 4: Onboarding polish (2-5 hours)

---

## Files Changed So Far

### Updated ✅
1. `components/streaming/RoadmapGenerationStream.tsx` - 5-node architecture
2. `app/(dashboard)/onboarding/page.tsx` - UserContext integration

### Needs Update 🔄
3. `context/RoadmapContext.tsx` - Format handling
4. `components/roadmap/WeekCard.tsx` - Task rendering
5. `components/roadmap/PhaseCard.tsx` - Task rendering
6. `app/viewer/week/[number]/page.tsx` - Viewer logic
7. `app/viewer/phase/[id]/page.tsx` - Viewer logic

### New Files Needed ✨
8. `lib/roadmap-utils.ts` - Helper functions

---

## Summary

**Progress**: 50% of Phase 1 complete
- ✅ Backend integration updated (RoadmapGenerationStream, onboarding)
- 🔄 Viewer components need updates to render new format
- ⏳ 7-10 hours estimated to complete Phase 1

**Key Achievement**: Onboarding flow now fully supports personalization improvements and 5-node architecture.

**Next**: Update viewer components to handle both old and new Roadmap formats.
