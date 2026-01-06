# React TypeScript Boilerplate

A comprehensive, production-ready React boilerplate with TypeScript, Tailwind CSS, authentication, internationalization, and complete testing setup.

## ✨ Features

- ⚛️ **React 19** with **TypeScript** for type-safe development
- 🎨 **Tailwind CSS** for modern, responsive styling
- 🌓 **Dark/Light Theme** with persistent preferences
- 🌍 **Internationalization** (i18n) - English & Vietnamese
- 🔐 **Authentication** with protected routes
- 📦 **Zustand** for lightweight state management
- 🔌 **Axios** with interceptors for API calls
- 🧪 **Comprehensive Testing** (Unit, Integration, E2E)
- 🎯 **ESLint + Prettier** for code quality
- 🪝 **Husky + lint-staged** for pre-commit hooks
- 🚀 **GitHub Actions CI/CD** workflow
- 📁 **Feature-Sliced Design** architecture
- ⚡ **Vite** for lightning-fast development

## 📚 Documentation

- **[Contributing Guide](CONTRIBUTING.md)** - Coding standards, naming conventions, and best practices
- **[Project Structure](PROJECT_STRUCTURE.md)** - Detailed guide on project organization and adding features
- **[Design System](DESIGN_SYSTEM.md)** - Design tokens and theming guide
- **[Responsive Design](RESPONSIVE.md)** - Responsive design patterns and breakpoints
- **[Tailwind v4 Guide](TAILWIND_V4.md)** - Tailwind CSS v4 migration and usage

## 🏗️ Architecture

This boilerplate uses **Feature-Sliced Design (FSD)** for scalable and maintainable code organization:

```
src/
├── app/                    # App-level configuration
│   ├── providers/         # Context providers
│   └── routes/            # Route configuration
├── features/              # Feature modules
│   ├── auth/             # Authentication feature
│   ├── home/             # Home page feature
│   ├── profile/          # Profile feature
│   └── settings/         # Settings feature
├── common/                # Reusable UI components
│   ├── Button/
│   ├── Input/
│   └── Card/
├── shared/                # Shared utilities
│   ├── components/       # Layout components
│   ├── stores/           # Zustand stores
│   ├── api/              # Axios configuration
│   └── i18n/             # Translations
└── tests/                # E2E tests
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or 20+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd react-boilerplate

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm start
```

The app will open at `http://localhost:3000` (or another port if 3000 is busy).

## 🔐 Mock Credentials

For testing purposes, you can login with the following default account:

- **Email**: `test@example.com`
- **Password**: `123456`

Alternatively, you can register a new account at `/register`. All user data is stored in browser's `localStorage`.

## 📝 Available Scripts

### Development

```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run unit/integration tests
npm run test:e2e   # Run Playwright E2E tests
```

### Code Quality

```bash
npm run lint       # Run ESLint
npm run lint:fix   # Fix ESLint errors
npm run format     # Format code with Prettier
npm run format:check  # Check formatting
```

## 🎨 Styling with Tailwind CSS

This boilerplate uses Tailwind CSS for styling. The configuration supports:

- **Dark mode** via `class` strategy
- **Custom colors** (primary, secondary, danger, etc.)
- **Responsive design** utilities
- **Custom fonts** (Inter from Google Fonts)

### Theme Configuration

Edit `tailwind.config.js` to customize your theme:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#6366f1',
        hover: '#4f46e5',
      },
      // Add more colors
    },
  },
}
```

### Dark Mode

Dark mode is managed via Zustand store and applies the `dark` class to the document element:

```typescript
import { useThemeStore } from '@app/shared/stores/themeStore';

const { theme, toggleTheme } = useThemeStore();
```

## 🔐 Authentication

Mock authentication is implemented using localStorage. Replace with real API calls in `src/features/auth/api/authApi.ts`.

### Usage

```typescript
import { useAuthStore } from '@app/features/auth/store/authStore';

const { user, login, logout, isAuthenticated } = useAuthStore();

// Login
await login(email, password);

// Logout
logout();
```

### Protected Routes

Use the `ProtectedRoute` component:

```typescript
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  }
/>
```

## 🌍 Internationalization (i18n)

Supports English and Vietnamese out of the box.

### Usage

```typescript
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();

return <h1>{t('home.title')}</h1>;
```

### Adding Translations

Edit translation files:
- `src/shared/i18n/locales/en.json`
- `src/shared/i18n/locales/vi.json`

### Switching Languages

```typescript
import { useLanguageStore } from '@app/shared/stores/languageStore';

const { language, setLanguage } = useLanguageStore();
setLanguage('vi'); // or 'en'
```

## 📦 State Management

Uses Zustand for lightweight, performant state management.

### Creating a Store

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MyState {
  count: number;
  increment: () => void;
}

export const useMyStore = create<MyState>()(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
    }),
    { name: 'my-storage' }
  )
);
```

## 🔌 API Configuration

Axios is configured with interceptors for authentication and error handling.

### Usage

```typescript
import axiosInstance from '@app/shared/api/axiosInstance';

const response = await axiosInstance.get('/users');
```

### Interceptors

- **Request**: Automatically adds auth token from localStorage
- **Response**: Handles 401 errors and token refresh
- **Development**: Logs requests/responses

### Endpoints

Define endpoints in `src/shared/api/endpoints.ts`:

```typescript
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
};
```

## 🧪 Testing

### Unit & Integration Tests

Uses Jest and React Testing Library:

```bash
npm test
npm test -- --coverage  # With coverage report
```

### E2E Tests

Uses Playwright:

```bash
npm run test:e2e        # Run tests
npm run test:e2e:ui     # Run with UI
```

### Writing Tests

```typescript
// Component test
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

test('renders button', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

## 🎯 Path Aliases

Use `@app/` to import from `src/`:

```typescript
import { Button } from '@app/common/Button/Button';
import { useAuthStore } from '@app/features/auth/store/authStore';
```

## 🪝 Pre-commit Hooks

Husky and lint-staged run automatically before commits:

1. **ESLint** - Checks for code errors
2. **Prettier** - Formats code
3. **Tests** - Runs relevant tests

Configure in `.lintstagedrc.json`.

## 🚀 CI/CD

GitHub Actions workflow (`.github/workflows/ci.yml`) runs on push/PR:

1. Install dependencies
2. Run ESLint
3. Run Prettier check
4. Run all tests with coverage
5. Run Playwright E2E tests

## 📁 Adding New Features

Follow the Feature-Sliced Design pattern:

```bash
src/features/my-feature/
├── components/        # Feature-specific components
├── pages/            # Feature pages
├── store/            # Zustand store
├── api/              # API methods
└── __tests__/        # Tests
```

## 🎨 Common Components

Reusable components in `src/common/`:

### Button

```typescript
<Button variant="primary" size="medium" fullWidth>
  Click me
</Button>
```

### Input

```typescript
<Input
  label="Email"
  type="email"
  placeholder="user@example.com"
  error={errors.email}
  required
/>
```

### Card

```typescript
<Card
  title="Card Title"
  description="Card description"
  footer={<Button>Action</Button>}
  interactive
>
  Card content
</Card>
```

## 🛠️ Environment Variables

Create `.env` file (see `.env.example`):

```bash
REACT_APP_API_URL=https://api.example.com
REACT_APP_ENV=development
```

## 📦 Dependencies

### Core
- React 19
- TypeScript 4.9
- React Router DOM 6
- Zustand 4

### Styling
- Tailwind CSS 3
- PostCSS
- Autoprefixer

### Forms & Validation
- React Hook Form 7
- Zod 3

### API
- Axios 1.6

### i18n
- i18next 23
- react-i18next 14

### Testing
- Jest (via CRA)
- React Testing Library 16
- Playwright 1.40

### Code Quality
- ESLint 8
- Prettier 3
- Husky 8
- lint-staged 15

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License

## 🙏 Acknowledgments

- Built with Create React App
- Styled with Tailwind CSS
- Icons from Heroicons (via SVG)
- Font: Inter from Google Fonts

---

**Happy Coding! 🚀**
