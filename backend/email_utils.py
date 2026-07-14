import os
import smtplib
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

logger = logging.getLogger(__name__)


def send_contact_notification(name: str, email: str, subject: str, message: str) -> bool:
    """Send an email notification via Gmail SMTP when a contact form is submitted."""
    host = os.environ["GMAIL_SMTP_HOST"]
    port = int(os.environ["GMAIL_SMTP_PORT"])
    smtp_user = os.environ["GMAIL_SMTP_USER"]
    smtp_password = os.environ["GMAIL_SMTP_PASSWORD"]
    use_tls = os.environ.get("GMAIL_SMTP_USE_TLS", "True") == "True"
    timeout = int(os.environ.get("GMAIL_SMTP_TIMEOUT", "30"))
    from_addr = os.environ["EMAIL_FROM_ADDRESS"]
    to_addr = os.environ["EMAIL_TO_ADDRESS"]

    html_body = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color:#3B82F6;">New Portfolio Contact Message</h2>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Subject:</strong> {subject}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap; background:#f5f5f5; padding:12px; border-radius:8px;">{message}</p>
    </div>
    """

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Portfolio Contact: {subject}"
    msg["From"] = from_addr
    msg["To"] = to_addr
    msg["Reply-To"] = email
    msg.attach(MIMEText(html_body, "html"))

    try:
        with smtplib.SMTP(host, port, timeout=timeout) as server:
            if use_tls:
                server.starttls()
            server.login(smtp_user, smtp_password)
            server.sendmail(from_addr, [to_addr], msg.as_string())
        return True
    except Exception as e:
        logger.error(f"Failed to send contact notification email: {e}")
        return False
