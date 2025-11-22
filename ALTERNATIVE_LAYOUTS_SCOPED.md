# Alternative Layout Concepts - Roadmap Overview Page
## Scope: `/viewer?roadmapId=...` ONLY
### Goal: Help users understand the full roadmap structure and navigate to weeks
### NOT: Task management, detailed interaction, or progress tracking

---

## 1. 🎯 **The Focused Funnel**
**One week at a time. Sequential carousel through all weeks.**

### Layout:
```
┌─────────────────────────────────────┐
│  14-Week AI PM Roadmap              │
│  Land a FAANG AI PM role            │
└─────────────────────────────────────┘

┌──────────────────────────────────────────┐
│  [← WEEK 1 (Phase 1)           →]       │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │ AI Fundamentals & First Product   │ │
│  │ Build to Learn                     │ │
│  │                                    │ │
│  │ Build: 14h | Research: 4h | Share: 2h │
│  │                                    │ │
│  │ [View Week Details →]              │ │
│  └────────────────────────────────────┘ │
│                                          │
│  [Week 1 of 14]  ●●●●●●●●●●●●●●       │
└──────────────────────────────────────────┘

[Blurred weeks above/below]
```

### Interaction:
- Scroll or arrow buttons move to next week
- All 14 weeks scroll sequentially
- One week visible at full size
- Clear "Week X of 14" indicator

### Cognitive Load:
✅ **Extreme focus** - literally can't see multiple weeks
✅ Forces sequential thinking
✅ No choice paralysis
✅ Clear progression indicator

### Best For:
- Learning sequential material
- Step-by-step walkthroughs
- Mobile experience

### Tradeoff:
❌ Can't see all phases at once
❌ Requires full scroll-through to understand scope

---

## 2. 📚 **The Layered Disclosure (Accordion)**
**Phases expanded individually. Weeks shown as compact list.**

### Layout:
```
┌──────────────────────────────────────────┐
│  14-Week AI PM Roadmap                   │
│  Land a FAANG AI PM role                 │
│  [Duration] [Time/week] [3 Phases]       │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│ ▼ Phase 1: BUILD FOUNDATION (Weeks 1-4)  │
│   Progress: 0/45 deliverables            │
│                                          │
│   1. AI Fundamentals & Build (W1)       │
│      14h build | View Details →         │
│   2. System Design & MLOps (W2)         │
│      10h build | View Details →         │
│   3. Advanced AI Capabilities (W3)      │
│      14h build | View Details →         │
│   4. Product Strategy (W4)              │
│      10h build | View Details →         │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│ ▶ Phase 2: EXECUTION (Weeks 5-9)         │
│   [5 weeks, 110 hours]                   │
│   Progress: 0/62 deliverables            │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│ ▶ Phase 3: INTERVIEW PREP (Weeks 10-14)  │
│   [5 weeks, 100 hours]                   │
│   Progress: 0/58 deliverables            │
└──────────────────────────────────────────┘
```

### Interaction:
- Click phase to expand/collapse
- Only one phase expanded at a time (auto-closes previous)
- Week rows clickable → goes to week detail page
- Quick phase summary when collapsed

### Cognitive Load:
✅ **One phase at a time** = focus
✅ Quick phase scanning
✅ Clear hierarchy
✅ Familiar web pattern (accordion)

### Best For:
- Desktop browsing
- Quick scanning
- Accessibility
- Standard web pattern

### Tradeoff:
❌ Can't see all phases simultaneously
❌ Less visually exciting

---

## 3. 🎬 **The Centered Carousel**
**One hero phase + side peeks. Swipe/arrows to navigate.**

### Layout:
```
┌──────────────────────────────────────────┐
│  14-Week AI PM Roadmap                   │
│  Land a FAANG AI PM role                 │
└──────────────────────────────────────────┘

    [Phase 0]     [PHASE 1 (Hero)]    [Phase 2]
    (20% opac)    (100% - Full)       (20% opac)

    ┌─────────┐  ┌──────────────────┐  ┌─────────┐
    │Phase 2  │  │ BUILD FOUNDATION │  │Phase 3  │
    │Weeks10- │  │ Weeks 1-4        │  │Weeks11- │
    │14       │  │                  │  │14       │
    │[Click]  │  │ 4 weeks, 90h     │  │[Click]  │
    │         │  │ 7 core skills    │  │         │
    │         │  │                  │  │         │
    │         │  │ ┌────────────────┤  │         │
    │         │  │ │Week 1: AI Fund  │  │         │
    │         │  │ │Week 2: System   │  │         │
    │         │  │ │Week 3: RAG      │  │         │
    │         │  │ │Week 4: Strategy │  │         │
    │         │  │ │                │  │         │
    │         │  │ │[View Phase →] │  │         │
    │         │  │ └────────────────┤  │         │
    │         │  │                  │  │         │
    └─────────┘  └──────────────────┘  └─────────┘

              [← PREV | NEXT →]

              [Phase 1 of 3]  ●○○
```

### Interaction:
- Click hero to expand all weeks (goes to phase detail? or inline?)
- Swipe left/right (mobile) or arrow buttons
- Side peeks hint at neighbors
- Progress dots for phase count

### Cognitive Load:
✅ **One phase in focus** = no overwhelm
✅ Peek-at-next = reduces decision friction
✅ Touch-native (swipe)
✅ Beautiful, immersive feel

### Best For:
- Mobile/tablet
- Exploratory browsing
- Modern aesthetic
- Touch interaction

### Tradeoff:
❌ Can't see all phases at once
❌ Requires swiping (less discoverable)

---

## 4. 📊 **The Grid Overview (Optimized)**
**3x phases visible simultaneously. Weeks in 2x2 grid per phase.**

### Layout:
```
┌──────────────────────────────────────────────┐
│  14-Week AI PM Roadmap                       │
│  Land a FAANG AI PM role                     │
│  [Metadata: 14 weeks, 25h/week, 3 phases]    │
└──────────────────────────────────────────────┘

┌────────────────────┐ ┌────────────────────┐
│ Phase 1            │ │ Phase 2            │
│ FOUNDATION         │ │ EXECUTION          │
│ Weeks 1-4          │ │ Weeks 5-9          │
│ 4 weeks, 80h       │ │ 5 weeks, 110h      │
│                    │ │                    │
│ ┌──────┬──────┐    │ │ ┌──────┬──────┐    │
│ │W1    │W2    │    │ │ │W5    │W6    │    │
│ │14h   │10h   │    │ │ │18h   │15h   │    │
│ ├──────┼──────┤    │ │ ├──────┼──────┤    │
│ │W3    │W4    │    │ │ │W7    │W8    │    │
│ │14h   │10h   │    │ │ │16h   │14h   │    │
│ └──────┴──────┘    │ │ └──────┴──────┘    │
│ [View Phase →]     │ │ [View Phase →]     │
└────────────────────┘ └────────────────────┘

┌────────────────────┐
│ Phase 3            │
│ INTERVIEW PREP     │
│ Weeks 10-14        │
│ 5 weeks, 100h      │
│                    │
│ ┌──────┬──────┐    │
│ │W10   │W11   │    │
│ │20h   │20h   │    │
│ ├──────┼──────┤    │
│ │W12   │W13   │    │
│ │20h   │20h   │    │
│ ├──────┬──────┤    │
│ │W14   │      │    │
│ │20h   │      │    │
│ └──────┴──────┘    │
│ [View Phase →]     │
└────────────────────┘
```

### Interaction:
- All phases visible at once (no expand/collapse)
- Click phase card → goes to `/viewer/phase/[id]` page
- Click week cell → goes to `/viewer/week/[number]` page
- Hover shows week details in tooltip

### Cognitive Load:
✅ **Big picture visible** - see all 3 phases
✅ Minimal visual complexity
✅ Clear grid structure
✅ Quick scanning

### Best For:
- Overview at a glance
- Desktop browsing
- Visual planners
- Traditional grid UX

### Tradeoff:
❌ Less immersive
❌ Small week cells (not much info)

---

## 5. 📖 **The Reading-Focused List**
**Clean, typographic. Phases as sections. Weeks as ordered list items.**

### Layout:
```
╔════════════════════════════════════════════╗
║  14-Week AI PM Roadmap                     ║
║  Land a FAANG AI PM role                   ║
║  Start: Nov 18, 2024 | End: Feb 23, 2025   ║
║  14 weeks | 25h/week | 3 phases            ║
╚════════════════════════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Phase 1: BUILD AI PRODUCT & PM FOUNDATION

Master AI/ML fundamentals, system design, and core PM documentation
through hands-on projects.

**Weeks 1-4** | 4 weeks | 80 hours | 7 core skills

1. AI Fundamentals & First Product Build
   Build: 14h | Research: 4h | Share: 2h
   [View Week →]

2. System Design & MLOps
   Build: 10h | Research: 6h | Share: 4h
   [View Week →]

3. Advanced AI Capabilities & Classical ML
   Build: 14h | Research: 6h | Share: 2h
   [View Week →]

4. Product Strategy & PM Artifacts
   Build: 10h | Research: 8h | Share: 4h
   [View Week →]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Phase 2: SIGNATURE PROJECT & CORE PM EXECUTION

Build a flagship product while executing on the core PM competencies...

[Similar structure for Phase 2 weeks]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Phase 3: INTERVIEW PREP & CAREER LAUNCH

[Similar structure for Phase 3 weeks]
```

### Interaction:
- Scroll to read
- Click "View Week →" to navigate
- Minimal click targets (focus is reading)
- Bookmarkable sections (anchor links)

### Cognitive Load:
✅ **Familiar reading pattern**
✅ Deep scroll feels natural
✅ Typography-forward (no visual noise)
✅ Content-first approach

### Best For:
- Content-focused users
- Accessibility
- Desktop reading
- Print-friendly

### Tradeoff:
❌ Less visually exciting
❌ Long vertical scroll

---

## 6. 🗺️ **The Visual Flow Map**
**SVG path shows phases flowing left-to-right. Weeks as dots on path.**

### Layout:
```
┌────────────────────────────────────────────┐
│  14-Week AI PM Roadmap                     │
│  Land a FAANG AI PM role                   │
└────────────────────────────────────────────┘

    Phase 1           Phase 2           Phase 3
    START        →    MIDPOINT     →    FINISH

    ●───●───●───●───○───○───○───○───○───●───●───●───●───●
    W1  W2  W3  W4   W5  W6  W7  W8  W9  W10 W11 W12 W13 W14

    [Completed] [In Progress] [Planned]

┌──────────────────────────────────────────────┐
│ Week Details Panel (Click week to expand)    │
│                                              │
│ W1: AI Fundamentals & Build                 │
│ Build 14h | Research 4h | Share 2h          │
│ [View Full Week →]                          │
└──────────────────────────────────────────────┘
```

### Interaction:
- Hover week dot → tooltip
- Click week dot → expands panel below
- Phase markers show progress visually
- Responsive: becomes vertical on mobile

### Cognitive Load:
✅ **Visual metaphor** = easy to understand
✅ All weeks visible (no surprise)
✅ Linear flow = natural progression
✅ Minimal text

### Best For:
- Visual learners
- Progress visualization
- Responsive design
- Minimalist aesthetic

### Tradeoff:
❌ Takes up space (horizontal)
❌ Dots might be hard to click on mobile

---

## 7. 🎯 **The Cards + Side Detail Panel**
**Phase cards in grid. Click card → sidebar panel shows weeks inline.**

### Layout:
```
┌────────────────────────┬──────────────────────┐
│ 14-Week AI PM Roadmap  │ (Detail Panel)       │
│ Land a FAANG AI PM role│                      │
└────────────────────────┴──────────────────────┘

┌─────────────────────────────────────────────────┐
│                                                 │
│ ┌──────────────┐  ┌──────────────┐ ┌─────────┐ │
│ │ Phase 1      │  │ Phase 2      │ │ Phase 3 │ │
│ │ FOUNDATION   │  │ EXECUTION    │ │ PREP    │ │
│ │ Weeks 1-4    │  │ Weeks 5-9    │ │ Weeks10 │ │
│ │ 80h, 4w      │  │ 110h, 5w     │ │ 100h,5w │ │
│ │ ★★★★★ skill │  │ ★★★★★ skill  │ │ ★★★★★  │ │
│ │              │  │              │ │ skill   │ │
│ │ [Click →]    │  │ [Click →]    │ │[Click→] │ │
│ └──────────────┘  │ ──────────────┘ │─────────│ │
│                                      │         │ │
│                                      │ SELECTED│ │
│                                      │ PHASE 1 │ │
│                                      │         │ │
│                                      │ W1: AI  │ │
│                                      │ Fundamentals
│                                      │ 14h → [VIEW]
│                                      │         │ │
│                                      │ W2: System
│                                      │ Design  │ │
│                                      │ 10h → [VIEW]
│                                      │         │ │
│                                      │ W3: Advanced
│                                      │ AI      │ │
│                                      │ 14h → [VIEW]
│                                      │         │ │
│                                      │ W4: Strategy
│                                      │ 10h → [VIEW]
│                                      │         │ │
│                                      └─────────┘ │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Interaction:
- Click phase card → loads weeks in side panel
- Click week in panel → goes to week detail page
- Responsive: panel slides down on mobile

### Cognitive Load:
✅ **Two-pane interface** = organized
✅ One phase selected at a time
✅ Weeks shown only when needed
✅ Clear primary/secondary content

### Best For:
- Desktop browsing
- Progressive disclosure
- Organized information hierarchy
- Responsive design

### Tradeoff:
❌ Requires two clicks to reach week
❌ Less immersive

---

## 📊 **Quick Ranking (by Cognitive Load Reduction)**

| Layout | Load | Usability | Mobile | Best For |
|--------|------|-----------|--------|----------|
| **Focused Funnel** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Sequential learning |
| **Optimized Accordion** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Scanning, accessibility |
| **Centered Carousel** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Mobile-first, immersive |
| **Grid Overview** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | Big picture view |
| **Reading List** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Content-focused |
| **Visual Flow Map** | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | Visual learners |
| **Cards + Side Panel** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | Two-pane browsing |

---

## 🏆 **Top 3 Recommendations**

### 🥇 **Optimized Accordion (Best for This Product)**
- One phase open at a time = zero overwhelm
- Weeks listed compactly inside
- Familiar web pattern (no learning curve)
- Mobile-friendly from day one
- Click week to navigate (single action)

### 🥈 **Centered Carousel (Most Beautiful)**
- One hero phase + side peeks
- Immersive but not overwhelming
- Touch-native (swipe)
- Works equally well on mobile/desktop
- More engaging than accordion

### 🥉 **Grid Overview (Best for Overview)**
- All 3 phases visible simultaneously
- Minimal interaction needed
- Works great on desktop
- Mobile version becomes accordion
- "Big picture" feel

---

## ✅ **Scope Notes**
- **NO** phase detail pages redesigned
- **NO** week detail pages affected
- **NO** task-level interaction
- **ONLY** the roadmap overview landing page
- Navigation link to child pages included
- Self-contained, focused experience

Which resonates with you?
