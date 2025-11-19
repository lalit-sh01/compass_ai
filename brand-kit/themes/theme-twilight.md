# Twilight Theme (Dark Mode)

**Concept**: Calm nighttime, easy on eyes, peaceful.
**Best for**: Nighttime use, low light environments, reducing eye strain.

---

## Color Palette

### Backgrounds
- **Primary Background**: `#0F1419` (Deep Navy) - Main page background
- **Secondary Background**: `#1A2332` (Lighter Navy) - Sidebar, headers
- **Surface**: `#242D3C` (Slate Navy) - Cards, modals

### Accents
- **Primary Accent**: `#7DD3FC` (Soft Cyan) - Primary buttons, active states
- **Accent Hover**: `#A5E3FF` (Pale Cyan) - Hover states
- **Accent Light**: `#3B82F6` (Blue) - Background highlights

### Text
- **Primary Text**: `#F0F4F8` (Soft White) - Headings, body text
- **Secondary Text**: `#A8B4C0` (Blue Gray) - Metadata
- **Tertiary Text**: `#6B7A8A` (Slate) - Placeholders

### Borders
- **Border Color**: `#2A3847` (Dark Slate) - Dividers

---

## Usage Examples

### Primary Button
Background: `#7DD3FC`
Text: `#0F1419` (Dark text on light accent for contrast)

### Card
Background: `#242D3C`
Shadow: `0 4px 16px rgba(0, 0, 0, 0.4)`

---

## CSS Variables

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
