# Centered Carousel + Focus Mode Toggle
## Hybrid Approach: Immersion + Agency

---

## 🎯 Overview

A **smart carousel** that adapts to user preference:
- **Default (Overview Mode)**: Hero phase card showing all weeks in a 2x2 grid
- **Focus Mode (Toggle ON)**: Blurs other weeks, shows only current week hero-style
- **Single toggle** to switch modes without navigation change

---

## 📐 Layout Structure

### State 1: Overview Mode (Default)
```
┌──────────────────────────────────────────┐
│ 14-Week AI PM Roadmap                    │
│ Land a FAANG AI PM role                  │
│                                          │
│ [Focus Mode: OFF/ON] ← Toggle button      │
└──────────────────────────────────────────┘

    [Phase 1]      [PHASE 2 - Hero]    [Phase 3]
    (20% opac)     (100% - Full)       (20% opac)

    ┌──────────┐   ┌──────────────────┐   ┌──────────┐
    │Phase 1   │   │ BUILD EXECUTION  │   │Phase 3   │
    │Weeks 1-4 │   │ & CORE PM        │   │Weeks10-14│
    │          │   │ Weeks 5-9        │   │          │
    │4w, 90h   │   │                  │   │5w, 100h  │
    │          │   │ 5 weeks, 110h    │   │          │
    │[Clickable]   │ 7 core skills    │   │[Clickable]
    │          │   │                  │   │          │
    └──────────┘   │ ┌──────┬────────┐│   └──────────┘
                   │ │W5    │W6      ││
                   │ │18h   │15h     ││
                   │ ├──────┼────────┤│
                   │ │W7    │W8      ││
                   │ │16h   │14h     ││
                   │ ├──────┬────────┤│
                   │ │W9    │        ││
                   │ │14h   │        ││
                   │ └──────┴────────┘│
                   │                  │
                   │ [View Phase →]   │
                   └──────────────────┘

              [← PREV | NEXT →]
              [Phase 2 of 3]  ●●○
```

### State 2: Focus Mode (Toggle ON)
```
┌──────────────────────────────────────────┐
│ 14-Week AI PM Roadmap                    │
│ Land a FAANG AI PM role                  │
│                                          │
│ [Focus Mode: OFF/ON] ← Toggle button (ON) │
└──────────────────────────────────────────┘

    [Phase 1]      [WEEK 5 - Hero]    [Phase 3]
    (BLURRED)      (100% - Full)      (BLURRED)

    ┌────────────┐   ┌──────────────────┐   ┌────────────┐
    │Phase 1     │   │ AI-Powered       │   │Phase 3     │
    │[BLURRED]   │   │ Product Build    │   │[BLURRED]   │
    │            │   │ & AI UX          │   │            │
    │            │   │                  │   │            │
    │            │   │ Week 5 of 5      │   │            │
    │            │   │ (Phase 2)        │   │            │
    │            │   │ 22 hours total   │   │            │
    │            │   │                  │   │            │
    │            │   │ Build: 18h       │   │            │
    │            │   │ Research: 2h     │   │            │
    │            │   │ Share: 2h        │   │            │
    │            │   │                  │   │            │
    │            │   │ Project:         │   │            │
    │            │   │ Full-Stack AI    │   │            │
    │            │   │ Product (v1.0)   │   │            │
    │            │   │                  │   │            │
    │            │   │ [View Week →]    │   │            │
    │            │   │                  │   │            │
    └────────────┘   └──────────────────┘   └────────────┘

              [← PREV | NEXT →]
              [Week 5 of 14]  ●●●●●●●●●●●●●●
              [Phase 2 of 3]  ●●○
```

---

## 🔄 Interaction Patterns

### Navigation
- **← PREV / NEXT →** buttons move between phases (in overview mode)
- **← PREV / NEXT →** buttons move between weeks (in focus mode)
- **Swipe left/right** (mobile, both modes)
- **Keyboard arrows** (both modes)
- **Click phase card** (overview mode only): navigates to that phase

### Mode Toggle
- **Toggle button** at top-right of page
- **Visual feedback**: "Focus Mode: OFF" → "Focus Mode: ON"
- **Smooth animation**: When toggling, blur/unblur surrounding content
- **Persisted** (localStorage): Remember user's preference

### Focus Mode Specifics
- **Surrounding weeks/phases**: Blur filter (blur: 4px, opacity: 0.3)
- **Current week**: Full opacity, no blur
- **Navigation**: Still use arrows/swipe but moves week-by-week
- **Progress indicator**: Shows "Week X of 14" instead of "Phase X of 3"
- **Exit to phase**: Click blurred phase to return to that phase view

---

## 🎨 Visual Design

### Hero Card (Overview Mode)
```
┌──────────────────────────────────────┐
│ BUILD EXECUTION & CORE PM            │ ← H2
│ Weeks 5-9                            │ ← Supporting text
│                                      │
│ [Icon] 5 weeks | 110 hours | 7 skills │ ← Metadata chips
│                                      │
│ Grid of weeks:                       │
│ ┌──────┬────────┐                   │
│ │W5    │W6      │                   │
│ │18h   │15h     │                   │
│ ├──────┼────────┤                   │
│ │W7    │W8      │                   │
│ │16h   │14h     │                   │
│ ├──────┬────────┤                   │
│ │W9    │        │                   │
│ │14h   │        │                   │
│ └──────┴────────┘                   │
│                                      │
│ [View Phase →]                       │ ← CTA button
└──────────────────────────────────────┘
```

### Week Card (Focus Mode)
```
┌──────────────────────────────────────┐
│ AI-Powered Product Build & AI UX     │ ← H2
│ Signature Project & Core PM          │ ← Phase context
│                                      │
│ Week 5 of 5 (Phase 2)                │ ← Position indicator
│                                      │
│ [Icon] 22 hours | 3 sections         │ ← Metadata
│                                      │
│ Build Section:                       │
│ Full-Stack AI Product (v1.0)        │
│ 18 hours | 4 deliverables           │
│                                      │
│ Research Section:                    │
│ Study Google's People + AI           │
│ 2 hours | 2 resources                │
│                                      │
│ Share Section:                       │
│ Twitter/LinkedIn Thread              │
│ 2 hours | Demo video                 │
│                                      │
│ [View Week Details →]                │ ← CTA button
└──────────────────────────────────────┘
```

### Color & Typography
- **Primary brand**: Coral (#D4654F) for accents
- **Typography**: DM Sans for headings, Inter for body
- **Blur effect**: CSS `backdrop-filter: blur(4px)`
- **Opacity**: 0.3 for blurred content
- **Smooth transitions**: 300ms ease-in-out

---

## ✨ Key UX Features

### 1. **Smart Defaults**
- Opens in **Overview Mode** by default
- Shows the **first phase** (Phase 1) or current phase if saved
- Users can toggle to Focus Mode if they prefer

### 2. **Mode Persistence**
- Remember user's preference in localStorage
- Same toggle state across sessions
- Clear indication of current mode

### 3. **Smooth Transitions**
- Blur/unblur animation (300ms)
- Slide/fade week changes (200ms)
- No jarring layout shifts

### 4. **Progress Context**
- **Overview Mode**: "Phase X of 3" indicator
- **Focus Mode**: "Week X of 14" indicator
- **Breadcrumb**: Shows phase + week position

### 5. **Navigation Flexibility**
- **Overview**: Arrow buttons move to next phase
- **Focus**: Arrow buttons move to next week
- **Jump navigation**: Optional dropdown "Go to Week X"
- **Touch**: Swipe works in both modes

---

## 📱 Responsive Behavior

### Desktop (1024px+)
- Hero card takes 60-70% of viewport width
- Side peeks visible at 20-25% opacity
- Full week grid visible (2x2 or 3x2)
- Toggle button in top-right

### Tablet (768px - 1023px)
- Hero card takes 80% of viewport width
- Side peeks still visible but smaller
- Week grid may compress to 2x2
- Toggle button moves to top-center

### Mobile (< 768px)
- Hero card takes full width (with padding)
- Side peeks hidden (show on swipe)
- Week grid becomes single column
- Toggle button inline below header
- Focus mode more valuable (less visual clutter)

---

## 🔧 Implementation Details

### State Management
```typescript
// State to track
interface CarouselState {
  currentPhaseIndex: number;      // 0, 1, 2
  currentWeekIndex: number;       // 0-13
  focusModeEnabled: boolean;      // localStorage
  navigationMode: 'phase' | 'week'; // auto-switches with toggle
}
```

### Components Needed
```
RoadmapCarousel.tsx (Main container)
├── CarouselHeader.tsx (Title + focus toggle)
├── CarouselContent.tsx (Hero card + side peeks)
│   ├── PhaseCard.tsx (Overview mode - shows weeks grid)
│   └── WeekCard.tsx (Focus mode - shows week details)
├── CarouselNavigation.tsx (← PREV | NEXT →)
└── CarouselProgress.tsx (Phase/Week indicators)
```

### Toggle Button Behavior
```typescript
const toggleFocusMode = () => {
  setFocusMode(!focusMode);
  localStorage.setItem('focusMode', JSON.stringify(!focusMode));

  // Auto-switch navigation mode
  if (!focusMode) {
    // Entering focus mode - reset to week view
    setNavigationMode('week');
    setCurrentWeekIndex(0);
  } else {
    // Exiting focus mode - reset to phase view
    setNavigationMode('phase');
    setCurrentPhaseIndex(0);
  }
};
```

---

## 🎬 Animation Details

### Toggle Animation
```css
.carousel-content {
  transition: filter 300ms ease-in-out;
}

.carousel-content.focus-mode {
  backdrop-filter: blur(4px);
  opacity: 0.3;
}

.carousel-hero {
  transition: transform 200ms ease-in-out;
}
```

### Swipe Navigation
- Detect swipe left/right
- Calculate direction and velocity
- Slide hero card + animate side peeks
- Smooth 300ms transition

### Blur Effect
- Apply to side peek cards
- Apply to surrounding weeks in hero (when focus mode on)
- Transition smoothly between states

---

## 📊 User Flows

### Flow 1: Overview Explorer
1. Land on page → Overview mode, Phase 1
2. See all weeks in Phase 1
3. Click arrows → Phase 2 → Phase 3
4. See full roadmap structure
5. Click week → Navigate to week detail page

### Flow 2: Focused Learner
1. Land on page → Overview mode
2. Toggle "Focus Mode ON"
3. Now seeing Week 1 only (Phase 1, Week 1 of 14)
4. Click arrows → Week 2 → Week 3 (linear progression)
5. No distractions from other weeks
6. Click week → Navigate to week detail page

### Flow 3: Quick Scan
1. Land on page → Overview mode, Phase 1
2. Glance at weeks grid (2x2)
3. Already understand phase scope
4. Click "View Phase →" → Go to phase detail
5. OR toggle Focus Mode → Deep dive one week at a time

---

## ✅ Benefits of This Approach

### Respects Different Learning Styles
- **Visual learners**: Overview mode shows structure
- **Sequential learners**: Focus mode one-week-at-a-time
- **Scanners**: Quick phase overview before diving in

### Cognitive Load Management
- **Default**: Not overwhelming (phase-level view)
- **Optional**: Can reduce further (week-level view)
- **User control**: They choose their mode

### Immersive but Minimal
- Beautiful carousel interaction
- One thing in focus at a time
- Surrounding content provides context
- Blur effect reduces cognitive load visually

### Touch-Native
- Swipe works in both modes
- Focus mode especially good on mobile (less clutter)
- No tiny targets (weeks always readable)

---

## 🎯 Implementation Priority

1. **Phase 1**: Centered Carousel (Overview Mode)
   - Phase navigation with arrows/swipe
   - Hero phase card with weeks grid
   - Side peeks (20% opacity)
   - Progress indicator

2. **Phase 2**: Focus Mode Toggle
   - Add toggle button at top
   - Switch to week-level navigation
   - Blur surrounding content
   - Persist preference

3. **Phase 3**: Polish & Refinement
   - Smooth animations
   - Mobile optimization
   - Keyboard navigation
   - Accessibility (ARIA labels)

---

## 🚀 Next Steps

**Ready to build this?** I can:
1. Prototype the **Overview Mode** first (carousel + phase cards)
2. Add **Focus Mode toggle** (blur effect + week navigation)
3. Test responsive behavior (mobile/tablet/desktop)
4. Refine animations and interactions

Which would you like me to start with?
