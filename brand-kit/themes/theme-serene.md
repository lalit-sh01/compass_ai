# Serene Theme (Light Mode)

**Concept**: Clear, peaceful, trustworthy.
**Best for**: Daytime use, professional focus, clarity.

---

## Color Palette

### Backgrounds
- **Primary Background**: `#FAF7F2` (Warm Cream) - Main page background
- **Secondary Background**: `#F5F0E8` (Darker Cream) - Sidebar, headers
- **Surface**: `#FFFFFF` (White) - Cards, modals, inputs

### Accents
- **Primary Accent**: `#2C7A7B` (Deep Teal) - Primary buttons, active states, links
- **Accent Hover**: `#4A9B9C` (Lighter Teal) - Hover states
- **Accent Light**: `#B8D4E8` (Soft Blue) - Background highlights, selected states

### Text
- **Primary Text**: `#3A4A52` (Charcoal) - Headings, body text
- **Secondary Text**: `#7A8A92` (Slate Gray) - Metadata, descriptions
- **Tertiary Text**: `#A8B4BC` (Light Gray) - Placeholders, disabled text

### Borders
- **Border Color**: `#E5E9EC` (Light Gray) - Dividers, card borders

---

## Usage Examples

### Primary Button
Background: `#2C7A7B`
Text: `#FFFFFF`

### Card
Background: `#FFFFFF`
Shadow: `0 2px 8px rgba(0, 0, 0, 0.08)`

### Navigation Bar
Background: `#FFFFFF` or `#FAF7F2`
Border Bottom: `#E5E9EC`

---

## CSS Variables

```css
[data-theme="serene"] {
  /* Backgrounds */
  --color-bg-primary: #FAF7F2;
  --color-bg-secondary: #F5F0E8;
  --color-surface: #FFFFFF;
  
  /* Accents */
  --color-accent-primary: #2C7A7B;
  --color-accent-hover: #4A9B9C;
  --color-accent-light: #B8D4E8;
  
  /* Text */
  --color-text-primary: #3A4A52;
  --color-text-secondary: #7A8A92;
  --color-text-tertiary: #A8B4BC;
  
  /* Borders */
  --color-border: #E5E9EC;
  
  /* Shadows */
  --shadow-small: 0 2px 8px rgba(0, 0, 0, 0.08);
  --shadow-medium: 0 4px 16px rgba(0, 0, 0, 0.12);
  --shadow-large: 0 8px 32px rgba(0, 0, 0, 0.16);
  --shadow-focus: 0 0 0 3px rgba(44, 122, 123, 0.2);
}
```
