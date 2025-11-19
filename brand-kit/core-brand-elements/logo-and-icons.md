# Logo & Icons

The Compass.ai visual identity centers around the compass metaphor - guiding users toward their goals.

---

## Logo System

### Primary Logo

**Components**:
- Compass icon (symbol)
- "Compass.ai" wordmark

**Usage**: Primary logo for headers, marketing, branding

### Logo Variations

1. **Full Logo** (Icon + Wordmark)
   - Use when space allows
   - Minimum width: 120px
   
2. **Icon Only**
   - Use in tight spaces (mobile nav, favicon)
   - Minimum size: 32px × 32px
   
3. **Wordmark Only**
   - Use when icon is already established in context
   - Minimum width: 100px

---

## Logo Specifications

### Compass Icon

**Design Principles**:
- Minimalist, geometric design
- Rounded, friendly aesthetic
- Clear at small sizes
- Works in single color

**Key Elements**:
- Circular outer ring
- Cardinal direction indicators (N, S, E, W) - subtle or implied
- Central needle/pointer
- Clean, simple lines

**Style**: Line-based, not filled (for versatility)

### Wordmark

**Font**: DM Sans, Medium (500 weight)  
**Styling**: 
- "Compass" in primary text color
- ".ai" can be in accent color or same as "Compass"
- Letter spacing: -0.01em for tighter, modern feel

---

## Logo Colors by Theme

### Serene (Light)
- Icon: `#2C7A7B` (Deep Teal)
- Wordmark: `#3A4A52` (Charcoal)
- ".ai": `#2C7A7B` (Deep Teal) - optional accent

### Warm (Light)
- Icon: `#D4654F` (Deep Coral)
- Wordmark: `#3F3D42` (Charcoal)
- ".ai": `#D4654F` (Deep Coral) - optional accent

### Twilight (Dark)
- Icon: `#7DD3FC` (Soft Cyan)
- Wordmark: `#F0F4F8` (Soft White)
- ".ai": `#7DD3FC` (Soft Cyan) - optional accent

### Dusk (Dark)
- Icon: `#FCD34D` (Soft Amber)
- Wordmark: `#FAF7F2` (Warm White)
- ".ai": `#FCD34D` (Soft Amber) - optional accent

---

## Clear Space

Maintain clear space around logo equal to the height of the icon.

```
┌─────────────────────────┐
│                         │
│    [CLEAR SPACE]        │
│                         │
│  ┌─────────────────┐    │
│  │  [COMPASS LOGO] │    │
│  └─────────────────┘    │
│                         │
│    [CLEAR SPACE]        │
│                         │
└─────────────────────────┘
```

**Minimum Clear Space**: 16px on all sides

---

## Logo Usage Guidelines

### Do's ✓
- Use approved color variations
- Maintain aspect ratio
- Ensure sufficient contrast with background
- Use on solid backgrounds when possible
- Scale proportionally

### Don'ts ✗
- Don't rotate or skew the logo
- Don't change the font or spacing
- Don't add effects (drop shadows, gradients)
- Don't place on busy backgrounds without container
- Don't use unapproved colors
- Don't separate icon from wordmark in primary contexts

---

## Icon System

### Icon Style

**Characteristics**:
- Line-based (stroke, not fill)
- Rounded line caps and joins
- Consistent stroke width: 2px
- Minimalist, geometric
- 24px × 24px base size

**Recommended Icon Library**: [Lucide Icons](https://lucide.dev/) or [Heroicons](https://heroicons.com/)
- Both offer rounded, minimalist styles
- Consistent with brand aesthetic
- Open source and customizable

### Icon Sizes

| Size | Dimension | Usage |
|------|-----------|-------|
| Small | 16px | Inline with text, tight spaces |
| Medium | 24px | Standard UI icons |
| Large | 32px | Feature icons, emphasis |
| XLarge | 48px | Hero sections, empty states |

### Icon Colors

Icons should use text colors from the theme:

```css
.icon {
  color: var(--color-text-secondary);
}

.icon-primary {
  color: var(--color-accent-primary);
}

.icon-muted {
  color: var(--color-text-tertiary);
}
```

---

## Compass Icon Variations

The compass icon can be used in different contexts:

### Navigation Compass
- Full compass with all cardinal directions
- Use in: Navigation, wayfinding, progress indicators

### Simplified Compass
- Minimal compass with just needle/pointer
- Use in: Logos, small spaces, favicons

### Directional Indicator
- Compass needle pointing in specific direction
- Use in: Progress, goal achievement, milestones

---

## Implementation

### SVG Logo Template

```svg
<svg width="120" height="32" viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Compass Icon -->
  <circle cx="16" cy="16" r="14" stroke="currentColor" stroke-width="2"/>
  <path d="M16 6 L16 26 M6 16 L26 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  
  <!-- Wordmark (simplified - use actual font) -->
  <text x="40" y="22" font-family="DM Sans" font-size="18" font-weight="500" fill="currentColor">
    Compass.ai
  </text>
</svg>
```

### CSS for Logo

```css
.logo {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: var(--color-text-primary);
}

.logo-icon {
  width: 32px;
  height: 32px;
  color: var(--color-accent-primary);
}

.logo-text {
  font-family: var(--font-primary);
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.01em;
}

.logo-text .ai {
  color: var(--color-accent-primary);
}
```

---

## Favicon

**Sizes Needed**:
- 16×16px
- 32×32px
- 48×48px
- 180×180px (Apple Touch Icon)
- 192×192px (Android)
- 512×512px (PWA)

**Design**: Use simplified compass icon only
**Background**: Transparent or theme accent color
**Format**: PNG or SVG

---

## Best Practices

1. **Consistency**: Use the same logo variation throughout a single context
2. **Contrast**: Ensure logo is visible against background
3. **Sizing**: Never use logo smaller than minimum sizes
4. **Quality**: Use vector (SVG) format when possible
5. **Accessibility**: Provide alt text for logo images
6. **Theme Adaptation**: Logo colors should adapt to theme
7. **Simplicity**: Keep the design clean and uncluttered

---

## File Formats

Provide logo in multiple formats:

- **SVG**: Primary format, scalable, web use
- **PNG**: Raster backup, various sizes
- **PDF**: Print materials
- **ICO**: Favicon

**Color Modes**:
- Full color (theme-specific)
- Single color (black, white)
- Transparent background
