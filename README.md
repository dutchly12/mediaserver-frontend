# MediaServer Frontend

A Vue 3 + Vite + TypeScript single-page application for the Private MediaServer. It provides a UI to authenticate, browse and filter videos, view people and tags, manage profile/passkeys, and interact with the backend API.

## Key Features
- Vue 3 with `<script setup>` and TypeScript
- State management with Pinia
- Vue Router 5 for client-side routing
- Internationalization (vue-i18n) and SEO/meta handling (@unhead/vue)
- Composables-first architecture for API, pagination, layout, etc.
- Tailwind CSS 4 for styling and Reka UI components
- PWA-ready build (vite-plugin-pwa, workbox-window)

## Requirements
- Node.js 24.x
- pnpm 10.x

The exact versions are pinned in `package.json` under `engines` and `packageManager`.

## Getting Started
1. Install dependencies:
   ```sh
   pnpm install
   ```
2. Configure environment variables:
    - Copy `.env.example` to `.env.local` and adjust values as needed.
    - Required:
        - `VITE_BASE_API_URL` — base URL of the backend API (e.g., `https://api.example.com`).

3. Run the app in development mode with HMR:
   ```sh
   pnpm dev
   ```
   The dev server will print a local URL (typically `http://localhost:5173`).

## Build
- Type-check, compile, and minify for production:
  ```sh
  pnpm build
  ```
- Preview the production build locally:
  ```sh
  pnpm preview
  ```

## Useful Scripts
- Type check only:
  ```sh
  pnpm types:check
  ```
- Lint and format checks:
  ```sh
  pnpm lint:check
  pnpm format:check
  ```
- Auto-fix lint and formatting:
  ```sh
  pnpm code:fix
  ```

## Project Structure
Root (selected files):
```
.
├── apps/                      # Auxiliary workspace packages (if any)
├── public/                    # Static assets served as-is
├── src/
│   ├── app.vue                # Root application component
│   ├── main.ts                # App bootstrap (router, pinia, i18n, head)
│   ├── assets/                # Project-level assets (images, styles)
│   ├── components/            # Reusable UI building blocks
│   │   ├── app/               # App-wide shell components
│   │   ├── authentications/   # Auth-related components
│   │   ├── form/              # Form inputs, validators, etc.
│   │   ├── layouts/           # Layout wrappers
│   │   ├── profile/           # Profile/passkey components
│   │   └── video/             # Video cards, lists, etc.
│   ├── configurations/        # App configuration modules
│   │   ├── i18n.ts            # vue-i18n setup
│   │   ├── locales/           # Translation messages
│   │   ├── pinia.ts           # Pinia store registration
│   │   ├── router.ts          # Vue Router creation
│   │   ├── routes/            # Route definitions
│   │   └── unhead.ts          # @unhead/vue (head manager)
│   ├── composables/           # Reusable logic (use-*)
│   │   ├── use-api.ts         # Axios API client, typed endpoints
│   │   └── use-pagination.ts  # Pagination helpers
│   ├── lib/                   # Pure utilities and formatters
│   ├── pages/                 # Route-level views
│   │   ├── authentication/    # Sign-in (base, passkey)
│   │   ├── people/            # People listing/detail
│   │   ├── profile/           # Profile, passkey management
│   │   ├── tags/              # Tags listing/detail
│   │   ├── videos/            # Videos listing/detail
│   │   └── index.vue          # Home/landing page
│   ├── stores/                # Pinia stores (e.g., user auth store)
│   └── types/                 # Global and domain TS types
│       ├── composables/       # Types for composables
│       └── model/             # API models (authentication, user, video, ...)
├── vite.config.ts             # Vite configuration and plugins
├── tsconfig*.json             # TypeScript configurations
├── eslint.config.ts           # ESLint configuration
├── components.json            # UI generator/config (if used)
└── .env.example               # Example environment variables
```

## How It Works (high level)
- Authentication: `src/stores/user.ts` manages access/refresh tokens stored via a localstorage composable, provides base and passkey sign-in, refresh, and sign-out; user info is loaded via the API composable.
- API access: `src/composables/use-api.ts` wraps Axios and exposes typed endpoint groups (authentications, user, videos, passkey, etc.).
- Routing: `src/configurations/router.ts` and `src/configurations/routes/` define routes that render `src/pages/*` views.
- State: Pinia store(s) in `src/stores/` hold global state like user/auth and UI preferences.
- UI: Components in `src/components/*` and Tailwind CSS utility classes.

## Environment Variables
Create `.env.local` to override dev values. The following are recognized by Vite at build time (must be prefixed with `VITE_`):
- `VITE_BASE_API_URL` — Backend API base URL used by the API client.

## PWA
The project includes PWA tooling (service worker/manifest). For development, PWA features may be limited; use `pnpm build && pnpm preview` to locally test the production PWA behavior.

## Troubleshooting
- Using wrong Node/pnpm versions can cause install or build errors. Verify with:
  ```sh
  node -v && pnpm -v
  ```
- If the API requests fail, confirm `VITE_BASE_API_URL` is correct and the backend allows CORS from the dev server origin.
