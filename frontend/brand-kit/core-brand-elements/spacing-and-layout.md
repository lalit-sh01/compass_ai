# Spacing & Layout System

The Compass.ai spacing system creates breathing room and visual hierarchy through consistent, predictable spacing.

---

## Spacing Scale

### Base Unit: 4px

All spacing values are multiples of **4px** for consistency and alignment.

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Minimal spacing, tight elements |
| `--space-2` | 8px | Small gaps, icon spacing |
| `--space-3` | 12px | Compact spacing |
| `--space-4` | 16px | Default spacing, small padding |
| `--space-6` | 24px | Medium spacing, card padding |
| `--space-8` | 32px | Large spacing, section padding |
| `--space-12` | 48px | Extra large spacing, section gaps |
| `--space-16` | 64px | Section spacing |
| `--space-24` | 96px | Major section spacing |
| `--space-32` | 128px | Hero spacing, page sections |

---

## Component Spacing

### Padding (Internal Spacing)

| Component | Padding | Token |
|-----------|---------|-------|
| **Button Small** | 8px 16px | `--space-2 --space-4` |
| **Button Medium** | 12px 24px | `--space-3 --space-6` |
| **Button Large** | 16px 32px | `--space-4 --space-8` |
| **Card Small** | 16px | `--space-4` |
| **Card Medium** | 24px | `--space-6` |
| **Card Large** | 32px | `--space-8` |
| **Input Field** | 12px 16px | `--space-3 --space-4` |
| **Modal** | 32px | `--space-8` |
| **Navigation** | 16px 24px | `--space-4 --space-6` |

### Margin (External Spacing)

| Element | Margin Bottom | Token |
|---------|---------------|-------|
| **H1** | 24px | `--space-6` |
| **H2** | 20px | 5 × 4px |
| **H3** | 16px | `--space-4` |
| **H4** | 12px | `--space-3` |
| **Paragraph** | 16px | `--space-4` |
| **List Item** | 8px | `--space-2` |
| **Section** | 64px | `--space-16` |

---

## Layout System

### Container

```css
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px; /* --space-6 */
}

@media (max-width: 767px) {
  .container {
    padding: 0 16px; /* --space-4 */
  }
}
```

### Grid System

**12-Column Grid**

```css
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px; /* --space-6 */
}

@media (max-width: 767px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 16px; /* --space-4 */
  }
}
```

**Common Column Spans**:
- Full width: `grid-column: span 12;`
- Half: `grid-column: span 6;`
- Third: `grid-column: span 4;`
- Quarter: `grid-column: span 3;`

### Breakpoints

| Breakpoint | Range | Usage |
|------------|-------|-------|
| **Mobile** | 320px - 767px | Single column, stacked layout |
| **Tablet** | 768px - 1023px | 2-column layouts, adjusted spacing |
| **Desktop** | 1024px+ | Full grid, maximum spacing |

---

## CSS Variables

```css
:root {
  /* Spacing Scale */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;
  --space-32: 128px;
  
  /* Layout */
  --container-max-width: 1280px;
  --grid-columns: 12;
  --grid-gap: var(--space-6);
  
  /* Component Padding */
  --padding-small: var(--space-4);
  --padding-medium: var(--space-6);
  --padding-large: var(--space-8);
}

@media (max-width: 767px) {
  :root {
    --grid-gap: var(--space-4);
  }
}
```

---

## Vertical Rhythm

Maintain consistent vertical spacing throughout the page:

```css
/* Section Spacing */
.section {
  padding: var(--space-16) 0; /* 64px top/bottom */
}

.section-large {
  padding: var(--space-24) 0; /* 96px top/bottom */
}

/* Content Spacing */
.content > * + * {
  margin-top: var(--space-4); /* 16px between elements */
}

.content > h2 + * {
  margin-top: var(--space-6); /* 24px after headings */
}
```

---

## Stack Component

Use for consistent vertical spacing:

```css
.stack {
  display: flex;
  flex-direction: column;
}

.stack-small > * + * {
  margin-top: var(--space-2); /* 8px */
}

.stack-medium > * + * {
  margin-top: var(--space-4); /* 16px */
}

.stack-large > * + * {
  margin-top: var(--space-6); /* 24px */
}
```

---

## Best Practices

1. **Use the Scale**: Always use spacing tokens, never arbitrary values
2. **Breathing Room**: Err on the side of more space for calm aesthetic
3. **Consistent Gaps**: Use same gap value within a component
4. **Responsive Spacing**: Reduce spacing on mobile (typically 50-75%)
5. **Section Separation**: Use large spacing (64px+) between major sections
6. **Component Padding**: Maintain consistent padding within component types
7. **Optical Alignment**: Adjust spacing optically when needed for visual balance

---

## Common Patterns

### Card Layout
```css
.card {
  padding: var(--space-6); /* 24px */
  border-radius: 12px;
}

.card-content > * + * {
  margin-top: var(--space-4); /* 16px between elements */
}
```

### Form Layout
```css
.form-group {
  margin-bottom: var(--space-6); /* 24px between form groups */
}

.form-label {
  margin-bottom: var(--space-2); /* 8px between label and input */
}
```

### Navigation
```css
.nav {
  padding: var(--space-4) var(--space-6); /* 16px vertical, 24px horizontal */
  gap: var(--space-6); /* 24px between nav items */
}
```

---

## Accessibility

- **Touch Targets**: Minimum 44px × 44px for interactive elements
- **Spacing**: Adequate spacing between interactive elements (minimum 8px)
- **Focus Indicators**: Ensure focus outlines have sufficient spacing
- **Reading Comfort**: Maintain line length of 60-80 characters
