# Tailwind CSS v4 Configuration

This project uses **Tailwind CSS v4** (latest version) with the new configuration system.

## Key Changes in v4

### 1. No More `tailwind.config.js`
Tailwind v4 uses CSS-based configuration instead of JavaScript config files.

### 2. Configuration in CSS
All theme customization is done in `src/index.css` using the `@theme` directive:

```css
@theme {
  --color-primary: #6366f1;
  --color-secondary: #8b5cf6;
  /* ... more variables */
}
```

### 3. Import Statement
Use `@import 'tailwindcss'` instead of `@tailwind` directives:

```css
@import 'tailwindcss';
```

### 4. PostCSS Plugin
Uses `@tailwindcss/postcss` instead of `tailwindcss` as PostCSS plugin.

## Customizing Theme

Edit `src/index.css` and modify the `@theme` block:

```css
@theme {
  /* Add or modify CSS variables */
  --color-brand: #your-color;
  --font-custom: 'Your Font', sans-serif;
}
```

Then use in your components:

```tsx
<div className="bg-[--color-brand]">Custom color</div>
```

Or create utility classes:

```css
@layer utilities {
  .bg-brand {
    background-color: var(--color-brand);
  }
}
```

## Available Theme Variables

See `src/index.css` for all available theme variables:
- Colors (primary, secondary, success, danger, warning, info)
- Font families
- Spacing scale
- Border radius
- Transition durations

## Dark Mode

Dark mode works the same way - use the `dark:` variant:

```tsx
<div className="bg-white dark:bg-gray-900">
  Content
</div>
```

## Migration from v3

If you need to migrate from v3:
1. Remove `tailwind.config.js`
2. Move theme config to `@theme` in CSS
3. Update `@tailwind` to `@import 'tailwindcss'`
4. Use `postcss.config.mjs` with ES modules

## Documentation

- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [v4 Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide)
