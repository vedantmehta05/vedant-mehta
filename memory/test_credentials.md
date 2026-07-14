# Test Credentials

No authentication/login system exists on this project — it is a public single-page portfolio
website with no user accounts, admin panel, or protected routes.

## Third-party credentials in use (already configured in `/app/backend/.env`)
- Gmail SMTP (for contact form email notifications):
  - GMAIL_SMTP_HOST=smtp.gmail.com
  - GMAIL_SMTP_PORT=587
  - GMAIL_SMTP_USER / EMAIL_FROM_ADDRESS / EMAIL_TO_ADDRESS = vedantmehta350@gmail.com
  - GMAIL_SMTP_PASSWORD = (Gmail App Password, provided by user, stored in backend/.env)

## Database
- MONGO_URL=mongodb://localhost:27017
- DB_NAME=portfolio_db
- Collections: `contacts` (contact form submissions), `settings` (profile_photo filename)
