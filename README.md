# Vedant Mehta — Portfolio Website

A premium, single-page portfolio website with a built-in admin CMS, built with **React (frontend)**,
**FastAPI (backend)**, and **MongoDB (database)**.

## Project Structure

```
/app
├── backend/     # FastAPI backend (API, auth, CMS content, admin scripts)
│   └── README.md   ← backend setup, run instructions, env variables
├── frontend/    # React (CRA + craco) frontend
│   └── README.md   ← frontend setup, run instructions, env variables
└── README.md    ← you are here
```

## Quick Start

Both services are managed by **supervisor** in this environment and hot-reload automatically —
you normally don't need to start them manually. If you do need to restart them:

```bash
sudo supervisorctl restart backend
sudo supervisorctl restart frontend
```

See `backend/README.md` and `frontend/README.md` for full setup details, all required
environment variables (and exactly which file/path they belong in), and how to run each
service standalone (e.g. on your own machine, outside this environment).

## What This Project Includes
- Public single-page portfolio: Hero, About, Career Journey, Education, Skills, Tech Stack,
  Featured Projects, Experience Stats, Technical Expertise (radar chart), Certifications,
  Achievements, Contact form.
- Dark / Light / System theme switching.
- Hidden admin login at `/login` — lets the site owner edit every section, add/remove cards,
  and change the profile photo, without touching code.
- Contact form → saved to MongoDB + email notification via Gmail SMTP.
- Rate limiting on contact form + login (brute-force protection).

## Credentials
See `/app/memory/test_credentials.md` for the current admin login and how to reset it.
