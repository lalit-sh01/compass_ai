# Dusk Theme (Dark Mode)

**Concept**: Cozy evening, warm and inviting.
**Best for**: Late night reading, relaxing atmosphere.

---

## Color Palette

### Backgrounds
- **Primary Background**: `#1C1917` (Deep Warm Charcoal) - Main page background
- **Secondary Background**: `#292524` (Lighter Charcoal) - Sidebar, headers
- **Surface**: `#3A3634` (Warm Gray) - Cards, modals

### Accents
- **Primary Accent**: `#FCD34D` (Soft Amber) - Primary buttons, active states
- **Accent Hover**: `#FDE68A` (Pale Amber) - Hover states
- **Accent Light**: `#F59E0B` (Orange) - Background highlights

### Text
- **Primary Text**: `#FAF7F2` (Warm White) - Headings, body text
- **Secondary Text**: `#C4B8A8` (Tan Gray) - Metadata
- **Tertiary Text**: `#8A7F72` (Brown Gray) - Placeholders

### Borders
- **Border Color**: `#3F3A36` (Warm Dark Gray) - Dividers

---

## Usage Examples

### Primary Button
Background: `#FCD34D`
Text: `#1C1917` (Dark text on light accent)

### Card
Background: `#3A3634`
Shadow: `0 4px 16px rgba(0, 0, 0, 0.5)`

---

## CSS Variables

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
