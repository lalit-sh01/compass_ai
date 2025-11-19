# Theme Overview

Compass.ai offers a **4-theme system** designed to provide comfort and clarity in any environment.

---

## Theme Philosophy

We believe "calm" is personal. Some find peace in cool, airy spaces (Serene), while others prefer warm, cozy environments (Warm). Our dark modes extend this philosophy to nighttime use.

All themes share the same:
- **Typography** (DM Sans + Inter)
- **Spacing Scale** (4px grid)
- **Component Shapes** (Rounded corners)
- **Layout Structure**

Only the **colors** change.

---

## The 4 Themes

### Light Modes (Daytime)

| Theme | Concept | Primary Colors | Best For |
|-------|---------|----------------|----------|
| **[Serene](./theme-serene.md)** | Clear, Peaceful | Teal & Cream | Focus, Clarity, Professional use |
| **[Warm](./theme-warm.md)** | Nurturing, Human | Coral & Soft White | Creativity, Reflection, Journaling |

### Dark Modes (Nighttime)

| Theme | Concept | Primary Colors | Best For |
|-------|---------|----------------|----------|
| **[Twilight](./theme-twilight.md)** | Calm Night | Cyan & Navy | Low light, Reducing eye strain |
| **[Dusk](./theme-dusk.md)** | Cozy Evening | Amber & Charcoal | Relaxing, Late night reading |

---

## Implementation

To implement these themes, refer to the [CSS Variables Guide](../implementation/css-variables.md).

Each theme is applied via a data attribute on the root element:
```html
<html data-theme="serene">
```
