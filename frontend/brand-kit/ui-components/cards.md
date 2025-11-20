# Cards

Card components for displaying content in Compass.ai.

---

## Basic Card

```html
<div class="card">
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
</div>
```

```css
.card {
  background-color: var(--color-surface);
  border-radius: var(--radius-medium);
  padding: var(--space-6);
  box-shadow: var(--shadow-medium);
  transition: box-shadow var(--transition-default),
              transform var(--transition-default);
}

.card:hover {
  box-shadow: var(--shadow-large);
  transform: translateY(-2px);
}
```

---

## Card with Border

```html
<div class="card card-bordered">
  <h3>Bordered Card</h3>
  <p>Content with subtle border.</p>
</div>
```

```css
.card-bordered {
  border: 1px solid var(--color-border);
  box-shadow: none;
}

.card-bordered:hover {
  border-color: var(--color-accent-light);
  box-shadow: var(--shadow-small);
}
```

---

## Interactive Card

```html
<button class="card card-interactive">
  <h3>Clickable Card</h3>
  <p>This card is a button.</p>
</button>
```

```css
.card-interactive {
  cursor: pointer;
  border: 2px solid transparent;
  text-align: left;
}

.card-interactive:hover {
  border-color: var(--color-accent-primary);
}

.card-interactive:focus {
  outline: none;
  border-color: var(--color-accent-primary);
  box-shadow: var(--shadow-focus);
}
```

---

## React Component

```typescript
// components/Card.tsx
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  bordered?: boolean;
  interactive?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Card({ 
  children, 
  bordered = false,
  interactive = false,
  onClick,
  className = ''
}: CardProps) {
  const classes = [
    'card',
    bordered && 'card-bordered',
    interactive && 'card-interactive',
    className
  ].filter(Boolean).join(' ');

  if (interactive || onClick) {
    return (
      <button className={classes} onClick={onClick}>
        {children}
      </button>
    );
  }

  return <div className={classes}>{children}</div>;
}
```
