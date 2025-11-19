# Buttons

Button components for Compass.ai using the theme system.

---

## Button Variants

### Primary Button
Main call-to-action button with accent color.

```html
<button class="button button-primary">Get Started</button>
```

```css
.button-primary {
  background-color: var(--color-accent-primary);
  color: white;
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-small);
  border: none;
  font-family: var(--font-secondary);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: background-color var(--transition-default),
              transform var(--transition-fast),
              box-shadow var(--transition-default);
}

.button-primary:hover {
  background-color: var(--color-accent-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow-small);
}

.button-primary:active {
  transform: translateY(0);
}

.button-primary:disabled {
  opacity: var(--opacity-disabled);
  cursor: not-allowed;
}
```

### Secondary Button
Alternative action button with outline style.

```html
<button class="button button-secondary">Learn More</button>
```

```css
.button-secondary {
  background-color: transparent;
  color: var(--color-accent-primary);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-small);
  border: 2px solid var(--color-accent-primary);
  font-family: var(--font-secondary);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-default);
}

.button-secondary:hover {
  background-color: var(--color-accent-light);
  border-color: var(--color-accent-hover);
}
```

### Ghost Button
Minimal button for tertiary actions.

```html
<button class="button button-ghost">Cancel</button>
```

```css
.button-ghost {
  background-color: transparent;
  color: var(--color-text-secondary);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-small);
  border: none;
  font-family: var(--font-secondary);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-default);
}

.button-ghost:hover {
  background-color: var(--color-bg-secondary);
  color: var(--color-text-primary);
}
```

---

## Button Sizes

```html
<button class="button button-primary button-small">Small</button>
<button class="button button-primary">Medium (Default)</button>
<button class="button button-primary button-large">Large</button>
```

```css
.button-small {
  padding: var(--space-2) var(--space-4);
  font-size: var(--font-size-small);
}

.button-large {
  padding: var(--space-4) var(--space-8);
  font-size: var(--font-size-body-large);
}
```

---

## React Component

```typescript
// components/Button.tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'medium',
  className = '',
  children,
  ...props 
}: ButtonProps) {
  const classes = [
    'button',
    `button-${variant}`,
    size !== 'medium' ? `button-${size}` : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
```

Usage:
```tsx
<Button variant="primary" size="large">Get Started</Button>
<Button variant="secondary">Learn More</Button>
<Button variant="ghost" size="small">Cancel</Button>
```
