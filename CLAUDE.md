# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

See also [AGENTS.md](AGENTS.md) — it contains the Expo rules (SDK 58: check versioned docs at `https://docs.expo.dev/versions/v58.0.0/` rather than relying on memory; use `npx expo install` for packages; never hand-edit generated `ios/`/`android/`).

## Commands

npm is the package manager (`package-lock.json`). There is no test runner configured.

```bash
npx expo start          # dev server (also: npm run ios / android / web)
npm run lint            # expo lint (ESLint flat config, eslint-config-expo)
npx tsc --noEmit        # typecheck (strict) — run together with lint before finishing a task
```

## Architecture

SafeCore mobile is a companion app to the SafeCore web (Next.js + Prisma + Supabase, separate repo). It is currently UI-only: **no API/auth layer exists yet** — course data is static in `src/constants/`. Planned: mobile → Next.js API (`/api/mobile/*`), never directly to Supabase; access only for customers who bought a course (Z, S or P) on the web; email+password login only; no purchase flow in-app (course detail opens the web purchase page via `expo-web-browser`; may need removal if App Store/Play review objects).

- **Routing** (Expo Router, `typedRoutes` + React Compiler enabled in `app.json`): `src/app/_layout.tsx` is a headerless Stack with `index` (welcome) and `(tabs)`. Tabs are `home`, `tests`, `license`, `profile`. Other screens (`courses/`, `courses/[id]`, `firearm-license`, `sbs-license`) are pushed on the root stack.
- **Route files are thin wrappers**; real screens live in `src/components/screens/` (e.g. `CourseDetailScreen`, `HomeScreen`). Shared form logic is one component, `src/components/forms/LicenseFormScreen.tsx`, parametrized by config.
- **Data/config-driven UI**: course lists, details (subjects, hours, `webUrl`), home sections and license form configs are in `src/constants/` (`courses.tsx`, `course-details.ts`, `prep-courses.ts`, `home.tsx`, `license-forms.ts`). Adding a course/form type means adding config, not a new screen. Types go in `src/types/`, validation (zod + react-hook-form) in `src/validation/`, helpers in `src/utils/`.
- **Theming**: two systems coexist — template `Colors`/`useTheme` in `src/constants/theme.ts` (light/dark), and the app's brand `Palette` in `src/constants/palette.ts` used by current screens and tab bar.
- **Platform files**: `.web.tsx` / `.web.ts` variants (`app-tabs.web.tsx`, `animated-icon.web.tsx`, `use-color-scheme.web.ts`) override native ones.
- Path alias: `@/*` → `src/*`, `@/assets/*` → `assets/*`.

## Conventions

- Each component in its own file; types in `src/types/`; form/config values in `src/constants/`; don't duplicate screens — share a component.
- UI copy is Slovak.
