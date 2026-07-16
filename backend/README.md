# Backend — FastAPI + MongoDB

## Tech Stack
FastAPI, Motor (async MongoDB driver), PyJWT + bcrypt (auth), slowapi (rate limiting), smtplib
(Gmail SMTP for contact-form email notifications).

## Prerequisites
- Python 3.11+
- MongoDB running and reachable (local or remote)

## Setup

```bash
cd backend
pip install -r requirements.txt
```

## Environment Variables

All environment variables are read from **`backend/.env`** (same folder as `server.py`).
Create this file if it doesn't exist, with the following keys:

| Variable | Required | Description |
|---|---|---|
| `MONGO_URL` | Yes | MongoDB connection string, e.g. `mongodb://localhost:27017` |
| `DB_NAME` | Yes | MongoDB database name, e.g. `portfolio_db` |
| `CORS_ORIGINS` | Yes | Comma-separated list of allowed frontend origins, e.g. `https://yourdomain.com`. Must match the actual domain the frontend is served from (needed for auth cookies to work). |
| `JWT_SECRET` | Yes | Random secret string used to sign admin JWT tokens. Generate one with: `python3 -c "import secrets; print(secrets.token_hex(32))"` |
| `ADMIN_EMAIL` | Yes | Email for the single superadmin account. Seeded automatically into MongoDB on backend startup. |
| `ADMIN_PASSWORD` | Yes | Password for the superadmin account. Only used to seed/reset the account on startup — the password itself is bcrypt-hashed before being stored in MongoDB, never saved in plain text. |
| `GMAIL_SMTP_HOST` | Yes (for contact form emails) | e.g. `smtp.gmail.com` |
| `GMAIL_SMTP_PORT` | Yes | e.g. `587` |
| `GMAIL_SMTP_USER` | Yes | The Gmail address used to send notifications |
| `GMAIL_SMTP_PASSWORD` | Yes | A Gmail **App Password** (not your normal Gmail password) — generate one at https://myaccount.google.com/apppasswords |
| `GMAIL_SMTP_USE_TLS` | Yes | `True` or `False` |
| `GMAIL_SMTP_USE_SSL` | Yes | `True` or `False` |
| `GMAIL_SMTP_TIMEOUT` | Yes | SMTP timeout in seconds, e.g. `30` |
| `EMAIL_FROM_ADDRESS` | Yes | The "From" address on contact-form notification emails |
| `EMAIL_TO_ADDRESS` | Yes | The address that receives contact-form notification emails (usually the site owner's email) |

Example `backend/.env`:
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=portfolio_db
CORS_ORIGINS=https://yourdomain.com
JWT_SECRET=your-random-64-char-hex-secret
ADMIN_EMAIL=you@example.com
ADMIN_PASSWORD=YourStrongPassword123
GMAIL_SMTP_HOST=smtp.gmail.com
GMAIL_SMTP_PORT=587
GMAIL_SMTP_USER=you@gmail.com
GMAIL_SMTP_PASSWORD=your-gmail-app-password
GMAIL_SMTP_USE_TLS=True
GMAIL_SMTP_USE_SSL=False
GMAIL_SMTP_TIMEOUT=30
EMAIL_FROM_ADDRESS=you@gmail.com
EMAIL_TO_ADDRESS=you@gmail.com
```

> **Never commit `.env` to version control.** It contains secrets (JWT signing key, admin
> password, Gmail app password).

## Running the Backend

**In this Emergent environment** (supervisor-managed, hot reload enabled):
```bash
sudo supervisorctl restart backend
tail -f /var/log/supervisor/backend.err.log   # view logs
```
The backend always runs on `0.0.0.0:8001` internally. All routes are prefixed with `/api`.

**Standalone / on your own machine:**
```bash
cd backend
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

## Admin Account Management

A single superadmin is auto-seeded on startup from `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env`.
To create additional admins, reset a password, or list existing admins without redeploying,
use the CLI script:

```bash
cd backend
python3 scripts/manage_admin.py create --email you@example.com --password "YourPassword123"
python3 scripts/manage_admin.py reset-password --email you@example.com --password "NewPassword456"
python3 scripts/manage_admin.py list
```

This script reads `MONGO_URL`/`DB_NAME` from `backend/.env` and hashes passwords with bcrypt
before storing them — the same mechanism the running app uses.

## Key Files
- `server.py` — FastAPI app, all API routes (`/api/...`)
- `auth.py` — JWT creation/verification, password hashing, admin seeding
- `database.py` — MongoDB collections (contacts, settings, admins, content, login_attempts)
- `models.py` — Pydantic models
- `email_utils.py` — Gmail SMTP sending logic for contact-form notifications
- `seed_content.py` — one-time initial CMS content seed (only runs if MongoDB is empty)
- `scripts/manage_admin.py` — standalone admin credential management CLI
- `uploads/` — uploaded profile photos (auto-created)
- `assets/` — static files served by the API, e.g. the downloadable resume PDF

## API Overview
All routes are prefixed with `/api`.

| Route | Method | Auth | Description |
|---|---|---|---|
| `/api/health` | GET | none | Health check |
| `/api/auth/login` | POST | none (rate-limited) | Admin login, sets JWT cookie + returns token |
| `/api/auth/logout` | POST | admin | Clears auth cookies |
| `/api/auth/me` | GET | admin | Returns current admin info |
| `/api/content` | GET | none | Returns full CMS content (all portfolio sections) |
| `/api/content/{section}` | PUT | admin | Updates one content section |
| `/api/profile/photo` | GET | none | Returns current profile photo URL |
| `/api/profile/photo` | POST | admin | Uploads a new profile photo (old one auto-deleted) |
| `/api/resume/download` | GET | none | Downloads the resume PDF |
| `/api/contact` | POST | none (rate-limited, 5/hour/IP) | Submits a contact form message |
| `/api/contact` | GET | admin | Lists all contact form submissions |
