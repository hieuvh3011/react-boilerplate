# Design System Configuration

This file documents all design tokens used in the application. All values are centralized in `tailwind.config.js`.

## Colors

### Primary Colors
- `primary` - Main brand color (#6366f1 - Indigo)
- `primary-hover` - Hover state (#4f46e5)
- `primary-light` - Light variant (#818cf8)
- `primary-dark` - Dark variant (#3730a3)

### Secondary Colors
- `secondary` - Secondary brand color (#8b5cf6 - Violet)
- `secondary-hover` - Hover state (#7c3aed)
- `secondary-light` - Light variant (#a78bfa)
- `secondary-dark` - Dark variant (#5b21b6)

### Status Colors
- `success` - Success state (#10b981 - Green)
- `danger` - Error/danger state (#ef4444 - Red)
- `warning` - Warning state (#f59e0b - Amber)
- `info` - Info state (#3b82f6 - Blue)

Each status color has `light` and `dark` variants.

## Typography

### Font Family
- `font-sans` - Inter (primary font)
- `font-mono` - Monospace font for code

### Font Sizes
- `text-xs` - 12px (0.75rem)
- `text-sm` - 14px (0.875rem)
- `text-base` - 16px (1rem)
- `text-lg` - 18px (1.125rem)
- `text-xl` - 20px (1.25rem)
- `text-2xl` - 24px (1.5rem)
- `text-3xl` - 30px (1.875rem)
- `text-4xl` - 36px (2.25rem)
- `text-5xl` - 48px (3rem)

### Font Weights
- `font-light` - 300
- `font-normal` - 400
- `font-medium` - 500
- `font-semibold` - 600
- `font-bold` - 700

## Spacing

Custom spacing scale:
- `xs` - 4px (0.25rem)
- `sm` - 8px (0.5rem)
- `md` - 16px (1rem)
- `lg` - 24px (1.5rem)
- `xl` - 32px (2rem)
- `2xl` - 48px (3rem)
- `3xl` - 64px (4rem)
- `4xl` - 96px (6rem)

Usage: `p-md`, `m-lg`, `gap-sm`, etc.

## Border Radius

- `rounded-none` - 0
- `rounded-sm` - 4px (0.25rem)
- `rounded` - 6px (0.375rem)
- `rounded-md` - 8px (0.5rem)
- `rounded-lg` - 12px (0.75rem)
- `rounded-xl` - 16px (1rem)
- `rounded-2xl` - 24px (1.5rem)
- `rounded-3xl` - 32px (2rem)
- `rounded-full` - 9999px (circle)

## Shadows

- `shadow-sm` - Small shadow
- `shadow` - Default shadow
- `shadow-md` - Medium shadow
- `shadow-lg` - Large shadow
- `shadow-xl` - Extra large shadow
- `shadow-2xl` - 2X large shadow
- `shadow-inner` - Inner shadow
- `shadow-none` - No shadow

## Transitions

### Duration
- `duration-fast` - 150ms
- `duration` - 200ms (default)
- `duration-slow` - 300ms
- `duration-slower` - 500ms

### Timing Functions
- `ease` - Default easing
- `ease-linear` - Linear
- `ease-in` - Ease in
- `ease-out` - Ease out
- `ease-in-out` - Ease in-out

## Z-Index

- `z-dropdown` - 1000
- `z-sticky` - 1020
- `z-fixed` - 1030
- `z-modal-backdrop` - 1040
- `z-modal` - 1050
- `z-popover` - 1060
- `z-tooltip` - 1070

## Container Sizes

- `max-w-xs` - 320px
- `max-w-sm` - 384px
- `max-w-md` - 448px
- `max-w-lg` - 512px
- `max-w-xl` - 576px
- `max-w-2xl` - 672px
- `max-w-3xl` - 768px
- `max-w-4xl` - 896px
- `max-w-5xl` - 1024px
- `max-w-6xl` - 1152px
- `max-w-7xl` - 1280px

## Breakpoints

- `sm` - 640px
- `md` - 768px
- `lg` - 1024px
- `xl` - 1280px
- `2xl` - 1536px

Usage: `sm:text-lg`, `md:grid-cols-2`, etc.

## How to Customize

All design tokens are defined in `tailwind.config.js`. To customize:

1. Open `tailwind.config.js`
2. Find the token you want to change (e.g., colors, spacing)
3. Update the value
4. Tailwind will automatically rebuild with new values

### Example: Adding a New Color

```javascript
// In tailwind.config.js
colors: {
  // Add your custom color
  accent: {
    DEFAULT: '#ff6b6b',
    hover: '#ee5a52',
    light: '#ff8787',
    dark: '#c92a2a',
  },
}
```

Then use it: `bg-accent`, `text-accent-hover`, etc.

### Example: Adding Custom Spacing

```javascript
// In tailwind.config.js
spacing: {
  '5xl': '8rem', // 128px
  '6xl': '12rem', // 192px
}
```

Then use it: `p-5xl`, `m-6xl`, etc.

## Dark Mode

Dark mode uses the `class` strategy. Toggle dark mode by adding/removing the `dark` class on the root element.

Dark mode variants:
- `dark:bg-gray-900` - Dark background
- `dark:text-gray-100` - Dark text
- `dark:border-gray-700` - Dark border

All components automatically support dark mode.
