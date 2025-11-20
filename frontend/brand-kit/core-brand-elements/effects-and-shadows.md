# Effects & Shadows

The Compass.ai design system uses subtle effects and shadows to create depth and hierarchy while maintaining a calm aesthetic.

---

## Border Radius

Rounded corners create a friendly, approachable feel.

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-small` | 8px | Buttons, inputs, badges |
| `--radius-medium` | 12px | Cards, dropdowns |
| `--radius-large` | 16px | Modals, large cards |
| `--radius-full` | 9999px | Pills, avatars, circular elements |

### CSS Variables

```css
:root {
  --radius-small: 8px;
  --radius-medium: 12px;
  --radius-large: 16px;
  --radius-full: 9999px;
}
```

---

## Shadows

Shadows create depth and elevation. Use sparingly for calm aesthetic.

### Light Theme Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-small` | `0 2px 8px rgba(0, 0, 0, 0.08)` | Buttons, small cards |
| `--shadow-medium` | `0 4px 16px rgba(0, 0, 0, 0.12)` | Cards, dropdowns |
| `--shadow-large` | `0 8px 32px rgba(0, 0, 0, 0.16)` | Modals, popovers |
| `--shadow-focus` | `0 0 0 3px rgba(44, 122, 123, 0.2)` | Focus states (Serene theme) |

### Dark Theme Shadows

For dark themes, use deeper shadows with slight color tint:

**Twilight (Cool)**:
```css
--shadow-small: 0 2px 8px rgba(0, 0, 0, 0.3);
--shadow-medium: 0 4px 16px rgba(0, 0, 0, 0.4);
--shadow-large: 0 8px 32px rgba(0, 0, 0, 0.5);
```

**Dusk (Warm)**:
```css
--shadow-small: 0 2px 8px rgba(0, 0, 0, 0.4);
--shadow-medium: 0 4px 16px rgba(0, 0, 0, 0.5);
--shadow-large: 0 8px 32px rgba(0, 0, 0, 0.6);
```

---

## Transitions

Smooth, gentle transitions maintain the calm aesthetic.

| Property | Duration | Easing | Usage |
|----------|----------|--------|-------|
| **Default** | 200ms | ease-in-out | Most interactions |
| **Fast** | 150ms | ease-out | Small changes, hovers |
| **Slow** | 300ms | ease-in-out | Large movements, modals |
| **Smooth** | 400ms | cubic-bezier(0.4, 0, 0.2, 1) | Page transitions |

### CSS Variables

```css
:root {
  --transition-fast: 150ms ease-out;
  --transition-default: 200ms ease-in-out;
  --transition-slow: 300ms ease-in-out;
  --transition-smooth: 400ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Common Transitions

```css
/* Hover States */
.button {
  transition: background-color var(--transition-default),
              transform var(--transition-fast);
}

.button:hover {
  transform: translateY(-1px);
}

/* Focus States */
.input:focus {
  transition: border-color var(--transition-fast),
              box-shadow var(--transition-fast);
}

/* Modal Entrance */
.modal {
  transition: opacity var(--transition-slow),
              transform var(--transition-smooth);
}
```

---

## Opacity

Use opacity for subtle states and overlays.

| Token | Value | Usage |
|-------|-------|-------|
| `--opacity-disabled` | 0.4 | Disabled elements |
| `--opacity-hover` | 0.8 | Hover states on images |
| `--opacity-overlay` | 0.5 | Modal overlays |
| `--opacity-subtle` | 0.6 | Secondary elements |

---

## Backdrop Blur (Glassmorphism)

Use sparingly for modern, elevated elements.

```css
.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Dark theme variant */
.glass-effect-dark {
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

**Usage**: Modals, floating navigation, special cards

---

## Glow Effects

Subtle glows on accent colors for dark themes.

### Serene / Twilight (Teal/Cyan)

```css
.glow-accent {
  box-shadow: 0 0 20px rgba(125, 211, 252, 0.3);
}
```

### Warm / Dusk (Coral/Amber)

```css
.glow-accent {
  box-shadow: 0 0 20px rgba(252, 211, 77, 0.3);
}
```

**Usage**: Primary CTAs in dark mode, active states, highlights

---

## Complete CSS Variables

```css
:root {
  /* Border Radius */
  --radius-small: 8px;
  --radius-medium: 12px;
  --radius-large: 16px;
  --radius-full: 9999px;
  
  /* Shadows - Light Theme */
  --shadow-small: 0 2px 8px rgba(0, 0, 0, 0.08);
  --shadow-medium: 0 4px 16px rgba(0, 0, 0, 0.12);
  --shadow-large: 0 8px 32px rgba(0, 0, 0, 0.16);
  
  /* Transitions */
  --transition-fast: 150ms ease-out;
  --transition-default: 200ms ease-in-out;
  --transition-slow: 300ms ease-in-out;
  --transition-smooth: 400ms cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Opacity */
  --opacity-disabled: 0.4;
  --opacity-hover: 0.8;
  --opacity-overlay: 0.5;
  --opacity-subtle: 0.6;
}

/* Dark Theme Overrides */
[data-theme="twilight"],
[data-theme="dusk"] {
  --shadow-small: 0 2px 8px rgba(0, 0, 0, 0.3);
  --shadow-medium: 0 4px 16px rgba(0, 0, 0, 0.4);
  --shadow-large: 0 8px 32px rgba(0, 0, 0, 0.5);
}
```

---

## Best Practices

1. **Subtle Shadows**: Keep shadows soft and subtle for calm aesthetic
2. **Consistent Transitions**: Use same duration for similar interactions
3. **Performance**: Avoid transitioning expensive properties (width, height)
4. **Accessibility**: Respect `prefers-reduced-motion` for animations
5. **Dark Mode**: Increase shadow opacity in dark themes
6. **Glow Sparingly**: Use glow effects only on primary actions in dark mode
7. **Border Radius**: Maintain consistent radius within component types

---

## Accessibility

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Focus Indicators

Always maintain visible focus indicators:

```css
.interactive-element:focus {
  outline: none;
  box-shadow: var(--shadow-focus);
}

/* Ensure focus is visible in all themes */
.interactive-element:focus-visible {
  outline: 2px solid var(--color-accent-primary);
  outline-offset: 2px;
}
```
