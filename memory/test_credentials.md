# Test Credentials

## Admin / CMS Login (hidden route)
- URL: `/login` (no visible nav link — must navigate directly by URL)
- Email: `vedant.signup@gmail.com`
- Password: `MasterCodder23#*`
- Seeded automatically on backend startup from `backend/.env` (`ADMIN_EMAIL` / `ADMIN_PASSWORD`).
- To create additional admins or reset the password, run on the backend:
  ```
  cd /app/backend
  python3 scripts/manage_admin.py create --email you@example.com --password "YourPass123"
  python3 scripts/manage_admin.py reset-password --email you@example.com --password "NewPass456"
  python3 scripts/manage_admin.py list
  ```
- Auth mechanism: JWT (httpOnly cookie + Bearer token fallback in localStorage `admin_token`).
- Login lockout: 5 failed attempts (per IP + email) locks out for 15 minutes.
- Visitors (not logged in) never see edit controls, the photo-upload camera button, or the admin toolbar
  — these only appear after logging in at `/login`.

## Third-party credentials in use (already configured in `/app/backend/.env`)
- Gmail SMTP (for contact form email notifications):
  - GMAIL_SMTP_HOST=smtp.gmail.com
  - GMAIL_SMTP_PORT=587
  - GMAIL_SMTP_USER / EMAIL_FROM_ADDRESS / EMAIL_TO_ADDRESS = vedantmehta350@gmail.com
  - GMAIL_SMTP_PASSWORD = (Gmail App Password, provided by user, stored in backend/.env)

## Database
- MONGO_URL=mongodb://localhost:27017
- DB_NAME=portfolio_db
- Collections: `contacts` (contact form submissions), `settings` (profile_photo filename),
  `admins` (superadmin accounts), `content` (single CMS document, key="portfolio", holds every
  section: personal, about, experience, education, skillCategories, techStack, projects, stats,
  expertiseRadar, certifications, achievements), `login_attempts` (brute-force lockout tracking).
