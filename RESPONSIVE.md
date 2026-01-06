# Responsive Design Guide

This boilerplate is fully responsive and optimized for all screen sizes.

## Breakpoints

The application uses Tailwind's default breakpoints:

- **Mobile**: < 640px (default)
- **sm** (Small): ≥ 640px (tablets)
- **md** (Medium): ≥ 768px (small laptops)
- **lg** (Large): ≥ 1024px (desktops)
- **xl** (Extra Large): ≥ 1280px (large desktops)
- **2xl**: ≥ 1536px (very large screens)

## Responsive Features

### 📱 Header
- **Mobile**: Compact layout, app name hidden, logout icon only
- **Tablet**: Show app name, text logout button
- **Desktop**: Full layout with user name displayed

### 📄 Pages

#### Authentication Pages (Login/Register)
- **Mobile**: Full-width forms, smaller padding
- **Tablet**: Centered cards with medium padding
- **Desktop**: Larger cards with generous padding

#### Home Page
- **Mobile**: Single column layout
- **Tablet**: 2-column grid for navigation cards
- **Desktop**: Larger typography and spacing

#### Profile & Settings Pages
- **Mobile**: Full-width content
- **Tablet/Desktop**: Max-width containers for better readability

### 🧩 Components

#### Button
- **Mobile**: Smaller padding (px-2, py-1)
- **Desktop**: Larger padding (px-3, py-1.5)
- Responsive font sizes for all size variants

#### Card
- **Mobile**: Compact padding (p-4)
- **Tablet**: Medium padding (p-5)
- **Desktop**: Generous padding (p-6)
- Responsive typography

#### Input
- Fully responsive with adaptive sizing
- Error messages wrap properly on mobile

## Typography Scale

### Headings
- **H1**: 
  - Mobile: text-2xl (24px)
  - Tablet: text-3xl (30px)
  - Desktop: text-4xl or text-5xl (36-48px)

- **H2**:
  - Mobile: text-xl (20px)
  - Desktop: text-2xl (24px)

- **Body Text**:
  - Mobile: text-sm (14px)
  - Desktop: text-base (16px)

## Spacing

### Padding
- **Mobile**: px-4, py-6
- **Tablet**: px-6, py-8
- **Desktop**: px-8, py-12

### Gaps
- **Mobile**: gap-3 or gap-4
- **Tablet**: gap-4 or gap-6
- **Desktop**: gap-6 or gap-8

## Best Practices

### 1. Mobile-First Approach
Always start with mobile styles, then add larger breakpoints:

```tsx
// ✅ Good
<div className="text-sm sm:text-base lg:text-lg">

// ❌ Bad
<div className="text-lg sm:text-sm">
```

### 2. Use Responsive Utilities

```tsx
// Responsive padding
<div className="p-4 sm:p-6 lg:p-8">

// Responsive grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

// Responsive visibility
<span className="hidden sm:inline">Desktop only</span>
<span className="sm:hidden">Mobile only</span>
```

### 3. Touch-Friendly Targets

All interactive elements have minimum 44x44px touch targets on mobile.

### 4. Readable Line Lengths

Content containers use max-width to prevent overly long lines:
- max-w-2xl (672px) for profile/settings
- max-w-7xl (1280px) for main layout

### 5. Flexible Images

Images should be responsive:
```tsx
<img className="w-full h-auto" />
```

## Testing Responsive Design

### Browser DevTools
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test different screen sizes

### Common Test Sizes
- iPhone SE: 375x667
- iPhone 12 Pro: 390x844
- iPad: 768x1024
- Desktop: 1920x1080

### What to Check
- ✅ Text is readable (not too small)
- ✅ Buttons are tappable (not too small)
- ✅ Content doesn't overflow
- ✅ Navigation is accessible
- ✅ Forms are usable
- ✅ Images scale properly

## Customizing Responsive Behavior

### Add Custom Breakpoint

In `tailwind.config.js`:

```javascript
screens: {
  'xs': '480px',
  // ... other breakpoints
}
```

Then use: `xs:text-lg`

### Override Component Responsiveness

```tsx
<Button 
  className="text-xs sm:text-sm md:text-base"
  size="medium"
>
  Custom responsive button
</Button>
```

## Common Patterns

### Responsive Grid

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Cards */}
</div>
```

### Responsive Flex

```tsx
<div className="flex flex-col sm:flex-row gap-4">
  {/* Items */}
</div>
```

### Responsive Text

```tsx
<h1 className="text-2xl sm:text-3xl lg:text-4xl">
  Responsive Heading
</h1>
```

### Conditional Rendering

```tsx
{/* Show on mobile only */}
<div className="block sm:hidden">Mobile content</div>

{/* Show on desktop only */}
<div className="hidden lg:block">Desktop content</div>
```

## Performance Tips

1. **Use Tailwind's JIT**: Already configured, only generates used classes
2. **Optimize Images**: Use appropriate sizes for different screens
3. **Lazy Load**: Load content as needed
4. **Minimize Reflows**: Use CSS transforms instead of layout changes

## Accessibility

All responsive designs maintain accessibility:
- Keyboard navigation works on all screen sizes
- Focus states are visible
- Color contrast meets WCAG standards
- Touch targets are appropriately sized

---

**Your app is now fully responsive! 📱💻🖥️**
