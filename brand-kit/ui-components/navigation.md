# Navigation

Navigation components for Compass.ai.

---

## Header Navigation

```html
<nav class="nav-header">
  <div class="nav-container">
    <div class="nav-logo">
      <img src="compass-icon.svg" alt="Compass.ai" />
      <span>Compass.ai</span>
    </div>
    <ul class="nav-links">
      <li><a href="/dashboard">Dashboard</a></li>
      <li><a href="/roadmaps">Roadmaps</a></li>
      <li><a href="/settings">Settings</a></li>
    </ul>
  </div>
</nav>
```

```css
.nav-header {
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: var(--space-4) 0;
}

.nav-container {
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: 0 var(--space-6);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-family: var(--font-primary);
  font-size: 20px;
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.nav-links {
  display: flex;
  gap: var(--space-6);
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links a {
  font-family: var(--font-secondary);
  font-size: var(--font-size-body);
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color var(--transition-default);
}

.nav-links a:hover {
  color: var(--color-accent-primary);
}
```
