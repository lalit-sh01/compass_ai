# Centered Carousel + Focus Mode - Prototype Guide

## 🚀 Live Prototype URL

```
http://localhost:3000/viewer/experiments/roadmap-carousel
```

---

## 📐 Architecture Overview

### Main Page Component
- **File**: `app/viewer/experiments/roadmap-carousel/page.tsx`
- **Responsibility**: State management, navigation logic, keyboard handlers
- **State**:
  - `currentPhaseIndex`: 0-2 (which phase)
  - `currentWeekIndex`: 0-N (which week in phase)
  - `focusModeEnabled`: boolean (toggle state)
  - `mounted`: boolean (hydration check)

### Child Components

1. **CarouselHeader** (`components/viewer/carousel/CarouselHeader.tsx`)
   - Title + Goal
   - Focus Mode toggle button with Eye/EyeOff icon
   - Sticky header with border

2. **CarouselContent** (`components/viewer/carousel/CarouselContent.tsx`)
   - **OverviewModeCard**: Phase view with 2x2 week grid
   - **FocusModeCard**: Week view with detailed sections
   - Animated transitions between modes

3. **CarouselNavigation** (`components/viewer/carousel/CarouselNavigation.tsx`)
   - Previous button (disabled when at start)
   - Next button (disabled when at end)
   - Disabled/enabled states based on position

4. **CarouselProgress** (`components/viewer/carousel/CarouselProgress.tsx`)
   - Phase indicator dots (●●○)
   - Week indicator dots (when in focus mode)
   - Week-in-phase dots (when in overview mode)
   - Animated scaling on current position

---

## 🎮 Interaction Flows

### Flow 1: Overview Mode (Default)
```
1. User lands on page
2. Sees Phase 1 with all 4 weeks in 2x2 grid
3. Clicks ← NEXT → to navigate phases
4. Can see neighbor phases blurred on sides
5. Clicks week card → goes to /viewer/week/[number]
6. Progress shows "Phase 1 of 3" ●●○
```

### Flow 2: Focus Mode (User Toggles ON)
```
1. User clicks "Focus: OFF" button (now shows "Focus: ON")
2. View switches to Week 1 (first week of current phase)
3. Other weeks/phases blur out (opacity: 0.2, blur: 4px)
4. Clicks ← NEXT → to navigate weeks sequentially
5. Progress shows "Week 1 of 14" ●●●●●●●●●●●●●●
6. Also shows "Phase 1 of 3" ●●○
7. When reaching last week of phase, next → goes to first week of next phase
8. Clicks week → goes to /viewer/week/[number]
```

### Flow 3: Keyboard Navigation
```
Left Arrow: Go to previous phase (overview) or previous week (focus)
Right Arrow: Go to next phase (overview) or next week (focus)
Works regardless of mode
```

### Flow 4: Focus Mode Persistence
```
1. User enables Focus Mode
2. Preference saved to localStorage as 'focusMode'
3. Reload page → Focus Mode is still ON
4. User disables it
5. Preference updated in localStorage
6. Reload page → Focus Mode is OFF
```

---

## 🎨 Visual Design Details

### Colors (Brand-Consistent)
- **Primary Accent**: #D4654F (coral)
- **Primary Hover**: #E08A78
- **Primary Light**: #F5D5C8
- **Text Primary**: #3F3D42
- **Text Secondary**: #8B8A8F
- **Text Tertiary**: #B5B4B8
- **Surface**: #FFFFFF
- **Background**: #FEFEFE
- **Border**: #E5E7EB

### Typography
- **Headings**: DM Sans, bold (700)
- **Body**: Inter, regular (400)
- **Button Text**: Font-primary (DM Sans)

### Spacing & Sizing
- **Hero Card Width**: 66% on desktop (lg:w-2/3), responsive smaller screens
- **Padding**: 8px - 12px (p-8 sm:p-12)
- **Border Radius**: 12px (rounded-xl)
- **Shadows**: Default + hover shadow

### Animations
- **Page Load**: Staggered (0.5s, 0.55s, 0.6s delays)
- **Transition Duration**: 400ms ease (mode: "wait")
- **Blur Effect**: Applied when focus mode ON (backdrop-filter: blur)
- **Button Hover**: Scale 1.05
- **Button Tap**: Scale 0.95
- **Progress Dots**: Animated scale on current position

---

## 🔄 State Management Details

### Navigation Logic (Mode-Dependent)

**Overview Mode Navigation:**
```typescript
if (prev) {
  if (currentPhaseIndex > 0) setCurrentPhaseIndex(currentPhaseIndex - 1)
  setCurrentWeekIndex(0) // Reset to first week of new phase
}

if (next) {
  if (currentPhaseIndex < totalPhases - 1) setCurrentPhaseIndex(currentPhaseIndex + 1)
  setCurrentWeekIndex(0) // Reset to first week of new phase
}
```

**Focus Mode Navigation:**
```typescript
if (prev) {
  if (currentWeekIndex > 0) {
    setCurrentWeekIndex(currentWeekIndex - 1)
  } else if (currentPhaseIndex > 0) {
    setCurrentPhaseIndex(currentPhaseIndex - 1)
    setCurrentWeekIndex(previousPhase.weeks.length - 1) // Jump to last week
  }
}

if (next) {
  if (currentWeekIndex < currentPhase.weeks.length - 1) {
    setCurrentWeekIndex(currentWeekIndex + 1)
  } else if (currentPhaseIndex < totalPhases - 1) {
    setCurrentPhaseIndex(currentPhaseIndex + 1)
    setCurrentWeekIndex(0) // Jump to first week of next phase
  }
}
```

### Global Week Index Calculation
```typescript
const globalWeekIndex =
  roadmap.phases
    .slice(0, currentPhaseIndex)
    .reduce((sum, phase) => sum + phase.weeks.length, 0)
  + currentWeekIndex;
// Used for "Week X of 14" indicator
```

---

## 📱 Responsive Design

### Desktop (1024px+)
- Hero card: 66% width (lg:w-2/3)
- Side peeks visible: 20% opacity, scaled 0.8
- Full spacing: p-12
- All UI visible

### Tablet (768px - 1023px)
- Hero card: ~80% width
- Side peeks slightly smaller
- Padding: p-8
- Navigation visible

### Mobile (< 768px)
- Hero card: Full width with padding
- Side peeks hidden on screen (visible on swipe)
- Padding: p-4 sm:p-8
- Compact buttons
- Focus Mode more valuable (reduces clutter)

---

## 🧪 Testing Checklist

### Basic Functionality
- [ ] Page loads without errors
- [ ] Focus toggle button works
- [ ] Overview mode shows Phase 1 initially
- [ ] ← PREV button disabled on Phase 1
- [ ] NEXT → button disabled on Phase 3
- [ ] Clicking NEXT moves to Phase 2
- [ ] Clicking PREV moves back to Phase 1

### Focus Mode
- [ ] Clicking "Focus: OFF" changes to "Focus: ON"
- [ ] Surrounding weeks blur out
- [ ] Week indicator shows (Week X of 14)
- [ ] Navigation now moves week-by-week
- [ ] Can navigate through all 14 weeks
- [ ] Jump between phases works correctly
- [ ] Clicking week button disabled at last week
- [ ] Preference persists on page reload

### Keyboard Navigation
- [ ] Left arrow in overview mode: previous phase
- [ ] Right arrow in overview mode: next phase
- [ ] Left arrow in focus mode: previous week
- [ ] Right arrow in focus mode: next week

### Links & Navigation
- [ ] Week card clicks go to `/viewer/week/[number]`
- [ ] "View Full Phase" button works
- [ ] "View Full Week Details" button works
- [ ] All links have correct href attributes

### Visual/UX
- [ ] Phase/week cards have smooth animations
- [ ] Side peeks are visible and blurred
- [ ] Progress dots animate correctly
- [ ] Toggle button has hover states
- [ ] Text is readable (contrast)
- [ ] No layout shifts during navigation

### Mobile Testing
- [ ] Responsive on 375px (iPhone SE)
- [ ] Responsive on 768px (iPad)
- [ ] Touch targets are easily clickable
- [ ] No horizontal scrolling
- [ ] Side peeks still work (might be subtle)

### Accessibility
- [ ] Focus toggle has proper button role
- [ ] Navigation buttons have disabled states
- [ ] Text has sufficient contrast
- [ ] Keyboard navigation works
- [ ] Page title is descriptive

---

## 🎬 Key Features Implemented

✅ **Centered Carousel Layout**
- Hero phase card in center (66% width)
- Side peeks showing neighbors (20% opacity, blurred)
- Smooth transitions between phases

✅ **Focus Mode Toggle**
- "Focus: OFF/ON" button at top-right
- Switches between phase-level and week-level views
- Blur effect on surrounding content
- Preference persisted to localStorage

✅ **Smart Navigation**
- Phase navigation in overview mode
- Week navigation in focus mode
- Auto-switch when toggling
- Boundary checks (disabled buttons at edges)

✅ **Progress Indicators**
- Phase dots: "Phase X of 3" ●●○
- Week dots: "Week X of 14" ●●●●●●●●●●●●●● (focus mode only)
- Week-in-phase dots (overview mode)
- Animated scaling on current position

✅ **Responsive Design**
- Works on mobile (375px+)
- Works on tablet (768px+)
- Works on desktop (1024px+)
- Adaptive padding/sizing

✅ **Keyboard Support**
- Arrow keys navigate phases/weeks
- Works in both modes
- No hardcoded bindings (reusable)

✅ **Animations & Transitions**
- Staggered page load (0.5s - 0.7s)
- Smooth mode transitions (400ms)
- Button hover/tap feedback
- Progress dot scaling

---

## 🐛 Known Limitations

1. **No Swipe Support Yet**
   - Keyboard navigation works
   - Mouse clicks work
   - Swipe/touch gestures not implemented (can add later)

2. **Side Peeks on Mobile**
   - May not be very visible on small screens
   - Could add "swipe to reveal" hint

3. **Blur Effect Performance**
   - Blur filter can be expensive on lower-end devices
   - Can optimize with `will-change` or reduce blur amount

4. **No Scroll Indicators**
   - No visual indication that side peeks exist
   - Could add subtle visual cue on mobile

---

## 🚀 Next Steps / Future Enhancements

1. **Add Swipe/Touch Support**
   - Detect swipe left/right
   - Animate hero card sliding
   - Mobile-native feel

2. **Add Jump Navigation**
   - Dropdown: "Go to Week X"
   - Quick access to any week

3. **Enhance Mobile View**
   - Add "swipe hint" on first load
   - Side peeks might be hidden initially, revealed on swipe

4. **Dark Mode**
   - Test blur effect in dark mode
   - Adjust opacity/blur values for dark theme

5. **Accessibility Enhancements**
   - ARIA labels on buttons
   - Screen reader announcements
   - Focus indicators

6. **Add Week Preview Modal**
   - Click week → modal instead of navigation
   - Modal shows full week details without leaving carousel
   - "View Full Week" button in modal navigates away

---

## 📊 Component File Structure

```
frontend/
├── app/
│   └── viewer/
│       └── experiments/
│           └── roadmap-carousel/
│               └── page.tsx ← Main page component
│
└── components/
    └── viewer/
        └── carousel/
            ├── CarouselHeader.tsx
            ├── CarouselContent.tsx
            ├── CarouselNavigation.tsx
            └── CarouselProgress.tsx
```

---

## 🎯 Success Criteria

This prototype is successful if:

1. ✅ Users can navigate phases easily (overview mode)
2. ✅ Users can focus on one week at a time (focus mode)
3. ✅ Switching modes is instant and smooth
4. ✅ Keyboard navigation works intuitively
5. ✅ Progress is always clear (dots)
6. ✅ No cognitive overload (one hero card at a time)
7. ✅ Works on mobile, tablet, and desktop
8. ✅ Brand colors and typography are consistent
9. ✅ Animations are smooth (no jank)
10. ✅ Users prefer this over the current grid view

---

## 💬 Feedback Questions

1. Does the focus mode feel natural when toggled?
2. Are the side peeks helpful or distracting?
3. Is the blur effect the right amount (not too strong)?
4. Would swipe support improve the experience?
5. Should we add a "jump to week" dropdown?
6. Is the progress indicator clear?
7. Any performance issues on older devices?
8. Preference: overview mode or focus mode?

---

**Status**: ✅ Prototype Ready
**Testing**: Ready to test at http://localhost:3000/viewer/experiments/roadmap-carousel
**Next**: Gather feedback and iterate!
