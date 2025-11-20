# Warm Theme (Light Mode)

**Concept**: Nurturing, approachable, human-centered.
**Best for**: Creative work, reflection, journaling.

---

## Color Palette

### Backgrounds
- **Primary Background**: `#FEFEFE` (Soft White) - Main page background
- **Secondary Background**: `#F3F4F6` (Cool Gray) - Sidebar, headers
- **Surface**: `#FFFFFF` (White) - Cards, modals, inputs

### Accents
- **Primary Accent**: `#D4654F` (Deep Coral) - Primary buttons, active states
- **Accent Hover**: `#E08A78` (Soft Coral) - Hover states
- **Accent Light**: `#F5D5C8` (Peach) - Background highlights

### Text
- **Primary Text**: `#3F3D42` (Charcoal) - Headings, body text
- **Secondary Text**: `#8B8A8F` (Warm Gray) - Metadata
- **Tertiary Text**: `#B5B4B8` (Light Gray) - Placeholders

### Borders
- **Border Color**: `#E5E7EB` (Light Gray) - Dividers

---

## Usage Examples

### Primary Button
Background: `#D4654F`
Text: `#FFFFFF`

### Card
Background: `#FFFFFF`
Shadow: `0 2px 8px rgba(0, 0, 0, 0.08)`

---

## CSS Variables

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
