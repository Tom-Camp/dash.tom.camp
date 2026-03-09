# data-ui

A React Router v7 full-stack app for displaying IoT/sensor data dashboards (chicken coop monitoring, germinator, etc.).

## Stack

- **Framework**: React Router v7 (SSR enabled)
- **UI**: React 19, TailwindCSS v4
- **Charts**: Recharts
- **Icons**: react-icons
- **Language**: TypeScript
- **Build**: Vite
- **Dev server**: `npm run dev` (port 5173)

## Commands

```bash
npm run dev        # Start dev server with HMR
npm run build      # Production build
npm run typecheck  # Type check (react-router typegen + tsc)
```

## Project Structure

```
app/
  components/     # Shared components (Card, Navbar, CoopHeader, charts)
  routes/
    home/         # Home/landing page
    nulay/        # NuLay coop monitoring dashboard
    germinator/   # Germinator dashboard
  types.ts        # Shared TypeScript types
  utils/          # Utility functions
data/             # Local data files
```

## Pre-commit Hooks

Uses `pre-commit` with:
- trailing-whitespace, end-of-file-fixer, check-yaml, check-added-large-files
- ESLint (eslint@8.56.0) on JS/TS files
- TypeScript type check (`tsc --noEmit`) on TS/TSX files

All pre-commit checks must pass before committing.

## Conventions

- Components use `.tsx`, utilities use `.ts`
- Tailwind for all styling
- Route files at `app/routes/<name>/index.tsx`
- Chart components follow naming pattern: `Coop<Type>Chart.tsx`
