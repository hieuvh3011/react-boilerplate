# Project Structure Guide

This document provides a detailed explanation of the project structure and how to add new features following the Feature-Sliced Design (FSD) methodology.

## 📁 Directory Structure

```
react-boilerplate/
├── .github/
│   └── workflows/
│       └── ci.yml                 # GitHub Actions CI/CD pipeline
├── .husky/                        # Git hooks (pre-commit, pre-push)
├── public/                        # Static assets
│   ├── favicon.ico
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── app/                       # Application layer
│   │   ├── providers/
│   │   │   └── AppProviders.tsx   # Global providers (Router, i18n)
│   │   └── routes/
│   │       └── AppRoutes.tsx      # Route configuration
│   ├── features/                  # Feature modules (business logic)
│   │   ├── auth/
│   │   │   ├── api/
│   │   │   │   └── authApi.ts     # Auth API methods
│   │   │   ├── components/
│   │   │   │   ├── LoginForm/
│   │   │   │   ├── RegisterForm/
│   │   │   │   └── ProtectedRoute.tsx
│   │   │   ├── pages/
│   │   │   │   ├── LoginPage.tsx
│   │   │   │   └── RegisterPage.tsx
│   │   │   └── store/
│   │   │       └── authStore.ts   # Zustand auth store
│   │   ├── home/
│   │   ├── profile/
│   │   └── settings/
│   ├── common/                    # Reusable UI components
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   └── index.ts
│   │   ├── Card/
│   │   └── Input/
│   ├── shared/                    # Shared utilities
│   │   ├── api/
│   │   │   ├── axiosInstance.ts   # Axios configuration
│   │   │   └── endpoints.ts       # API endpoints
│   │   ├── components/
│   │   │   ├── Header/
│   │   │   ├── Layout/
│   │   │   ├── LanguageSwitcher/
│   │   │   └── ThemeToggle/
│   │   ├── i18n/
│   │   │   ├── config.ts
│   │   │   └── locales/
│   │   │       ├── en.json
│   │   │       └── vi.json
│   │   └── stores/
│   │       ├── themeStore.ts
│   │       └── languageStore.ts
│   ├── App.tsx                    # Root component
│   ├── index.tsx                  # Entry point
│   ├── index.css                  # Global styles + Tailwind
│   └── vite-env.d.ts              # Vite type definitions
├── .env.example                   # Environment variables template
├── .eslintrc.json                 # ESLint configuration
├── .prettierrc.json               # Prettier configuration
├── .lintstagedrc.json             # Lint-staged configuration
├── CONTRIBUTING.md                # Coding standards and guidelines
├── DESIGN_SYSTEM.md               # Design tokens and theming
├── README.md                      # Project documentation
├── RESPONSIVE.md                  # Responsive design guide
├── TAILWIND_V4.md                 # Tailwind v4 usage guide
├── index.html                     # HTML template
├── package.json                   # Dependencies and scripts
├── playwright.config.ts           # Playwright E2E test config
├── postcss.config.js              # PostCSS configuration
├── tsconfig.json                  # TypeScript configuration
└── vite.config.ts                 # Vite configuration
```

## 🎯 Feature-Sliced Design (FSD)

### Layers

The project is organized into the following layers (from top to bottom):

1. **app/** - Application initialization and global providers
2. **features/** - Business logic and feature modules
3. **common/** - Reusable UI components (no business logic)
4. **shared/** - Utilities, API clients, stores, i18n

### Dependency Rules

- **Lower layers cannot import from higher layers**
- **Features cannot import from other features** (use shared layer)
- **Common components should be pure UI** (no business logic)

## ➕ Adding a New Feature

### Step 1: Create Feature Structure

```bash
src/features/my-feature/
├── api/
│   └── myFeatureApi.ts       # API methods
├── components/
│   └── MyComponent/
│       ├── MyComponent.tsx
│       └── index.ts
├── pages/
│   └── MyFeaturePage.tsx
├── store/
│   └── myFeatureStore.ts     # Zustand store (if needed)
└── types/
    └── index.ts              # TypeScript types
```

### Step 2: Implement API Layer

```typescript
// src/features/my-feature/api/myFeatureApi.ts
import axiosInstance from '@app/shared/api/axiosInstance';
import { API_ENDPOINTS } from '@app/shared/api/endpoints';

export const myFeatureApi = {
  fetchData: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.MY_FEATURE.LIST);
    return response.data;
  },
  
  createItem: async (data: CreateItemDto) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.MY_FEATURE.CREATE,
      data
    );
    return response.data;
  },
};
```

### Step 3: Create Zustand Store (if needed)

```typescript
// src/features/my-feature/store/myFeatureStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MyFeatureState {
  items: Item[];
  loading: boolean;
  fetchItems: () => Promise<void>;
}

export const useMyFeatureStore = create<MyFeatureState>()(
  persist(
    (set) => ({
      items: [],
      loading: false,
      fetchItems: async () => {
        set({ loading: true });
        try {
          const items = await myFeatureApi.fetchData();
          set({ items, loading: false });
        } catch (error) {
          set({ loading: false });
        }
      },
    }),
    { name: 'my-feature-storage' }
  )
);
```

### Step 4: Create Components

```typescript
// src/features/my-feature/components/MyComponent/MyComponent.tsx
import React from 'react';

interface MyComponentProps {
  title: string;
  onAction: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ title, onAction }) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
      <h2 className="text-xl font-bold">{title}</h2>
      <button onClick={onAction}>Action</button>
    </div>
  );
};
```

### Step 5: Create Page

```typescript
// src/features/my-feature/pages/MyFeaturePage.tsx
import React, { useEffect } from 'react';
import { Layout } from '@app/shared/components/Layout/Layout';
import { useMyFeatureStore } from '../store/myFeatureStore';
import { MyComponent } from '../components/MyComponent/MyComponent';

export const MyFeaturePage: React.FC = () => {
  const { items, loading, fetchItems } = useMyFeatureStore();

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  if (loading) return <div>Loading...</div>;

  return (
    <Layout>
      <h1>My Feature</h1>
      {items.map((item) => (
        <MyComponent key={item.id} title={item.title} onAction={() => {}} />
      ))}
    </Layout>
  );
};
```

### Step 6: Add Route

```typescript
// src/app/routes/AppRoutes.tsx
import { MyFeaturePage } from '@app/features/my-feature/pages/MyFeaturePage';

// Add to routes
<Route
  path="/my-feature"
  element={
    <ProtectedRoute>
      <MyFeaturePage />
    </ProtectedRoute>
  }
/>
```

### Step 7: Add API Endpoints

```typescript
// src/shared/api/endpoints.ts
export const API_ENDPOINTS = {
  // ... existing endpoints
  MY_FEATURE: {
    LIST: '/my-feature',
    CREATE: '/my-feature',
    UPDATE: (id: string) => `/my-feature/${id}`,
    DELETE: (id: string) => `/my-feature/${id}`,
  },
};
```

### Step 8: Add Translations

```json
// src/shared/i18n/locales/en.json
{
  "myFeature": {
    "title": "My Feature",
    "description": "Feature description",
    "actions": {
      "create": "Create",
      "edit": "Edit",
      "delete": "Delete"
    }
  }
}
```

```json
// src/shared/i18n/locales/vi.json
{
  "myFeature": {
    "title": "Tính năng của tôi",
    "description": "Mô tả tính năng",
    "actions": {
      "create": "Tạo mới",
      "edit": "Chỉnh sửa",
      "delete": "Xóa"
    }
  }
}
```

## 🧩 Adding a Common Component

Common components are pure UI components with no business logic.

```typescript
// src/common/Badge/Badge.tsx
import React from 'react';

interface BadgeProps {
  variant?: 'success' | 'warning' | 'danger' | 'info';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ 
  variant = 'info', 
  children 
}) => {
  const variantClasses = {
    success: 'bg-success text-white',
    warning: 'bg-warning text-white',
    danger: 'bg-danger text-white',
    info: 'bg-info text-white',
  };

  return (
    <span className={`px-2 py-1 rounded text-sm ${variantClasses[variant]}`}>
      {children}
    </span>
  );
};
```

```typescript
// src/common/Badge/index.ts
export { Badge } from './Badge';
```

## 🔧 Adding Shared Utilities

```typescript
// src/shared/utils/formatters.ts
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US').format(date);
};
```

## 📝 Checklist for New Features

- [ ] Create feature folder structure
- [ ] Implement API methods
- [ ] Create Zustand store (if needed)
- [ ] Build components
- [ ] Create page component
- [ ] Add route to AppRoutes
- [ ] Add API endpoints to endpoints.ts
- [ ] Add translations (en.json, vi.json)
- [ ] Write unit tests
- [ ] Write E2E tests (if applicable)
- [ ] Update documentation
- [ ] Run linter and formatter
- [ ] Test in both light and dark mode
- [ ] Test responsive design

## 🎨 Styling Guidelines

### Use Tailwind Utility Classes

```typescript
// ✅ Good
<div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">

// ❌ Avoid inline styles
<div style={{ padding: '16px', backgroundColor: 'white' }}>
```

### Responsive Design

```typescript
// ✅ Mobile-first approach
<div className="text-sm sm:text-base md:text-lg lg:text-xl">
```

### Dark Mode

```typescript
// ✅ Always provide dark mode variants
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
```

## 🧪 Testing New Features

### Unit Tests

```typescript
// src/features/my-feature/components/MyComponent/MyComponent.test.tsx
import { render, screen } from '@testing-library/react';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('renders title correctly', () => {
    render(<MyComponent title="Test Title" onAction={() => {}} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });
});
```

### E2E Tests

```typescript
// tests/my-feature.e2e.ts
import { test, expect } from '@playwright/test';

test('my feature flow', async ({ page }) => {
  await page.goto('/my-feature');
  await expect(page.locator('h1')).toContainText('My Feature');
});
```

## 📦 Dependencies

### Adding New Dependencies

```bash
# Production dependency
npm install package-name

# Development dependency
npm install -D package-name
```

Always update `package.json` and run `npm install --legacy-peer-deps` if there are peer dependency conflicts.

## 🚀 Deployment Checklist

- [ ] All tests pass (`npm test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] Environment variables configured
- [ ] API endpoints updated
- [ ] Translations complete
- [ ] Documentation updated

---

**Need help?** Check the [Contributing Guide](CONTRIBUTING.md) for coding standards and best practices.
