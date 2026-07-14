# Vedant Mehta — Premium Portfolio Website

## Original Problem Statement
Build a world-class, futuristic, premium, single-page personal portfolio website for a highly
skilled Software Engineer, combining Apple minimalism, Linear.app aesthetics, Vercel UI, Framer
animations, Stripe gradients, glassmorphism, and Awwwards-quality interactions. Dark/Light/System
theme support required. All 13 sections from the spec (Hero, About, Career Journey, Education,
Skills, Tech Stack, Projects, Stats, Expertise, Certifications, Achievements, Contact, Nav) must
be populated with REAL resume data extracted from the user's LinkedIn PDF — no placeholder/dummy
content.

## User
Vedant Mehta — Senior Software Engineer at AdeptNova Ltd., Ahmedabad, India. Python/FastAPI
backend engineer specializing in AI/LLMs, Cloud (AWS), and Blockchain (Solidity).

## User Choices (gathered upfront)
1. Tech stack: React (CRA + craco) + FastAPI + MongoDB (not Next.js)
2. Real profile photo provided (uploaded) + "change photo" upload feature required
3. Contact form: save to MongoDB AND send email notification via **Gmail SMTP** (user provided
   Gmail app password directly, not Resend/SendGrid)
4. Projects: no GitHub/live demo links shown (resume has none — intentional, not a bug)
5. No calendar booking button (explicitly skipped)
6. Testimonials section intentionally omitted — no real testimonial data in resume

## Architecture
- **Frontend**: React 18 (CRA + craco 7), Tailwind CSS (shadcn/ui pattern components), Framer
  Motion, Recharts (radar chart), Lenis (smooth scroll), lucide-react icons.
  - IMPORTANT GOTCHA: craco.config.js must use `style.postcss.mode: 'file'` (not plugin
    injection via `style.postcss.plugins`) for Tailwind to actually compile under
    react-scripts 5 + craco 7. Plugin-injection mode silently no-ops (concats to CRA's default
    postcss-preset-env pipeline in a way that leaves `@tailwind` directives unprocessed).
- **Backend**: FastAPI, Motor (async MongoDB), Gmail SMTP (smtplib) for contact notifications.
- **Data**: All resume content centralized in `/app/frontend/src/data/resumeData.js` — sourced
  100% from the user's LinkedIn PDF export, no fabricated data. Fields left blank where resume
  was silent (e.g. certification issue dates, some award issuers, GitHub link).

## What's Been Implemented (as of Jul 2026)
- Full single-page site: Hero (typing effect, particles, avatar w/ change-photo upload, resume
  download, social links), About, Career Journey (vertical timeline, 5 roles, current-role glow),
  Education (4 cards), Skills (10 categories, animated progress bars), Tech Stack (marquee),
  Featured Projects (4 cards, expandable dialog), Experience Highlights (6 animated stat
  counters), Technical Expertise (Recharts radar chart + percentage cards), Certifications (5
  cards), Achievements (6 cards), Contact (form + info cards + resume download).
- Floating glass navbar: smooth scroll, active-section highlight, scroll-progress bar, mobile
  hamburger menu, theme toggle (dark/light/system, localStorage-persisted).
- Backend API: `/api/profile/photo` (GET/POST upload), `/api/resume/download` (serves real PDF),
  `/api/contact` (POST saves to Mongo + background-task Gmail SMTP email, GET lists).
- Custom cursor glow, magnetic buttons, staggered scroll-reveal animations, gradient text/orbs,
  noise overlay, glassmorphism cards throughout — both themes contrast-audited.

## Testing Status
- Backend: 10/10 pytest cases passed (100%) — health, photo upload/validation, resume download,
  contact create/persist/list/validation.
- Frontend: 100% pass after fixing 1 critical bug (navbar was mis-centered due to Framer Motion
  overriding Tailwind's `-translate-x-1/2`, blocking theme toggle + mobile menu on all
  viewports — fixed via `inset-x-0 mx-auto` centering). Full regression + dark/light contrast
  audit, stats counters, radar chart, certifications/achievements, contact form → MongoDB
  end-to-end, cursor glow, mobile responsive — all verified working.

## Prioritized Backlog (not yet built)
- P1: Rate-limiting on POST /api/contact (noted by testing agent — spam/SMTP-flood risk)
- P2: Cleanup job for orphaned profile photo uploads in `/app/backend/uploads`
- P2: Testimonials section (if user later provides real client/colleague quotes)
- P3: GitHub link/repos (if user creates a GitHub profile later)
- P3: Calendar booking button (if user provides a Calendly-style link later)

## Next Action Items
- None blocking — site is live and fully functional. Awaiting user review/feedback.
