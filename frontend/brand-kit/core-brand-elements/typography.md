# Typography System

The Compass.ai typography system uses two carefully selected fonts that balance friendliness with professionalism.

---

## Font Families

### Primary Font: DM Sans

**Purpose**: Headings, important UI text, emphasis  
**Style**: Sans-serif, rounded, friendly  
**Source**: Google Fonts  
**Import URL**: `https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap`

**Weights Used**:
- 400 (Regular) - Body headings, less emphasis
- 500 (Medium) - Subheadings, medium emphasis
- 700 (Bold) - Main headings, strong emphasis

**Character**: Approachable, modern, calm, human-centered

---

### Secondary Font: Inter

**Purpose**: Body text, UI elements, smaller text  
**Style**: Sans-serif, clean, highly readable  
**Source**: Google Fonts  
**Import URL**: `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap`

**Weights Used**:
- 400 (Regular) - Body text, standard UI
- 500 (Medium) - Emphasized body text
- 600 (SemiBold) - Strong UI elements (rare use)

**Character**: Clean, professional, excellent readability

---

## Typography Hierarchy

### Desktop Sizes

| Level | Font | Size | Weight | Line Height | Letter Spacing | Usage |
|-------|------|------|--------|-------------|----------------|-------|
| **H1** | DM Sans | 60px | 700 (Bold) | 1.2 (72px) | -0.02em | Hero headings, page titles |
| **H2** | DM Sans | 44px | 500 (Medium) | 1.3 (57px) | -0.01em | Section headings |
| **H3** | DM Sans | 32px | 500 (Medium) | 1.4 (45px) | 0 | Subsection headings |
| **H4** | DM Sans | 24px | 500 (Medium) | 1.5 (36px) | 0 | Card headings, small sections |
| **Body Large** | Inter | 18px | 400 (Regular) | 1.6 (29px) | 0 | Introductory text, emphasis |
| **Body** | Inter | 16px | 400 (Regular) | 1.6 (26px) | 0 | Standard body text |
| **Small** | Inter | 14px | 400 (Regular) | 1.5 (21px) | 0 | Secondary text, captions |
| **Caption** | Inter | 12px | 400 (Regular) | 1.4 (17px) | 0.01em | Labels, metadata |

### Mobile Sizes (< 768px)

| Level | Font | Size | Weight | Line Height |
|-------|------|------|--------|-------------|
| **H1** | DM Sans | 48px | 700 (Bold) | 1.2 (58px) |
| **H2** | DM Sans | 36px | 500 (Medium) | 1.3 (47px) |
| **H3** | DM Sans | 28px | 500 (Medium) | 1.4 (39px) |
| **H4** | DM Sans | 20px | 500 (Medium) | 1.5 (30px) |
| **Body Large** | Inter | 17px | 400 (Regular) | 1.6 (27px) |
| **Body** | Inter | 16px | 400 (Regular) | 1.6 (26px) |
| **Small** | Inter | 14px | 400 (Regular) | 1.5 (21px) |
| **Caption** | Inter | 12px | 400 (Regular) | 1.4 (17px) |

---

## CSS Implementation

### Font Import

```css
/* Import fonts from Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
```

### CSS Variables

```css
:root {
  /* Font Families */
  --font-primary: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-secondary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  
  /* Font Sizes - Desktop */
  --font-size-h1: 60px;
  --font-size-h2: 44px;
  --font-size-h3: 32px;
  --font-size-h4: 24px;
  --font-size-body-large: 18px;
  --font-size-body: 16px;
  --font-size-small: 14px;
  --font-size-caption: 12px;
  
  /* Font Weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  /* Line Heights */
  --line-height-tight: 1.2;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.6;
}

/* Mobile Overrides */
@media (max-width: 767px) {
  :root {
    --font-size-h1: 48px;
    --font-size-h2: 36px;
    --font-size-h3: 28px;
    --font-size-h4: 20px;
    --font-size-body-large: 17px;
  }
}
```

### Typography Classes

```css
h1, .heading-1 {
  font-family: var(--font-primary);
  font-size: var(--font-size-h1);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  letter-spacing: -0.02em;
}

h2, .heading-2 {
  font-family: var(--font-primary);
  font-size: var(--font-size-h2);
  font-weight: var(--font-weight-medium);
  line-height: 1.3;
  letter-spacing: -0.01em;
}

h3, .heading-3 {
  font-family: var(--font-primary);
  font-size: var(--font-size-h3);
  font-weight: var(--font-weight-medium);
  line-height: 1.4;
}

h4, .heading-4 {
  font-family: var(--font-primary);
  font-size: var(--font-size-h4);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-normal);
}

.body-large {
  font-family: var(--font-secondary);
  font-size: var(--font-size-body-large);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-relaxed);
}

body, .body {
  font-family: var(--font-secondary);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-relaxed);
}

.small {
  font-family: var(--font-secondary);
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-normal);
}

.caption {
  font-family: var(--font-secondary);
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-regular);
  line-height: 1.4;
  letter-spacing: 0.01em;
}
```

---

## Usage Guidelines

### Headings (DM Sans)

**Use For**:
- Page titles and hero headings (H1)
- Section headings (H2, H3)
- Card titles and component headings (H4)
- Any text that needs emphasis or hierarchy

**Don't Use For**:
- Body text (too distinctive for long reading)
- UI labels in forms (use Inter)
- Small text under 14px (readability issues)

### Body Text (Inter)

**Use For**:
- All body copy and paragraphs
- UI elements (buttons, inputs, navigation)
- Labels, captions, metadata
- Any text requiring extended reading

**Don't Use For**:
- Main headings (lacks personality)
- Hero text (not distinctive enough)

---

## Best Practices

1. **Maintain Hierarchy**: Use the defined scale consistently
2. **Line Length**: Keep body text between 60-80 characters per line
3. **Contrast**: Ensure sufficient contrast between text and background
4. **Responsive**: Scale down heading sizes on mobile
5. **Accessibility**: Minimum body text size is 16px
6. **Emphasis**: Use font weight for emphasis, not size changes
7. **Spacing**: Add appropriate margin/padding around text elements

---

## Accessibility

- **Minimum Size**: 16px for body text, 14px for small text
- **Contrast**: Follow WCAG AA standards (4.5:1 for body, 3:1 for large text)
- **Line Height**: Minimum 1.5 for body text for readability
- **Letter Spacing**: Subtle adjustments for large headings only
- **Font Weights**: Avoid weights below 400 for readability
