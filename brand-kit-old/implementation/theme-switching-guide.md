# Theme Switching Implementation Guide

This guide explains how to implement theme selection and switching in Compass.ai.

---

## Overview

Users can select from 4 themes during onboarding and change their theme anytime in settings. The theme preference should:
- Persist across sessions (localStorage)
- Apply immediately without page reload
- Sync across tabs/windows
- Optionally auto-switch based on time of day

---

## Implementation Steps

### 1. HTML Setup

Add `data-theme` attribute to the root element:

```html
<!DOCTYPE html>
<html lang="en" data-theme="serene">
<head>
  <meta charset="UTF-8">
  <title>Compass.ai</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- Your app -->
  <script src="theme.js"></script>
</body>
</html>
```

### 2. CSS Setup

All theme variables should be defined in CSS (see `css-variables.md`):

```css
[data-theme="serene"] { /* Serene colors */ }
[data-theme="warm"] { /* Warm colors */ }
[data-theme="twilight"] { /* Twilight colors */ }
[data-theme="dusk"] { /* Dusk colors */ }
```

### 3. JavaScript Theme Manager

Create a theme manager module:

```javascript
// theme.js
const ThemeManager = {
  STORAGE_KEY: 'compass-theme',
  DEFAULT_THEME: 'serene',
  
  // Get current theme
  getTheme() {
    return localStorage.getItem(this.STORAGE_KEY) || this.DEFAULT_THEME;
  },
  
  // Set theme
  setTheme(themeName) {
    // Validate theme
    const validThemes = ['serene', 'warm', 'twilight', 'dusk'];
    if (!validThemes.includes(themeName)) {
      console.error(`Invalid theme: ${themeName}`);
      return;
    }
    
    // Apply theme
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem(this.STORAGE_KEY, themeName);
    
    // Dispatch event for other components
    window.dispatchEvent(new CustomEvent('themechange', { 
      detail: { theme: themeName } 
    }));
  },
  
  // Initialize theme on page load
  init() {
    const savedTheme = this.getTheme();
    this.setTheme(savedTheme);
  },
  
  // Get theme category (light or dark)
  getThemeCategory(theme = this.getTheme()) {
    return ['twilight', 'dusk'].includes(theme) ? 'dark' : 'light';
  },
  
  // Toggle between light and dark
  toggleLightDark() {
    const currentTheme = this.getTheme();
    const newTheme = {
      'serene': 'twilight',
      'warm': 'dusk',
      'twilight': 'serene',
      'dusk': 'warm'
    }[currentTheme];
    
    this.setTheme(newTheme);
  }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ThemeManager;
}
```

---

## React Implementation

### Theme Context

```typescript
// contexts/ThemeContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'serene' | 'warm' | 'twilight' | 'dusk';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
  toggleLightDark: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('serene');

  useEffect(() => {
    // Load saved theme
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

  const isDark = theme === 'twilight' || theme === 'dusk';

  const toggleLightDark = () => {
    const newTheme = {
      'serene': 'twilight',
      'warm': 'dusk',
      'twilight': 'serene',
      'dusk': 'warm'
    }[theme] as Theme;
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark, toggleLightDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
```

### Theme Selector Component

```typescript
// components/ThemeSelector.tsx
import { useTheme } from '../contexts/ThemeContext';

const themes = [
  { id: 'serene', name: 'Serene', description: 'Clear and peaceful', category: 'light' },
  { id: 'warm', name: 'Warm', description: 'Nurturing and approachable', category: 'light' },
  { id: 'twilight', name: 'Twilight', description: 'Calm nighttime', category: 'dark' },
  { id: 'dusk', name: 'Dusk', description: 'Cozy evening', category: 'dark' },
];

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="theme-selector">
      <h3>Choose Your Theme</h3>
      <div className="theme-grid">
        {themes.map((t) => (
          <button
            key={t.id}
            className={`theme-card ${theme === t.id ? 'active' : ''}`}
            onClick={() => setTheme(t.id as any)}
            data-theme-preview={t.id}
          >
            <div className="theme-preview">
              {/* Preview colors */}
            </div>
            <h4>{t.name}</h4>
            <p>{t.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
```

---

## Advanced Features

### Auto Dark Mode by Time

```javascript
function autoThemeByTime() {
  const hour = new Date().getHours();
  const isDarkHours = hour >= 20 || hour < 6;
  
  const currentTheme = ThemeManager.getTheme();
  const isLightTheme = ['serene', 'warm'].includes(currentTheme);
  
  if (isDarkHours && isLightTheme) {
    // Switch to dark variant
    const darkTheme = currentTheme === 'serene' ? 'twilight' : 'dusk';
    ThemeManager.setTheme(darkTheme);
  } else if (!isDarkHours && !isLightTheme) {
    // Switch to light variant
    const lightTheme = currentTheme === 'twilight' ? 'serene' : 'warm';
    ThemeManager.setTheme(lightTheme);
  }
}

// Check every hour
setInterval(autoThemeByTime, 60 * 60 * 1000);
```

### System Preference Detection

```javascript
function detectSystemTheme() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Only apply if user hasn't set a preference
  if (!localStorage.getItem('compass-theme')) {
    const defaultTheme = prefersDark ? 'twilight' : 'serene';
    ThemeManager.setTheme(defaultTheme);
  }
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  const prefersDark = e.matches;
  const suggestedTheme = prefersDark ? 'twilight' : 'serene';
  
  // Optionally prompt user or auto-switch
  console.log(`System theme changed. Suggested theme: ${suggestedTheme}`);
});
```

### Cross-Tab Synchronization

```javascript
// Listen for storage changes in other tabs
window.addEventListener('storage', (e) => {
  if (e.key === 'compass-theme' && e.newValue) {
    document.documentElement.setAttribute('data-theme', e.newValue);
    
    // Update UI if needed
    window.dispatchEvent(new CustomEvent('themechange', { 
      detail: { theme: e.newValue } 
    }));
  }
});
```

---

## Theme Transition Animation

Add smooth transition when switching themes:

```css
html {
  transition: background-color 300ms ease-in-out,
              color 300ms ease-in-out;
}

/* Prevent transition on page load */
html.no-transition,
html.no-transition * {
  transition: none !important;
}
```

```javascript
// Remove no-transition class after page load
window.addEventListener('load', () => {
  document.documentElement.classList.remove('no-transition');
});
```

---

## Testing Checklist

- [ ] Theme persists after page reload
- [ ] Theme applies immediately without flicker
- [ ] All colors update correctly
- [ ] Focus states are visible in all themes
- [ ] Transitions are smooth
- [ ] Cross-tab sync works
- [ ] Auto dark mode works (if implemented)
- [ ] System preference detection works (if implemented)
- [ ] Theme selector UI updates correctly

---

## Troubleshooting

### Theme Flicker on Page Load

**Problem**: Brief flash of wrong theme before correct theme loads

**Solution**: Inline theme script in `<head>`:

```html
<head>
  <script>
    (function() {
      const theme = localStorage.getItem('compass-theme') || 'serene';
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.classList.add('no-transition');
    })();
  </script>
</head>
```

### Theme Not Persisting

**Problem**: Theme resets on page reload

**Solution**: Check localStorage is enabled and accessible

```javascript
function isLocalStorageAvailable() {
  try {
    const test = '__test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}
```

### Colors Not Updating

**Problem**: Some elements don't update when theme changes

**Solution**: Ensure all colors use CSS variables, not hardcoded values

```css
/* Wrong */
.button {
  background-color: #2C7A7B;
}

/* Correct */
.button {
  background-color: var(--color-accent-primary);
}
```

---

## Performance Considerations

1. **Minimize Repaints**: Use CSS variables for instant theme switching
2. **Avoid JavaScript Color Manipulation**: Let CSS handle all color changes
3. **Optimize Transitions**: Only transition necessary properties
4. **Lazy Load Theme Assets**: Load theme-specific images on demand
5. **Cache Theme Preference**: Read from localStorage once, cache in memory
