# Forms

Form components using the Compass.ai theme system.

---

## Input Field

```html
<div class="form-group">
  <label for="email" class="form-label">Email</label>
  <input 
    type="email" 
    id="email" 
    class="form-input" 
    placeholder="you@example.com"
  />
</div>
```

```css
.form-group {
  margin-bottom: var(--space-6);
}

.form-label {
  display: block;
  font-family: var(--font-secondary);
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.form-input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  font-family: var(--font-secondary);
  font-size: var(--font-size-body);
  color: var(--color-text-primary);
  background-color: var(--color-surface);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-small);
  transition: border-color var(--transition-fast),
              box-shadow var(--transition-fast);
}

.form-input:hover {
  border-color: var(--color-accent-light);
}

.form-input:focus {
  outline: none;
  border-color: var(--color-accent-primary);
  box-shadow: var(--shadow-focus);
}

.form-input::placeholder {
  color: var(--color-text-tertiary);
}
```

---

## Textarea

```html
<div class="form-group">
  <label for="notes" class="form-label">Notes</label>
  <textarea 
    id="notes" 
    class="form-input form-textarea" 
    rows="4"
    placeholder="Add your notes..."
  ></textarea>
</div>
```

```css
.form-textarea {
  resize: vertical;
  min-height: 100px;
}
```

---

## React Component

```typescript
// components/Input.tsx
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={props.id} className="form-label">
          {label}
        </label>
      )}
      <input 
        className={`form-input ${error ? 'form-input-error' : ''} ${className}`}
        {...props}
      />
      {error && <span className="form-error">{error}</span>}
    </div>
  );
}
```
