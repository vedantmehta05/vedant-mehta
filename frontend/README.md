# Frontend — React (CRA + craco) + Tailwind CSS

## Tech Stack
React 18, react-router-dom, Tailwind CSS (shadcn/ui-style components), Framer Motion, Recharts,
Lenis (smooth scroll), Axios.

## Prerequisites
- Node.js 18+
- Yarn (use **yarn**, not npm — this project's lockfile is yarn-based)

## Setup

```bash
cd frontend
yarn install
```

## Environment Variables

All environment variables are read from **`frontend/.env`** (same folder as `package.json`).
Create this file if it doesn't exist, with the following keys:

| Variable | Required | Description |
|---|---|---|
| `REACT_APP_BACKEND_URL` | Yes | The full base URL of the backend, e.g. `https://api.yourdomain.com` or `http://localhost:8001` for local dev. The frontend automatically appends `/api` to this for all API calls — do not include `/api` yourself. |
| `WDS_SOCKET_PORT` | Dev only | Webpack Dev Server hot-reload socket port. Set to `443` when served behind HTTPS (e.g. in this environment); omit or set to your dev port when running fully locally. |

Example `frontend/.env` (local development):
```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

Example `frontend/.env` (deployed behind HTTPS reverse proxy):
```env
REACT_APP_BACKEND_URL=https://yourdomain.com
WDS_SOCKET_PORT=443
```

> **Important:** `REACT_APP_BACKEND_URL` must match a domain that is included in the backend's
> `CORS_ORIGINS` env variable (see `backend/README.md`), otherwise API calls and admin login
> (which relies on cookies) will fail.

## Running the Frontend

**In this Emergent environment** (supervisor-managed, hot reload enabled):
```bash
sudo supervisorctl restart frontend
tail -f /var/log/supervisor/frontend.out.log   # view logs
```
The frontend always runs on port `3000` internally.

**Standalone / on your own machine:**
```bash
cd frontend
yarn start      # development server
yarn build      # production build (outputs to build/)
```

## Key Files & Folders
- `craco.config.js` — webpack override; sets `style.postcss.mode: "file"` so Tailwind actually
  compiles (do not remove/change this — plugin-injection mode silently breaks Tailwind on
  react-scripts 5 + craco 7), and the `@` import alias → `src/`
- `tailwind.config.js` / `postcss.config.js` — Tailwind + PostCSS config
- `src/App.js` — routes (`/` → portfolio, `/login` → admin login), wraps app in Theme/Auth/Content providers
- `src/pages/Portfolio.jsx` — assembles all public portfolio sections
- `src/pages/LoginPage.jsx` — hidden admin login page
- `src/components/sections/` — one component per portfolio section (Hero, About, CareerJourney, etc.)
- `src/components/ui/` — shadcn/ui-style base components (Button, Card, Dialog, Tabs, etc.)
- `src/hooks/use-auth.jsx` — admin auth state (login/logout/session check)
- `src/hooks/use-content.jsx` — fetches/updates CMS content from the backend
- `src/hooks/use-theme.jsx` — dark/light/system theme logic
- `src/lib/api.js` — Axios instance (base URL from `REACT_APP_BACKEND_URL`, attaches admin JWT)
- `src/components/SectionEditButton.jsx` — admin-only JSON editor used to edit any content section

## Notes
- All content (personal info, experience, skills, projects, etc.) is fetched live from the
  backend's `/api/content` endpoint — there is no static data file to edit for content changes.
  Use the admin CMS at `/login` instead (see root `README.md` and `backend/README.md`).
- Admin-only UI (edit buttons, photo upload, admin toolbar) is completely hidden for regular
  visitors and only appears after logging in at `/login`.
