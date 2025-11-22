# Design Audit: Roadmap Viewer (`/viewer?roadmapId=...`)

**Current URL**: `/viewer?roadmapId=22cf136f-0383-4f92-a5fd-bce1b1d112b0`

## Current State Analysis

### What the View Does
The roadmap viewer is the **main entry point** for users to explore a personalized learning roadmap. It displays:
- Roadmap title and goal
- Duration & time commitment metadata
- Overall progress bar (deliverables completed)
- Grid of 3 Phase Cards (expandable to show more phases)
- Collapsible "Core Skills & Details" section with:
  - Core skills breakdown
  - User profile & learning style
  - Timeline statistics (start/end dates)

### Current UX/Visual Weaknesses

#### Usability Gaps
1. **Cognitive Overload**: Too much information below the fold (collapsible details) - users might not know what additional info exists
2. **Linear Navigation**: Click card → phase detail → week detail. No quick preview or "lean-back" browsing
3. **Progress Clarity**: Overall progress shown, but no visual indication of what drives progress (which sections matter most)
4. **No Visual Hierarchy of Phases**: All 3 phases look identical - no sense of progression or relative importance
5. **Details Buried**: The "Core Skills" section is collapsible and easy to miss

#### Visual Weaknesses
1. **Generic Card Layout**: Standard grid with minimal visual differentiation
2. **Bland Typography**: No emphasis hierarchy - all text feels equally important
3. **No Micro-Interactions**: Static cards, no hover states, no sense of "aliveness"
4. **Color Underutilization**: Uses primary/secondary colors but lacks visual richness
5. **Narrow Viewport Optimization**: Desktop-focused, mobile breaks layout quickly

#### AI Integration Gaps
1. **No AI Presence**: The roadmap is presented as a static artifact, not a "living" guide
2. **No Guardrails Visualization**: No indication of recommended vs. optional content
3. **Missing Confidence Signals**: No indication which recommendations are most important
4. **No Interaction Opportunity**: Can't "ask questions" or get deeper insights from the roadmap itself

---

## 3 Design Concepts

### Concept 1: "The Dashboard Sprint"
**Philosophy**: Transform the roadmap into a dynamic, real-time progress dashboard where users feel "in control" of their learning journey. Emphasize completion velocity, upcoming milestones, and actionable next steps.

**Core Features**:
- **Hero Card with CTA**: Top card shows current/next phase with big "Start Phase" button and progress ring
- **Weekly Timeline**: Horizontal timeline showing next 4 weeks with drag-to-reschedule capability
- **Smart Recommendations**: Sidebar with AI-generated "Your Next Action" based on progress
- **Progress Pulse**: Animated progress rings showing phase completion % with micro-animations on hover

**Vibe**:
- Clean, action-oriented
- Data-driven (lots of numbers, metrics)
- Productivity-focused (like Linear, Notion dashboards)

**Pros**:
- Motivates users with clear "next steps"
- Progress visualization is immediate and satisfying
- Supports future interactions (rescheduling, AI refinement)
- Feels modern and responsive

**Cons**:
- Requires more state management (dragging, reschedules)
- High interactivity may overwhelm some users
- Sidebar AI recommendations add complexity

---

### Concept 2: "The Timeline Stream"
**Philosophy**: Present the roadmap as a beautiful, scrollable **vertical timeline** where phases flow naturally. Each phase "unfolds" with visual depth, revealing weeks like chapters in a story. Emphasize the journey, not just tasks.

**Core Features**:
- **Vertical Phase Timeline**: Phases arranged top-to-bottom with visual connectors and milestones
- **Expandable Phase Blocks**: Click to expand → reveals weeks in a staggered grid (glassmorphism cards)
- **Progress Breadcrumb**: Floating left sidebar showing "You are here" with phase count
- **Contextual Metadata**: Hover reveals phase details (skills, duration, theme) in a popover

**Vibe**:
- Cinematic and immersive
- "Story-driven" (like Framer, Spline interactions)
- Calm and contemplative

**Pros**:
- Natural scrolling experience (fits modern UX patterns)
- Visual depth creates memorable impression
- Scales beautifully (works for 5 phases or 20 phases)
- Less cognitive load than dashboard

**Cons**:
- Requires custom scroll interactions (performance risk)
- Might feel slow/theatrical for power users
- Vertically tall page (lots of scrolling on mobile)

---

### Concept 3: "The Bento Insight Board"
**Philosophy**: Treat the roadmap as a **modular "dashboard of insights"** where phases, skills, progress, and AI recommendations are tiles that users can rearrange, group, and personalize. Emphasize flexibility and user agency.

**Core Features**:
- **Customizable Grid Layout**: Phases as large tiles, alongside skill cards, timeline, and "AI Insight" cards (What you should focus on, Common bottlenecks, etc.)
- **Drag-to-Organize**: Users can reorder tiles (Grid reflow on drop)
- **Compact Mode Toggle**: Switch between "Overview" (3 tiles visible) and "Deep Dive" (12+ tiles)
- **Color-Coded Skill Tags**: Each phase tile shows 2-3 core skills with color badges
- **Quick Actions**: Buttons on each phase to "Mark Complete", "Pause", "Get Help"

**Vibe**:
- Empowering and modular
- Apple/Arc Browser aesthetic (bento grids)
- Data-rich but organized

**Pros**:
- Highly adaptable (each user arranges differently)
- Supports future features (save layouts, share custom views)
- More "toolkit" feel (less linear, more exploratory)
- Encourages users to engage with the full roadmap

**Cons**:
- Highest complexity (drag/drop, localStorage for layouts)
- May feel overwhelming with too many tiles
- Requires clear visual hierarchy to avoid confusion

---

## Recommendation

**Suggested Direction**: A **hybrid of Concept 1 (Dashboard Sprint) + Concept 2 (Timeline Stream)**

**Rationale**:
- Opens with a **hero section** (Concept 1) showing current progress & AI-generated "Next Action"
- Then transitions to a **scrollable phase timeline** (Concept 2) where phases unfold as you scroll
- Best of both: immediate clarity + immersive journey

**Alternative**: If you prefer lighter interactions, go with **pure Concept 2 (Timeline Stream)** – elegant, scalable, fewer moving parts.

---

## Next Steps

**Choose one of:**
1. ✅ Concept 1: Dashboard Sprint (action-oriented)
2. ✅ Concept 2: Timeline Stream (journey-oriented)
3. ✅ Concept 3: Bento Insight Board (modular-oriented)
4. ✅ **Hybrid** (Dashboard Sprint header + Timeline Stream body)

Once you decide, I'll move to **Step 2: Rapid Prototyping** where I'll build a working experiment at:
- `/viewer/experiments/roadmap-redesign-[concept-name]`

Reply with your choice, and I'll create an interactive prototype! 🎨
