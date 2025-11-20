# Onboarding Flow - Theme Selection

This document specifies the theme selection experience during user onboarding.

---

## User Flow

### Step 1: Welcome Screen
- Brief introduction to Compass.ai
- Explain the value proposition
- CTA: "Get Started"

### Step 2: Theme Selection (This Document)
- Heading: "Choose Your Calm"
- Subheading: "Everyone finds peace differently. Pick the theme that resonates with you."
- Display all 4 themes as interactive cards
- User selects one theme
- CTA: "Continue"

### Step 3: Account Setup
- Create account or sign in
- Theme preference is saved

---

## Screen Layout

### Desktop (1024px+)

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                   Choose Your Calm                      │
│                                                         │
│     Everyone finds peace differently. Pick the theme   │
│          that resonates with you. You can always       │
│                  change it later.                       │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐                   │
│  │   SERENE     │  │    WARM      │                   │
│  │  (Preview)   │  │  (Preview)   │                   │
│  │  Clear &     │  │  Nurturing & │                   │
│  │  Peaceful    │  │  Approachable│                   │
│  └──────────────┘  └──────────────┘                   │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐                   │
│  │  TWILIGHT    │  │    DUSK      │                   │
│  │  (Preview)   │  │  (Preview)   │                   │
│  │  Calm        │  │  Cozy        │                   │
│  │  Nighttime   │  │  Evening     │                   │
│  └──────────────┘  └──────────────┘                   │
│                                                         │
│                    [Continue →]                         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Mobile (< 768px)

Themes stack vertically, one per row

---

## Theme Card Design

Each theme card should include:

### Visual Elements
1. **Preview Area**: Shows theme colors in action
   - Background gradient
   - Sample UI elements (button, card)
   - Compass icon in theme colors

2. **Theme Name**: Bold, clear heading

3. **Description**: One-line description of the theme's feel

4. **Category Badge**: "LIGHT MODE" or "DARK MODE"

### Interactive States

**Default**:
- Subtle shadow
- Border: 2px solid transparent

**Hover**:
- Slightly larger shadow
- Subtle scale transform (1.02)
- Border: 2px solid theme accent color

**Selected**:
- Strong shadow
- Border: 3px solid theme accent color
- Checkmark icon in corner
- Slight glow effect

---

## HTML Structure

```html
<div class="onboarding-theme-selection">
  <div class="container">
    <header class="onboarding-header">
      <h1>Choose Your Calm</h1>
      <p>Everyone finds peace differently. Pick the theme that resonates with you. You can always change it later.</p>
    </header>

    <div class="theme-grid">
      <!-- Serene Theme -->
      <button class="theme-card" data-theme="serene">
        <span class="theme-badge">LIGHT MODE</span>
        <div class="theme-preview">
          <!-- Preview content -->
          <div class="preview-bg"></div>
          <div class="preview-card">
            <div class="preview-icon">🧭</div>
            <div class="preview-button">Get Started</div>
          </div>
        </div>
        <div class="theme-info">
          <h3>Serene</h3>
          <p>Clear and peaceful</p>
        </div>
        <div class="theme-check">✓</div>
      </button>

      <!-- Warm Theme -->
      <button class="theme-card" data-theme="warm">
        <span class="theme-badge">LIGHT MODE</span>
        <div class="theme-preview">
          <!-- Preview content -->
        </div>
        <div class="theme-info">
          <h3>Warm</h3>
          <p>Nurturing and approachable</p>
        </div>
        <div class="theme-check">✓</div>
      </button>

      <!-- Twilight Theme -->
      <button class="theme-card" data-theme="twilight">
        <span class="theme-badge">DARK MODE</span>
        <div class="theme-preview">
          <!-- Preview content -->
        </div>
        <div class="theme-info">
          <h3>Twilight</h3>
          <p>Calm nighttime</p>
        </div>
        <div class="theme-check">✓</div>
      </button>

      <!-- Dusk Theme -->
      <button class="theme-card" data-theme="dusk">
        <span class="theme-badge">DARK MODE</span>
        <div class="theme-preview">
          <!-- Preview content -->
        </div>
        <div class="theme-info">
          <h3>Dusk</h3>
          <p>Cozy evening</p>
        </div>
        <div class="theme-check">✓</div>
      </button>
    </div>

    <div class="onboarding-actions">
      <button class="button-primary" id="continue-btn" disabled>
        Continue →
      </button>
    </div>
  </div>
</div>
```

---

## CSS Styling

```css
.onboarding-theme-selection {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-8);
  background-color: var(--color-bg-primary);
}

.onboarding-header {
  text-align: center;
  margin-bottom: var(--space-12);
}

.onboarding-header h1 {
  font-size: var(--font-size-h1);
  margin-bottom: var(--space-4);
}

.onboarding-header p {
  font-size: var(--font-size-body-large);
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.theme-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);
  margin-bottom: var(--space-12);
}

@media (max-width: 767px) {
  .theme-grid {
    grid-template-columns: 1fr;
  }
}

.theme-card {
  position: relative;
  background: var(--color-surface);
  border: 2px solid transparent;
  border-radius: var(--radius-large);
  padding: var(--space-6);
  cursor: pointer;
  transition: all var(--transition-default);
  box-shadow: var(--shadow-medium);
  text-align: left;
}

.theme-card:hover {
  transform: scale(1.02);
  box-shadow: var(--shadow-large);
}

.theme-card.selected {
  border-color: var(--color-accent-primary);
  box-shadow: var(--shadow-large), var(--glow-accent);
}

.theme-badge {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.theme-preview {
  height: 200px;
  border-radius: var(--radius-medium);
  margin-bottom: var(--space-4);
  overflow: hidden;
  position: relative;
}

.theme-check {
  position: absolute;
  top: var(--space-4);
  left: var(--space-4);
  width: 32px;
  height: 32px;
  background: var(--color-accent-primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  opacity: 0;
  transform: scale(0);
  transition: all var(--transition-default);
}

.theme-card.selected .theme-check {
  opacity: 1;
  transform: scale(1);
}

.theme-info h3 {
  font-size: var(--font-size-h4);
  margin-bottom: var(--space-2);
}

.theme-info p {
  font-size: var(--font-size-small);
  color: var(--color-text-secondary);
}

.onboarding-actions {
  text-align: center;
}

.button-primary:disabled {
  opacity: var(--opacity-disabled);
  cursor: not-allowed;
}
```

---

## JavaScript Behavior

```javascript
const themeCards = document.querySelectorAll('.theme-card');
const continueBtn = document.getElementById('continue-btn');
let selectedTheme = null;

themeCards.forEach(card => {
  card.addEventListener('click', () => {
    // Remove previous selection
    themeCards.forEach(c => c.classList.remove('selected'));
    
    // Select this card
    card.classList.add('selected');
    selectedTheme = card.dataset.theme;
    
    // Enable continue button
    continueBtn.disabled = false;
    
    // Apply theme preview
    document.documentElement.setAttribute('data-theme', selectedTheme);
  });
});

continueBtn.addEventListener('click', () => {
  if (selectedTheme) {
    // Save theme preference
    localStorage.setItem('compass-theme', selectedTheme);
    
    // Continue to next onboarding step
    window.location.href = '/onboarding/account-setup';
  }
});
```

---

## React Implementation

```typescript
// components/ThemeOnboarding.tsx
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const themes = [
  { 
    id: 'serene', 
    name: 'Serene', 
    description: 'Clear and peaceful',
    category: 'LIGHT MODE'
  },
  { 
    id: 'warm', 
    name: 'Warm', 
    description: 'Nurturing and approachable',
    category: 'LIGHT MODE'
  },
  { 
    id: 'twilight', 
    name: 'Twilight', 
    description: 'Calm nighttime',
    category: 'DARK MODE'
  },
  { 
    id: 'dusk', 
    name: 'Dusk', 
    description: 'Cozy evening',
    category: 'DARK MODE'
  },
];

export function ThemeOnboarding({ onContinue }: { onContinue: () => void }) {
  const { theme, setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId);
    setTheme(themeId as any);
  };

  const handleContinue = () => {
    if (selectedTheme) {
      onContinue();
    }
  };

  return (
    <div className="onboarding-theme-selection">
      <div className="container">
        <header className="onboarding-header">
          <h1>Choose Your Calm</h1>
          <p>
            Everyone finds peace differently. Pick the theme that resonates 
            with you. You can always change it later.
          </p>
        </header>

        <div className="theme-grid">
          {themes.map((t) => (
            <button
              key={t.id}
              className={`theme-card ${selectedTheme === t.id ? 'selected' : ''}`}
              onClick={() => handleThemeSelect(t.id)}
              data-theme={t.id}
            >
              <span className="theme-badge">{t.category}</span>
              <div className="theme-preview">
                {/* Theme preview content */}
              </div>
              <div className="theme-info">
                <h3>{t.name}</h3>
                <p>{t.description}</p>
              </div>
              <div className="theme-check">✓</div>
            </button>
          ))}
        </div>

        <div className="onboarding-actions">
          <button
            className="button-primary"
            onClick={handleContinue}
            disabled={!selectedTheme}
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

## Accessibility

- **Keyboard Navigation**: All theme cards are focusable and selectable via keyboard
- **Screen Readers**: Announce theme name, description, and selection state
- **Focus Indicators**: Clear focus outline on all interactive elements
- **ARIA Labels**: Proper labels for theme selection

```html
<button 
  class="theme-card" 
  data-theme="serene"
  aria-label="Select Serene theme: Clear and peaceful light mode"
  aria-pressed="false"
>
  <!-- Content -->
</button>
```

---

## Analytics Tracking

Track theme selection for insights:

```javascript
// Track theme selection
function trackThemeSelection(theme) {
  // Google Analytics
  gtag('event', 'theme_selected', {
    'theme_name': theme,
    'theme_category': ['twilight', 'dusk'].includes(theme) ? 'dark' : 'light'
  });
  
  // Or your analytics platform
  analytics.track('Theme Selected', {
    theme: theme,
    step: 'onboarding'
  });
}
```

---

## Best Practices

1. **Default Selection**: Don't pre-select a theme - let users choose
2. **Live Preview**: Apply theme immediately when card is clicked
3. **Clear Feedback**: Show clear visual feedback for selection
4. **Easy to Change**: Remind users they can change theme later
5. **Skip Option**: Consider allowing users to skip and use default
6. **Mobile Optimization**: Ensure cards are easily tappable on mobile
