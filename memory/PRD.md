# Vedant Mehta — Premium Portfolio Website

## Original Problem Statement
Build a world-class, futuristic, premium, single-page personal portfolio website for a highly
skilled Software Engineer, combining Apple minimalism, Linear.app aesthetics, Vercel UI, Framer
animations, Stripe gradients, glassmorphism, and Awwwards-quality interactions. Dark/Light/System
theme support required. All 13 sections from the spec must be populated with REAL resume data
extracted from the user's LinkedIn PDF — no placeholder/dummy content.

## User
Vedant Mehta — Senior Software Engineer at AdeptNova Ltd., Ahmedabad, India. Python/FastAPI
backend engineer specializing in AI/LLMs, Cloud (AWS), and Blockchain (Solidity).

## User Choices
1. Tech stack: React (CRA + craco) + FastAPI + MongoDB
2. Real profile photo provided + admin-only "change photo" upload feature
3. Contact form: save to MongoDB AND send email notification via **Gmail SMTP**
4. Projects: no GitHub/live demo links shown (resume has none)
5. No calendar booking button
6. No testimonials section (no real data available)
7. **[Iteration 3]** Full admin CMS: hidden `/login`, JWT auth, single superadmin (seeded via
   backend script), edit-mode for every content section (add/edit/delete cards via JSON editor),
   photo upload restricted to admin only
8. **[Iteration 3]** Rate limiting on contact form + login lockout
9. **[Iteration 3]** External "Portfolio" (gamma.site) link removed everywhere — this site is now
   the sole canonical portfolio
10. **[Iteration 3]** Copy elevated to "Backend Architect & Systems Strategist" positioning

## Architecture
- **Frontend**: React 18 (CRA + craco 7), react-router-dom (routes: `/`, `/login`), Tailwind CSS
  (shadcn/ui pattern components), Framer Motion, Recharts (radar chart), Lenis (smooth scroll).
  - GOTCHA: craco.config.js must use `style.postcss.mode: 'file'` for Tailwind to compile.
  - GOTCHA: never put `[&_button]:text-*` style overrides on a wrapper that contains a portal-less
    dropdown (leaks into dropdown option buttons and makes text invisible).
  - GOTCHA: a `overflow-hidden` wrapper around the navbar clips any absolutely-positioned dropdown
    rendered inside it — clip only a dedicated inner layer, not the whole nav container.
- **Backend**: FastAPI, Motor (async MongoDB, `tz_aware=True` — required for datetime comparisons
  against lockout timestamps), Gmail SMTP (smtplib), PyJWT + bcrypt (auth), slowapi (rate limiting,
  keyed by `X-Forwarded-For` header since the ingress doesn't preserve a stable `request.client.host`).
- **CMS**: All portfolio content lives in MongoDB (`content` collection, single doc, key="portfolio")
  — seeded once from `seed_content.py` on first startup. Admin edits go through a generic JSON-editor
  dialog (`SectionEditButton.jsx`) calling `PUT /api/content/{section}` — gives full add/edit/delete
  card control without needing a bespoke form per content type.
- **Auth**: Single superadmin, seeded from `backend/.env` (`ADMIN_EMAIL`/`ADMIN_PASSWORD`) on
  startup. JWT via httpOnly cookie + Bearer token fallback (localStorage). Standalone CLI script
  `backend/scripts/manage_admin.py` for create/reset-password/list (run manually by the owner).
  Login lockout: 5 failed attempts → 15 min lockout (per IP+email).

## What's Been Implemented
**Iteration 1-2 (static site):** Full single-page site — Hero, About, Career Journey, Education,
Skills, Tech Stack, Featured Projects, Experience Highlights, Technical Expertise (radar chart),
Certifications, Achievements, Contact. Floating glass navbar, dark/light/system theme, cursor glow,
magnetic buttons, particle field, custom animations throughout.

**Iteration 3 (CMS + auth + polish):**
- Hidden `/login` route, JWT admin auth, full CMS edit-mode (all 11 content sections editable,
  add/delete cards via JSON editor), admin-only profile photo upload with automatic old-file cleanup
- Rate limiting: contact form (5/hour/IP), login (5 attempts → 15min lockout)
- Removed external portfolio link everywhere; elevated copy to "Backend Architect & Systems
  Strategist" positioning; added subtle blueprint-grid hero background accent
- Fixed 2 bugs: navbar theme-dropdown was invisible (CSS selector leak + overflow-hidden clipping),
  Expertise radar chart axis labels invisible in some themes (switched to direct SVG fill attribute)
- Fixed: naive/aware datetime crash (motor client `tz_aware=True`), unreliable rate-limit IP
  detection (switched to `X-Forwarded-For` header parsing)
- Toast notifications repositioned to top-right to avoid overlapping the bottom-right admin toolbar;
  admin toolbar made responsive/compact on mobile

## Testing Status
- Backend: 100% pass across all iterations (health, photo upload/validation/cleanup, resume download,
  contact create/persist/list/validation/rate-limit, auth login/lockout/logout/me, content CRUD).
- Frontend: 100% pass. All admin CMS flows verified end-to-end (login → edit → validate → persist →
  photo upload → logout → session persistence). Both bugs from testing feedback fixed and re-verified.
  Minor toast/toolbar overlap issue fixed proactively after testing feedback.

## Prioritized Backlog (not yet built)
- P2: Testimonials section (if user provides real client/colleague quotes later)
- P3: GitHub link/repos (if user creates a GitHub profile later)
- P3: Calendar booking button (if user provides a Calendly-style link later)
- P3: Multi-admin management UI (currently CLI-only via manage_admin.py — sufficient for single-owner use)

## Next Action Items
- None blocking — full CMS-backed portfolio with admin auth is live and fully functional.
