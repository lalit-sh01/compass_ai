# CSS Variables - Theme Implementation

This file provides the complete CSS custom properties for all four Compass.ai themes.

---

## How to Use

1. Copy the base variables and theme-specific variables into your CSS
2. Apply theme by adding `data-theme` attribute to `<html>` or `<body>`
3. Theme will automatically switch all colors

```html
<!-- Serene Theme -->
<html data-theme="serene">

<!-- Warm Theme -->
<html data-theme="warm">

<!-- Twilight Theme -->
<html data-theme="twilight">

<!-- Dusk Theme -->
<html data-theme="dusk">
```

---

## Base Variables (Consistent Across All Themes)

```css
:root {
  /* Typography */
  --font-primary: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-secondary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  
  --font-size-h1: 60px;
  --font-size-h2: 44px;
  --font-size-h3: 32px;
  --font-size-h4: 24px;
  --font-size-body-large: 18px;
  --font-size-body: 16px;
  --font-size-small: 14px;
  --font-size-caption: 12px;
  
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  /* Spacing */
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
  
  /* Border Radius */
  --radius-small: 8px;
  --radius-medium: 12px;
  --radius-large: 16px;
  --radius-full: 9999px;
  
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
  
  /* Layout */
  --container-max-width: 1280px;
  --grid-gap: var(--space-6);
}

/* Mobile Overrides */
@media (max-width: 767px) {
  :root {
    --font-size-h1: 48px;
    --font-size-h2: 36px;
    --font-size-h3: 28px;
    --font-size-h4: 20px;
    --font-size-body-large: 17px;
    --grid-gap: var(--space-4);
  }
}
```

---

## Theme 1: Serene (Light Mode)

```css
[data-theme="serene"] {
  /* Backgrounds */
  --color-bg-primary: #FAF7F2;
  --color-bg-secondary: #F5F0E8;
  --color-surface: #FFFFFF;
  
  /* Accents */
  --color-accent-primary: #2C7A7B;
  --color-accent-hover: #4A9B9C;
  --color-accent-light: #B8D4E8;
  
  /* Text */
  --color-text-primary: #3A4A52;
  --color-text-secondary: #7A8A92;
  --color-text-tertiary: #A8B4BC;
  
  /* Borders */
  --color-border: #E5E9EC;
  
  /* Shadows */
  --shadow-small: 0 2px 8px rgba(0, 0, 0, 0.08);
  --shadow-medium: 0 4px 16px rgba(0, 0, 0, 0.12);
  --shadow-large: 0 8px 32px rgba(0, 0, 0, 0.16);
  --shadow-focus: 0 0 0 3px rgba(44, 122, 123, 0.2);
}
```

---

## Theme 2: Warm (Light Mode)

```css
[data-theme="warm"] {
  /* Backgrounds */
  --color-bg-primary: #FEFEFE;
  --color-bg-secondary: #F3F4F6;
  --color-surface: #FFFFFF;
  
  /* Accents */
  --color-accent-primary: #D4654F;
  --color-accent-hover: #E08A78;
  --color-accent-light: #F5D5C8;
  
  /* Text */
  --color-text-primary: #3F3D42;
  --color-text-secondary: #8B8A8F;
  --color-text-tertiary: #B5B4B8;
  
  /* Borders */
  --color-border: #E5E7EB;
  
  /* Shadows */
  --shadow-small: 0 2px 8px rgba(0, 0, 0, 0.08);
  --shadow-medium: 0 4px 16px rgba(0, 0, 0, 0.12);
  --shadow-large: 0 8px 32px rgba(0, 0, 0, 0.16);
  --shadow-focus: 0 0 0 3px rgba(212, 101, 79, 0.2);
}
```

---

## Theme 3: Twilight (Dark Mode)

```css
[data-theme="twilight"] {
  /* Backgrounds */
  --color-bg-primary: #0F1419;
  --color-bg-secondary: #1A2332;
  --color-surface: #242D3C;
  
  /* Accents */
  --color-accent-primary: #7DD3FC;
  --color-accent-hover: #A5E3FF;
  --color-accent-light: #3B82F6;
  
  /* Text */
  --color-text-primary: #F0F4F8;
  --color-text-secondary: #A8B4C0;
  --color-text-tertiary: #6B7A8A;
  
  /* Borders */
  --color-border: #2A3847;
  
  /* Shadows */
  --shadow-small: 0 2px 8px rgba(0, 0, 0, 0.3);
  --shadow-medium: 0 4px 16px rgba(0, 0, 0, 0.4);
  --shadow-large: 0 8px 32px rgba(0, 0, 0, 0.5);
  --shadow-focus: 0 0 0 3px rgba(125, 211, 252, 0.3);
  
  /* Glow Effect */
  --glow-accent: 0 0 20px rgba(125, 211, 252, 0.3);
}
```

---

## Theme 4: Dusk (Dark Mode)

```css
[data-theme="dusk"] {
  /* Backgrounds */
  --color-bg-primary: #1C1917;
  --color-bg-secondary: #292524;
  --color-surface: #3A3634;
  
  /* Accents */
  --color-accent-primary: #FCD34D;
  --color-accent-hover: #FDE68A;
  --color-accent-light: #F59E0B;
  
  /* Text */
  --color-text-primary: #FAF7F2;
  --color-text-secondary: #C4B8A8;
  --color-text-tertiary: #8A7F72;
  
  /* Borders */
  --color-border: #3F3A36;
  
  /* Shadows */
  --shadow-small: 0 2px 8px rgba(0, 0, 0, 0.4);
  --shadow-medium: 0 4px 16px rgba(0, 0, 0, 0.5);
  --shadow-large: 0 8px 32px rgba(0, 0, 0, 0.6);
  --shadow-focus: 0 0 0 3px rgba(252, 211, 77, 0.3);
  
  /* Glow Effect */
  --glow-accent: 0 0 20px rgba(252, 211, 77, 0.3);
}
```

---

## Complete Implementation Example

```css
/* Import fonts */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

/* Base variables */
:root {
  /* ... (copy all base variables from above) ... */
}

/* Theme variables */
[data-theme="serene"] { /* ... */ }
[data-theme="warm"] { /* ... */ }
[data-theme="twilight"] { /* ... */ }
[data-theme="dusk"] { /* ... */ }

/* Apply to body */
body {
  font-family: var(--font-secondary);
  font-size: var(--font-size-body);
  color: var(--color-text-primary);
  background-color: var(--color-bg-primary);
  line-height: 1.6;
  transition: background-color var(--transition-default),
              color var(--transition-default);
}

/* Typography */
h1 { 
  font-family: var(--font-primary);
  font-size: var(--font-size-h1);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

/* Buttons */
.button-primary {
  background-color: var(--color-accent-primary);
  color: white;
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-small);
  border: none;
  font-family: var(--font-secondary);
  font-weight: var(--font-weight-medium);
  transition: background-color var(--transition-default),
              transform var(--transition-fast);
}

.button-primary:hover {
  background-color: var(--color-accent-hover);
  transform: translateY(-1px);
}

/* Cards */
.card {
  background-color: var(--color-surface);
  border-radius: var(--radius-medium);
  padding: var(--space-6);
  box-shadow: var(--shadow-medium);
  transition: box-shadow var(--transition-default);
}

.card:hover {
  box-shadow: var(--shadow-large);
}
```

---

## JavaScript Theme Switching

```javascript
// Set theme
function setTheme(themeName) {
  document.documentElement.setAttribute('data-theme', themeName);
  localStorage.setItem('compass-theme', themeName);
}

// Get saved theme or default
function getTheme() {
  return localStorage.getItem('compass-theme') || 'serene';
}

// Apply theme on load
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = getTheme();
  setTheme(savedTheme);
});

// Auto dark mode based on time (optional)
function autoThemeByTime() {
  const hour = new Date().getHours();
  const isDarkHours = hour >= 20 || hour < 6;
  
  const currentTheme = getTheme();
  const isLightTheme = currentTheme === 'serene' || currentTheme === 'warm';
  
  if (isDarkHours && isLightTheme) {
    // Switch to dark theme
    const darkTheme = currentTheme === 'serene' ? 'twilight' : 'dusk';
    setTheme(darkTheme);
  }
}
```

---

## React/Next.js Implementation

```typescript
// hooks/useTheme.ts
import { useEffect, useState } from 'react';

type Theme = 'serene' | 'warm' | 'twilight' | 'dusk';

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('serene');

  useEffect(() => {
    // Get saved theme
    const savedTheme = localStorage.getItem('compass-theme') as Theme;
    if (savedTheme) {
      setThemeState(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('compass-theme', newTheme);
  };

  return { theme, setTheme };
}
```

---

## Tailwind CSS Integration (Optional)

If using Tailwind, extend the theme:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'bg-primary': 'var(--color-bg-primary)',
        'bg-secondary': 'var(--color-bg-secondary)',
        'surface': 'var(--color-surface)',
        'accent-primary': 'var(--color-accent-primary)',
        'accent-hover': 'var(--color-accent-hover)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
      },
      fontFamily: {
        primary: 'var(--font-primary)',
        secondary: 'var(--font-secondary)',
      },
    },
  },
}
```

---

## Testing Themes

Test all themes to ensure:
- [ ] All colors are readable (contrast ratios meet WCAG AA)
- [ ] Transitions are smooth
- [ ] Focus states are visible
- [ ] Dark themes are comfortable for eyes
- [ ] Theme persists after page reload
