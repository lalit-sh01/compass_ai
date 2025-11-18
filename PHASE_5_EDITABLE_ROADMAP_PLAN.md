# Phase 5: Editable Roadmap with Guardrails - Implementation Plan

**Created**: November 16, 2025
**Status**: Planning Complete - Ready for Implementation
**Context**: Building on MVP Phases 1-4 (Auth, AI Agents, Onboarding, Dashboard)
**Goal**: Make roadmaps editable while maintaining quality and structure integrity

---

## 🎯 Core Principles

### What Makes This Different
1. **Guardrails First**: Users can customize, but can't break roadmap integrity
2. **AI-Assisted Editing**: Suggest improvements, not just free-form text
3. **Progressive Enhancement**: Start with what they can't change, then add editability
4. **Undo/Redo Always**: Version control built-in from day 1
5. **Validation on Save**: Never allow invalid roadmaps to persist

### The "Locked vs. Editable" Philosophy
```
LOCKED (Cannot Edit):
- Week structure (phaseNumber, weekNumber)
- Total duration
- Schema structure (fields, types)
- Relationships between sections

EDITABLE (User Control):
- Week titles, themes, descriptions
- Deliverables (add, edit, remove, check off)
- Resources (add, edit, remove)
- Notes per week/topic/deliverable
- Hours allocation
- Skip/hide weeks
- Reorder within constraints
```

---

## 📐 Architecture Overview

### Data Flow
```
User Action (Edit)
    ↓
Frontend Validation (Instant feedback)
    ↓
Optimistic UI Update (Show change immediately)
    ↓
API Call with Guardrails Check
    ↓
Database Update + Version History
    ↓
Background: Recalculate Progress & Stats
    ↓
Sync UI State (or rollback on error)
```

### State Management Strategy
```typescript
// Current state
currentRoadmap: Roadmap           // What user sees
originalRoadmap: Roadmap          // AI-generated baseline (immutable)
editHistory: Edit[]               // Last 50 edits for undo/redo
unsavedChanges: boolean          // Dirty flag
validationErrors: ValidationError[] // Real-time validation

// Progress tracking
progress: {
  weekProgress: Map<number, number>    // % complete per week
  phaseProgress: Map<number, number>   // % complete per phase
  overallProgress: number              // Total %
  completedDeliverables: number
  totalDeliverables: number
}
```

---

## 🛡️ Guardrails System

### Tier 1: Structural Guardrails (Cannot Override)
```typescript
interface StructuralGuardrails {
  // Cannot change these
  totalDurationWeeks: number    // Locked
  phaseCount: number            // Locked
  weekNumbers: number[]         // Locked sequence

  // Can only modify within bounds
  phaseWeekDistribution: {
    min: number                 // Phase must have ≥2 weeks
    max: number                 // Phase must have ≤8 weeks
  }

  hoursPerWeek: {
    min: number                 // Must be ≥5 hours
    max: number                 // Must be ≤40 hours
  }
}
```

### Tier 2: Content Guardrails (Can Edit with Validation)
```typescript
interface ContentGuardrails {
  deliverables: {
    minPerWeek: 1               // At least 1 deliverable
    maxPerWeek: 10              // Max 10 deliverables
    requiredFields: ['description']
  }

  resources: {
    minPerTopic: 0              // Can remove all (but warned)
    maxPerTopic: 20             // Max 20 resources per topic
    urlValidation: true         // Must be valid URL if provided
  }

  notes: {
    maxLength: 5000            // Character limit
    allowMarkdown: true
  }

  timeAllocation: {
    buildPercentage: { min: 40, max: 80 }    // 40-80% on build
    researchPercentage: { min: 10, max: 40 } // 10-40% on research
    sharePercentage: { min: 5, max: 25 }     // 5-25% on share
  }
}
```

### Tier 3: Quality Guardrails (Warnings, Not Blockers)
```typescript
interface QualityGuardrails {
  warnings: {
    noResources: 'Week has no resources - consider adding some'
    fewDeliverables: 'Only 1 deliverable - consider adding 2-3 more'
    vagueTitles: 'Title is too generic - be more specific'
    noSubtasks: 'Topic has no subtasks - consider breaking it down'
    skippedWeeks: 'You have skipped 3+ weeks - is this intentional?'
  }

  suggestions: {
    aiEnhancement: boolean      // Offer AI to improve content
    resourceRecommendations: boolean // Suggest missing resources
    deliverableSuggestions: boolean  // Suggest more deliverables
  }
}
```

---

## 🏗️ Implementation Phases

### Phase 5.1: Foundation (Week 1, Days 1-2)
**Goal**: Basic editing infrastructure without UI

#### Tasks:
1. **Database Schema Updates**
   - Add `edit_history` JSONB column to roadmaps table
   - Add `user_notes` JSONB column (keyed by weekNumber/topicIndex)
   - Add `customizations` JSONB column (track what user changed)
   - Add `skipped_weeks` integer array
   - Add indexes on roadmap_id, user_id

2. **Create Versioning System**
   - `lib/versioning/edit-history.ts` - Track and replay edits
   - `lib/versioning/diff-calculator.ts` - Calculate diffs
   - `lib/versioning/undo-redo.ts` - Undo/redo logic

3. **Create Validation System**
   - `lib/validation/guardrails.ts` - All guardrail rules
   - `lib/validation/validators.ts` - Validation functions
   - `lib/validation/sanitizers.ts` - Clean user input

**Files to Create:**
```
lib/versioning/
  ├── edit-history.ts         (300 lines)
  ├── diff-calculator.ts      (200 lines)
  └── undo-redo.ts            (150 lines)

lib/validation/
  ├── guardrails.ts           (400 lines)
  ├── validators.ts           (300 lines)
  └── sanitizers.ts           (200 lines)

lib/db/
  ├── edits.ts                (250 lines) - Edit CRUD operations
  └── notes.ts                (150 lines) - Notes CRUD operations

supabase/migrations/
  └── 002_editable_roadmap.sql (50 lines)
```

**Success Criteria:**
- ✅ Can save an edit to edit_history
- ✅ Can undo/redo edits
- ✅ Guardrails validation works
- ✅ Database migrations run successfully

---

### Phase 5.2: Progress Tracking (Week 1, Days 3-4)
**Goal**: Track completion state for all deliverables

#### Tasks:
1. **Progress State Management**
   - `lib/progress/tracker.ts` - Track completion state
   - `lib/progress/calculator.ts` - Calculate percentages
   - `lib/progress/aggregator.ts` - Roll up to week/phase/overall

2. **Database Operations**
   - `lib/db/progress.ts` - Progress CRUD
   - `app/api/progress/route.ts` - Progress API
   - `app/api/progress/[itemId]/route.ts` - Individual item toggle

3. **Progress Persistence**
   - Store in `roadmaps.progress_state` JSONB column
   - Structure: `{ deliverables: { 'w1-d1': true, 'w1-d2': false }, topics: {...} }`

**Files to Create:**
```
lib/progress/
  ├── tracker.ts              (200 lines)
  ├── calculator.ts           (150 lines)
  └── aggregator.ts           (100 lines)

lib/db/
  └── progress.ts             (300 lines)

app/api/progress/
  ├── route.ts                (150 lines)
  └── [itemId]/route.ts       (100 lines)
```

**Success Criteria:**
- ✅ Can mark deliverable as complete
- ✅ Progress % calculates correctly
- ✅ Progress persists to database
- ✅ Progress syncs across sessions

---

### Phase 5.3: Core Editing UI (Week 1, Days 5-7)
**Goal**: Build the main editing interface

#### Tasks:
1. **Editable Components**
   ```typescript
   // Inline editing with validation
   <EditableDeliverable
     deliverable={item}
     onSave={handleSave}
     guardrails={deliverableGuardrails}
     onError={showError}
   />

   <EditableResource
     resource={res}
     onSave={handleSave}
     validateUrl={true}
   />

   <EditableWeekTitle
     week={week}
     maxLength={100}
     onSave={handleSave}
   />
   ```

2. **Edit Mode Toggle**
   - View mode (default): Clean, readonly display
   - Edit mode: Inline editors visible
   - Global "Edit Roadmap" button
   - Per-section edit icons

3. **Validation Feedback**
   - Real-time validation as user types
   - Red border + error message for violations
   - Yellow warning for quality issues
   - Green checkmark for valid edits

**Files to Create:**
```
components/viewer/editable/
  ├── EditableDeliverable.tsx    (250 lines)
  ├── EditableResource.tsx       (200 lines)
  ├── EditableWeekTitle.tsx      (150 lines)
  ├── EditableDescription.tsx    (150 lines)
  ├── EditableHours.tsx          (120 lines)
  ├── ValidationFeedback.tsx     (100 lines)
  └── EditModeToggle.tsx         (80 lines)

components/viewer/controls/
  ├── SaveCancelBar.tsx          (100 lines)
  └── UndoRedoButtons.tsx        (80 lines)

hooks/
  ├── useEditMode.ts             (150 lines)
  ├── useValidation.ts           (120 lines)
  └── useUnsavedChanges.ts       (100 lines)
```

**Success Criteria:**
- ✅ Can edit deliverable inline
- ✅ Validation shows immediately
- ✅ Save/Cancel works correctly
- ✅ Guardrails prevent invalid edits

---

### Phase 5.4: Advanced Editing Features (Week 2, Days 1-3)
**Goal**: Add, remove, reorder capabilities

#### Tasks:
1. **Add/Remove Operations**
   ```typescript
   <AddDeliverableButton
     weekNumber={1}
     maxDeliverables={10}
     template={deliverableTemplate}
   />

   <AddResourceButton
     topicId="w1-t1"
     suggestResources={true}  // AI suggestions
   />

   <RemoveButton
     item={item}
     confirmRequired={true}
     undoable={true}
   />
   ```

2. **Drag & Drop Reordering**
   - Reorder deliverables within a week
   - Reorder resources within a topic
   - Visual feedback during drag
   - Auto-save on drop

3. **Bulk Operations**
   - Select multiple items
   - Bulk delete
   - Bulk mark complete
   - Bulk move to different week

**Files to Create:**
```
components/viewer/actions/
  ├── AddDeliverableButton.tsx   (200 lines)
  ├── AddResourceButton.tsx      (180 lines)
  ├── AddSubtaskButton.tsx       (150 lines)
  ├── RemoveButton.tsx           (100 lines)
  └── BulkActionsBar.tsx         (250 lines)

components/viewer/dnd/
  ├── DraggableDeliverable.tsx   (150 lines)
  ├── DraggableResource.tsx      (150 lines)
  └── DropZone.tsx               (100 lines)

lib/
  └── reorder-utils.ts           (150 lines)
```

**Success Criteria:**
- ✅ Can add new deliverable
- ✅ Can remove with confirmation
- ✅ Drag & drop works smoothly
- ✅ Changes save automatically

---

### Phase 5.5: Notes & Annotations (Week 2, Days 4-5)
**Goal**: Let users add context and notes

#### Tasks:
1. **Note Types**
   - Week notes (general notes for the week)
   - Topic notes (insights from research)
   - Deliverable notes (progress notes, blockers)
   - Resource notes (key takeaways)

2. **Note UI**
   ```typescript
   <NoteEditor
     entityType="week"
     entityId="w1"
     placeholder="Add notes about this week..."
     autosave={true}
     markdown={true}
   />
   ```

3. **Note Features**
   - Markdown support
   - Auto-save every 3 seconds
   - Character counter
   - Timestamp on last edit
   - Collapsible by default

**Files to Create:**
```
components/viewer/notes/
  ├── NoteEditor.tsx             (300 lines)
  ├── WeekNotes.tsx              (150 lines)
  ├── TopicNotes.tsx             (150 lines)
  ├── DeliverableNotes.tsx       (150 lines)
  └── MarkdownPreview.tsx        (100 lines)

app/api/notes/
  ├── route.ts                   (150 lines)
  └── [noteId]/route.ts          (100 lines)
```

**Success Criteria:**
- ✅ Can add notes to any entity
- ✅ Markdown renders correctly
- ✅ Auto-save works
- ✅ Notes persist across sessions

---

### Phase 5.6: Skip/Hide Weeks (Week 2, Day 6)
**Goal**: Let users customize their path

#### Tasks:
1. **Skip Week Feature**
   - Mark week as "skipped"
   - Visual indicator (grayed out)
   - Still visible but marked as not relevant
   - Can unskip anytime

2. **Hide Week Feature**
   - Completely hide week from view
   - Show in collapsed "Hidden Weeks" section
   - Can unhide anytime
   - Doesn't affect progress %

3. **Reorder Weeks**
   - Move weeks within a phase (with constraints)
   - Cannot move across phases
   - Auto-renumber on reorder
   - Guardrails prevent invalid orders

**Files to Create:**
```
components/viewer/controls/
  ├── SkipWeekButton.tsx         (150 lines)
  ├── HideWeekButton.tsx         (150 lines)
  ├── ReorderWeeksButton.tsx     (200 lines)
  └── HiddenWeeksPanel.tsx       (180 lines)

lib/
  └── week-reordering.ts         (200 lines)

app/api/weeks/
  ├── skip/route.ts              (100 lines)
  ├── hide/route.ts              (100 lines)
  └── reorder/route.ts           (150 lines)
```

**Success Criteria:**
- ✅ Can skip/unskip weeks
- ✅ Can hide/unhide weeks
- ✅ Progress excludes skipped weeks
- ✅ Reordering respects constraints

---

### Phase 5.7: AI-Assisted Editing (Week 2, Day 7)
**Goal**: AI helps improve user edits

#### Tasks:
1. **AI Suggestions**
   ```typescript
   // When user adds vague deliverable
   User: "Complete the project"
   AI Suggestion: "Deploy to Vercel with public URL and analytics configured"

   // When user adds topic without resources
   User: Adds "Learn React Hooks"
   AI Suggestion: "Add 3 resources? [Accept All] [Pick & Choose]"
     1. React Hooks Documentation (https://...)
     2. useEffect Complete Guide (https://...)
     3. Custom Hooks Tutorial (https://...)

   // When week has quality issues
   AI Alert: "Week 3 has only 1 deliverable (recommend 3-5). Generate more?"
   ```

2. **Smart Enhancements**
   - Suggest better titles
   - Recommend resources
   - Generate subtasks
   - Improve descriptions
   - Fix URL typos

3. **AI Enhancement UI**
   - "Enhance with AI" button per section
   - Side-by-side diff view
   - Accept/reject individual suggestions
   - One-click accept all

**Files to Create:**
```
lib/agents/
  └── enhancement-agent.ts       (400 lines)

components/viewer/ai/
  ├── EnhanceButton.tsx          (150 lines)
  ├── SuggestionCard.tsx         (200 lines)
  ├── DiffView.tsx               (250 lines)
  └── AcceptRejectControls.tsx   (100 lines)

app/api/agents/
  └── enhance/route.ts           (200 lines)
```

**Success Criteria:**
- ✅ AI suggests better content
- ✅ Diff view shows changes
- ✅ Can accept/reject suggestions
- ✅ Enhancements respect guardrails

---

### Phase 5.8: Version Control & History (Week 3, Days 1-2)
**Goal**: Full undo/redo with history viewer

#### Tasks:
1. **Undo/Redo UI**
   ```typescript
   <UndoRedoToolbar>
     <UndoButton disabled={!canUndo} />
     <RedoButton disabled={!canRedo} />
     <HistoryButton onClick={showHistory} />
   </UndoRedoToolbar>
   ```

2. **Edit History Viewer**
   - Timeline of all edits
   - Show what changed (diff)
   - Jump to any point in history
   - Restore from history
   - Export history as JSON

3. **Keyboard Shortcuts**
   - Cmd/Ctrl + Z: Undo
   - Cmd/Ctrl + Shift + Z: Redo
   - Cmd/Ctrl + S: Save
   - Escape: Cancel edit

**Files to Create:**
```
components/viewer/history/
  ├── HistoryPanel.tsx           (300 lines)
  ├── HistoryTimeline.tsx        (200 lines)
  ├── EditDiff.tsx               (250 lines)
  └── RestoreButton.tsx          (100 lines)

hooks/
  ├── useUndoRedo.ts             (200 lines)
  └── useKeyboardShortcuts.ts    (150 lines)
```

**Success Criteria:**
- ✅ Undo/redo works perfectly
- ✅ History shows all changes
- ✅ Can restore from any point
- ✅ Keyboard shortcuts work

---

### Phase 5.9: Polish & Testing (Week 3, Days 3-5)
**Goal**: Production-ready editing experience

#### Tasks:
1. **Performance Optimization**
   - Debounce validation (300ms)
   - Lazy load history panel
   - Virtual scrolling for long lists
   - Memoize complex calculations
   - Optimize re-renders

2. **Error Handling**
   - Graceful failure on save error
   - Retry logic for failed requests
   - Offline mode detection
   - Conflict resolution (if multiple tabs)

3. **User Experience Polish**
   - Loading skeletons
   - Success/error toasts
   - Smooth transitions
   - Empty states
   - Helpful tooltips

4. **Testing**
   - Unit tests for guardrails
   - Integration tests for edit flow
   - E2E tests for critical paths
   - Performance testing
   - Accessibility testing

**Files to Create:**
```
__tests__/
  ├── guardrails.test.ts         (200 lines)
  ├── validation.test.ts         (200 lines)
  ├── undo-redo.test.ts          (150 lines)
  └── edit-flow.test.ts          (300 lines)

components/viewer/ui/
  ├── LoadingSkeleton.tsx        (100 lines)
  ├── EmptyState.tsx             (80 lines)
  ├── Toast.tsx                  (150 lines)
  └── Tooltip.tsx                (100 lines)
```

**Success Criteria:**
- ✅ All tests pass
- ✅ No console errors
- ✅ Performance is smooth (60fps)
- ✅ Works in all major browsers

---

## 📊 Data Schema Updates

### Supabase Migration
```sql
-- Migration: 002_editable_roadmap.sql

-- Add columns to roadmaps table
ALTER TABLE roadmaps
ADD COLUMN edit_history JSONB DEFAULT '[]'::jsonb,
ADD COLUMN user_notes JSONB DEFAULT '{}'::jsonb,
ADD COLUMN customizations JSONB DEFAULT '{}'::jsonb,
ADD COLUMN skipped_weeks INTEGER[] DEFAULT ARRAY[]::INTEGER[],
ADD COLUMN hidden_weeks INTEGER[] DEFAULT ARRAY[]::INTEGER[],
ADD COLUMN progress_state JSONB DEFAULT '{
  "deliverables": {},
  "topics": {},
  "weeks": {},
  "phases": {},
  "overall": 0
}'::jsonb;

-- Create indexes
CREATE INDEX idx_roadmaps_edit_history ON roadmaps USING GIN (edit_history);
CREATE INDEX idx_roadmaps_user_notes ON roadmaps USING GIN (user_notes);
CREATE INDEX idx_roadmaps_progress_state ON roadmaps USING GIN (progress_state);

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_roadmaps_updated_at
    BEFORE UPDATE ON roadmaps
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add constraint: edit_history max 50 items
ALTER TABLE roadmaps
ADD CONSTRAINT edit_history_max_length
CHECK (jsonb_array_length(edit_history) <= 50);
```

---

## 🎨 UI/UX Mockups

### Edit Mode States

**View Mode (Default):**
```
┌─────────────────────────────────────────────┐
│ Week 1: AI Fundamentals    [Edit Week ✏️]  │
├─────────────────────────────────────────────┤
│ ✅ Working product with public URL          │
│ ☐ GitHub repo with README                   │
│ ☐ 1-Page Product Brief                      │
└─────────────────────────────────────────────┘
```

**Edit Mode:**
```
┌─────────────────────────────────────────────┐
│ [Week 1: AI Fundamentals____________] [Save]│
├─────────────────────────────────────────────┤
│ ✅ [Working product with public URL___] [x] │
│ ☐  [GitHub repo with README__________] [x] │
│ ☐  [1-Page Product Brief_____________] [x] │
│ [+ Add Deliverable]                          │
│                                              │
│ [Cancel] [Save Changes]                      │
└─────────────────────────────────────────────┘
```

**With Validation Error:**
```
┌─────────────────────────────────────────────┐
│ [Week 1: ] ❌ Title required                 │
├─────────────────────────────────────────────┤
│ ☐  [Complete project] ⚠️ Too vague - be     │
│    specific! [Enhance with AI]               │
└─────────────────────────────────────────────┘
```

---

## 🔐 API Endpoints

### New Routes
```typescript
// Progress tracking
POST   /api/progress                    // Batch update progress
PUT    /api/progress/[itemId]          // Toggle single item
GET    /api/progress/[roadmapId]       // Get all progress

// Editing
PATCH  /api/roadmaps/[id]/edit         // Apply edit
POST   /api/roadmaps/[id]/undo         // Undo last edit
POST   /api/roadmaps/[id]/redo         // Redo last undone edit
GET    /api/roadmaps/[id]/history      // Get edit history

// Notes
POST   /api/notes                      // Create/update note
GET    /api/notes/[roadmapId]         // Get all notes
DELETE /api/notes/[noteId]             // Delete note

// Week operations
POST   /api/weeks/skip                 // Skip/unskip week
POST   /api/weeks/hide                 // Hide/unhide week
POST   /api/weeks/reorder              // Reorder weeks

// AI enhancements
POST   /api/agents/enhance             // Get AI suggestions
POST   /api/agents/enhance/apply       // Apply suggestions
```

---

## 📈 Success Metrics

### User Engagement
- **Edit Rate**: % of users who edit their roadmap
- **Edits per Roadmap**: Average number of edits made
- **Completion Rate**: % of deliverables marked complete
- **Note Usage**: % of users who add notes

### Quality Metrics
- **Validation Error Rate**: % of saves that fail validation
- **Undo Usage**: % of edits that get undone
- **AI Enhancement Acceptance**: % of AI suggestions accepted
- **Time to Complete**: Average days to 100% completion

### Technical Metrics
- **Save Success Rate**: % of saves that succeed
- **API Response Time**: p95 latency for edit operations
- **Conflict Rate**: % of saves with conflicts
- **Data Loss**: Zero tolerance (must be 0%)

---

## 🚀 Go-to-Market

### User Story
```
As a user who just generated a roadmap:

1. I review the AI-generated plan
2. Week 3 doesn't fit my schedule - I skip it
3. Week 1 deliverable is vague - I edit it to be specific
4. I add a custom resource I found helpful
5. I add notes about my progress
6. I mark deliverables complete as I finish
7. I use AI to enhance Week 5 which feels thin
8. I review my progress dashboard - 45% complete!
```

### Feature Rollout
- **Week 1**: Internal testing with 10 beta users
- **Week 2**: Limited beta (100 users)
- **Week 3**: Public launch with announcement
- **Week 4**: Iterate based on feedback

---

## ⚠️ Edge Cases & Error Handling

### Conflict Resolution
**Scenario**: User has roadmap open in 2 tabs, edits in both

**Solution**:
1. Detect `updated_at` mismatch on save
2. Show conflict dialog with 3 options:
   - Keep my changes (overwrite)
   - Keep server version (discard my changes)
   - Manual merge (show diff)

### Network Failures
**Scenario**: User edits offline, tries to save

**Solution**:
1. Detect offline mode
2. Queue edits in localStorage
3. Show "Offline - changes will save when back online"
4. Auto-retry when connection restored

### Data Corruption
**Scenario**: Edit breaks schema validation

**Solution**:
1. Validate before save (client-side)
2. Validate on server (guardrails)
3. If somehow corrupted data gets saved:
   - Show error: "Roadmap data corrupted"
   - Offer: "Restore from last known good version"
   - Log error for investigation

---

## 🛠️ Development Checklist

### Pre-Development
- [x] Review existing codebase
- [ ] Set up testing environment
- [ ] Create component library for editable elements
- [ ] Design database schema updates
- [ ] Write guardrails specification

### Phase 5.1-5.2 (Foundation + Progress)
- [ ] Create versioning system
- [ ] Create validation system
- [ ] Database migrations
- [ ] Progress tracking logic
- [ ] API endpoints for progress
- [ ] Unit tests for core logic

### Phase 5.3-5.4 (Core Editing + Advanced)
- [ ] EditableDeliverable component
- [ ] EditableResource component
- [ ] Add/Remove buttons
- [ ] Drag & drop functionality
- [ ] Save/Cancel flow
- [ ] Integration tests

### Phase 5.5-5.6 (Notes + Skip/Hide)
- [ ] Note editor component
- [ ] Auto-save logic
- [ ] Skip week functionality
- [ ] Hide week functionality
- [ ] API endpoints for notes/weeks

### Phase 5.7-5.8 (AI + History)
- [ ] Enhancement agent
- [ ] Suggestion UI
- [ ] Undo/redo system
- [ ] History panel
- [ ] Keyboard shortcuts

### Phase 5.9 (Polish)
- [ ] Performance optimization
- [ ] Error handling
- [ ] Loading states
- [ ] E2E tests
- [ ] Accessibility audit
- [ ] Browser testing

---

## 📝 Notes for Implementation

### Order of Implementation
1. Start with **read-only** foundation (versioning, validation)
2. Add **progress tracking** (simplest user interaction)
3. Build **basic editing** (deliverables only)
4. Add **advanced features** (add/remove, notes)
5. Implement **AI assistance** (value-add)
6. Polish with **history & undo** (nice-to-have)

### Performance Considerations
- Debounce validation: 300ms
- Auto-save notes: 3 seconds after last keystroke
- Lazy load history panel: Only when opened
- Optimistic updates: Show change immediately, rollback on error
- Virtual scrolling: For roadmaps with 20+ weeks

### Accessibility Requirements
- Keyboard navigation for all edit operations
- Screen reader support for validation messages
- Focus management (return focus after save)
- ARIA labels for icon buttons
- Color contrast for validation states

---

## 🎯 Definition of Done

Phase 5 is complete when:

1. ✅ User can edit any deliverable, resource, title, description
2. ✅ Guardrails prevent invalid edits
3. ✅ Progress tracking works and persists
4. ✅ Notes can be added anywhere
5. ✅ Weeks can be skipped/hidden
6. ✅ AI can enhance user content
7. ✅ Full undo/redo with history viewer
8. ✅ All validations work
9. ✅ Tests pass (90%+ coverage)
10. ✅ Performance is smooth (<100ms for edits)

---

**Estimated Effort**: 15-20 days (3 weeks)
**Team Size**: 1 full-stack developer
**Risk Level**: Medium (complexity in state management and validation)
**Dependencies**: Phases 1-4 must be complete

---

**Next Steps**:
1. Review this plan
2. Approve or request changes
3. Start with Phase 5.1 (Foundation)
4. Build iteratively, test continuously

**Created by**: Claude Code
**Last Updated**: November 16, 2025
**Status**: Ready for Implementation 🚀
