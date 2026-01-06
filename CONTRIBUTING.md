# Contributing Guide

This document outlines the coding standards, conventions, and best practices for this React TypeScript boilerplate. Following these guidelines ensures consistency and maintainability across the codebase.

## 📋 Table of Contents

- [Code Style](#code-style)
- [Naming Conventions](#naming-conventions)
- [File Organization](#file-organization)
- [TypeScript Guidelines](#typescript-guidelines)
- [React Best Practices](#react-best-practices)
- [State Management](#state-management)
- [Testing Standards](#testing-standards)
- [Git Workflow](#git-workflow)

## 🎨 Code Style

### ESLint & Prettier

This project uses **Airbnb style guide** with TypeScript extensions. All code must pass ESLint and Prettier checks before committing.

```bash
# Check for linting errors
npm run lint

# Auto-fix linting errors
npm run lint:fix

# Format code
npm run format
```

### Key Rules

- **Indentation**: 2 spaces (enforced by Prettier)
- **Quotes**: Single quotes for strings
- **Semicolons**: Required
- **Line Length**: Max 100 characters (Prettier default)
- **Trailing Commas**: ES5 style (objects, arrays)

## 📝 Naming Conventions

### Files and Folders

```
✅ Good
PascalCase for components:     Button.tsx, LoginForm.tsx
camelCase for utilities:        authStore.ts, axiosInstance.ts
kebab-case for CSS modules:    Button.module.css
lowercase for configs:          tsconfig.json, .eslintrc.json

❌ Bad
button.tsx, login_form.tsx, Auth-Store.ts
```

### Components

```typescript
// ✅ Use PascalCase for component names
export const UserProfile: React.FC = () => { ... };

// ✅ Use descriptive names
export const LoginForm: React.FC = () => { ... };

// ❌ Avoid generic names
export const Form: React.FC = () => { ... };
```

### Variables and Functions

```typescript
// ✅ Use camelCase
const userName = 'John';
const fetchUserData = async () => { ... };

// ✅ Use descriptive names
const isAuthenticated = true;
const handleSubmit = () => { ... };

// ❌ Avoid abbreviations
const usrNm = 'John';
const getData = () => { ... };
```

### Constants

```typescript
// ✅ Use UPPER_SNAKE_CASE for true constants
const API_BASE_URL = 'https://api.example.com';
const MAX_RETRY_ATTEMPTS = 3;

// ✅ Use PascalCase for enum-like objects
const UserRole = {
  Admin: 'admin',
  User: 'user',
} as const;
```

### Types and Interfaces

```typescript
// ✅ Use PascalCase, prefix interfaces with 'I' is optional
interface User {
  id: string;
  name: string;
}

type UserRole = 'admin' | 'user';

// ✅ Use descriptive names for props
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}
```

## 📁 File Organization

### Feature-Sliced Design (FSD)

Follow the established FSD structure:

```
src/
├── app/                    # Application layer
│   ├── providers/         # Global providers
│   └── routes/            # Route configuration
├── features/              # Feature modules (business logic)
│   └── auth/
│       ├── components/    # Feature-specific components
│       ├── pages/         # Feature pages
│       ├── store/         # Zustand stores
│       ├── api/           # API methods
│       └── __tests__/     # Tests
├── common/                # Shared UI components
│   └── Button/
│       ├── Button.tsx
│       ├── Button.test.tsx
│       └── index.ts       # Re-export
├── shared/                # Shared utilities
│   ├── components/        # Layout components
│   ├── stores/            # Global stores
│   ├── api/               # API configuration
│   ├── i18n/              # Translations
│   └── utils/             # Helper functions
```

### Component Structure

Each component should have its own folder:

```
Button/
├── Button.tsx              # Component implementation
├── Button.test.tsx         # Unit tests
└── index.ts                # Re-export (export { Button } from './Button')
```

### Import Order

```typescript
// 1. External dependencies
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 2. Internal dependencies (using @app alias)
import { Button } from '@app/common/Button/Button';
import { useAuthStore } from '@app/features/auth/store/authStore';

// 3. Relative imports
import { LoginForm } from './LoginForm';

// 4. Types
import type { User } from '@app/features/auth/types';
```

## 🔷 TypeScript Guidelines

### Type Safety

```typescript
// ✅ Always define types for props
interface UserCardProps {
  user: User;
  onEdit: (id: string) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onEdit }) => {
  // ...
};

// ✅ Use type inference when obvious
const count = 0; // TypeScript infers number

// ❌ Avoid 'any' type
const data: any = fetchData(); // Bad

// ✅ Use 'unknown' and type guards
const data: unknown = fetchData();
if (typeof data === 'object' && data !== null) {
  // Type-safe usage
}
```

### Enums vs Union Types

```typescript
// ✅ Prefer union types for simple cases
type Theme = 'light' | 'dark';

// ✅ Use const objects for enum-like behavior
const UserRole = {
  Admin: 'admin',
  User: 'user',
} as const;

type UserRoleType = typeof UserRole[keyof typeof UserRole];
```

### Generics

```typescript
// ✅ Use generics for reusable components
interface ApiResponse<T> {
  data: T;
  status: number;
}

const fetchData = async <T,>(url: string): Promise<ApiResponse<T>> => {
  // ...
};
```

## ⚛️ React Best Practices

### Component Design

```typescript
// ✅ Use functional components with hooks
export const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    // Fetch user data
  }, []);

  return <div>{user?.name}</div>;
};

// ✅ Extract complex logic to custom hooks
const useUserData = (userId: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // Fetch logic
  }, [userId]);

  return { user, loading };
};
```

### Props Destructuring

```typescript
// ✅ Destructure props in function signature
export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary',
  onClick 
}) => {
  return <button onClick={onClick}>{children}</button>;
};

// ❌ Avoid using props object
export const Button: React.FC<ButtonProps> = (props) => {
  return <button onClick={props.onClick}>{props.children}</button>;
};
```

### Event Handlers

```typescript
// ✅ Prefix with 'handle'
const handleClick = () => { ... };
const handleSubmit = (e: FormEvent) => { ... };

// ✅ Pass callbacks as props with 'on' prefix
interface ButtonProps {
  onClick?: () => void;
  onSubmit?: (data: FormData) => void;
}
```

### Conditional Rendering

```typescript
// ✅ Use short-circuit evaluation
{isLoading && <Spinner />}

// ✅ Use ternary for if-else
{isAuthenticated ? <Dashboard /> : <Login />}

// ✅ Extract complex conditions
const shouldShowContent = isAuthenticated && hasPermission && !isLoading;
{shouldShowContent && <Content />}
```

## 🗄️ State Management

### Zustand Stores

```typescript
// ✅ Define clear interfaces
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// ✅ Use persist middleware for persistence
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: async (email, password) => {
        // Implementation
      },
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    { name: 'auth-storage' }
  )
);
```

### Local State vs Global State

```typescript
// ✅ Use local state for UI-only state
const [isOpen, setIsOpen] = useState(false);

// ✅ Use global state (Zustand) for:
// - Authentication state
// - Theme preferences
// - Language settings
// - Data shared across multiple components
```

## 🧪 Testing Standards

### Unit Tests

```typescript
// ✅ Test component behavior, not implementation
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Test File Naming

```
Component.test.tsx          # Unit tests
Component.integration.test.tsx  # Integration tests
feature.e2e.ts              # E2E tests (Playwright)
```

## 🔀 Git Workflow

### Commit Messages

Follow conventional commits:

```bash
# Format: <type>(<scope>): <subject>

feat(auth): add login functionality
fix(button): resolve click handler bug
docs(readme): update installation steps
style(header): improve responsive layout
refactor(api): simplify error handling
test(login): add integration tests
chore(deps): update dependencies
```

### Branch Naming

```bash
feature/user-authentication
fix/login-validation-error
refactor/api-error-handling
docs/contributing-guide
```

### Pull Request Checklist

- [ ] Code passes `npm run lint`
- [ ] Code passes `npm run format:check`
- [ ] All tests pass (`npm test`)
- [ ] New features have tests
- [ ] Documentation updated (if needed)
- [ ] No console.log statements (use console.warn/error if needed)

## 🚫 Common Pitfalls to Avoid

### Don't

```typescript
// ❌ Don't use 'any'
const data: any = fetchData();

// ❌ Don't mutate state directly
state.user.name = 'John'; // Bad
setState({ ...state, user: { ...state.user, name: 'John' } }); // Good

// ❌ Don't use inline styles (use Tailwind classes)
<div style={{ color: 'red' }}>Text</div>

// ❌ Don't create large components (split into smaller ones)
export const Dashboard = () => {
  // 500+ lines of code
};

// ❌ Don't ignore TypeScript errors
// @ts-ignore
const value = data.property;
```

### Do

```typescript
// ✅ Use proper types
const data: User = fetchData();

// ✅ Use immutable updates
const updatedUser = { ...user, name: 'John' };

// ✅ Use Tailwind classes
<div className="text-red-500">Text</div>

// ✅ Split into smaller components
export const Dashboard = () => {
  return (
    <>
      <DashboardHeader />
      <DashboardContent />
      <DashboardFooter />
    </>
  );
};

// ✅ Fix TypeScript errors properly
const value = data?.property ?? defaultValue;
```

## 📚 Additional Resources

- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Feature-Sliced Design](https://feature-sliced.design/)
- [Tailwind CSS Best Practices](https://tailwindcss.com/docs/reusing-styles)

---

**Remember**: Consistency is key. When in doubt, follow the existing patterns in the codebase.
