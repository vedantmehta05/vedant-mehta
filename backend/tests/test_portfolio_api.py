"""
Backend API tests for Portfolio site.
Covers: health check, profile photo GET/POST, resume download, contact form CRUD.
"""
import io
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
if not BASE_URL:
    # fallback read from frontend/.env
    with open("/app/frontend/.env") as f:
        for line in f:
            if line.startswith("REACT_APP_BACKEND_URL"):
                BASE_URL = line.strip().split("=", 1)[1].rstrip("/")

API = f"{BASE_URL}/api"


@pytest.fixture
def session():
    s = requests.Session()
    yield s
    s.close()


class TestHealth:
    def test_health_check(self, session):
        r = session.get(f"{API}/health", timeout=15)
        assert r.status_code == 200
        assert r.json() == {"status": "ok"}


class TestProfilePhoto:
    def test_get_photo(self, session):
        r = session.get(f"{API}/profile/photo", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert "photo_url" in data
        assert data["photo_url"].startswith("/api/uploads/")

    def test_photo_url_is_reachable(self, session):
        r = session.get(f"{API}/profile/photo", timeout=15)
        photo_url = r.json()["photo_url"]
        full_url = f"{BASE_URL}{photo_url}"
        img_resp = session.get(full_url, timeout=15)
        assert img_resp.status_code == 200
        assert img_resp.headers.get("content-type", "").startswith("image/")

    def test_upload_photo_png(self, session):
        # Use a tiny valid PNG (1x1 pixel) for upload test
        png_bytes = bytes.fromhex(
            "89504e470d0a1a0a0000000d494844520000000100000001080600000"
            "01f15c4890000000a49444154789c6360000002000155e621bb0000000049454e44ae426082"
        )
        files = {"file": ("test.png", png_bytes, "image/png")}
        r = session.post(f"{API}/profile/photo", files=files, timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "photo_url" in data
        assert data["photo_url"].startswith("/api/uploads/")

        # verify GET now returns the new photo
        get_r = session.get(f"{API}/profile/photo", timeout=15)
        assert get_r.json()["photo_url"] == data["photo_url"]

    def test_upload_photo_invalid_type_rejected(self, session):
        files = {"file": ("test.txt", b"not an image", "text/plain")}
        r = session.post(f"{API}/profile/photo", files=files, timeout=15)
        assert r.status_code == 400
        assert "detail" in r.json()


class TestResumeDownload:
    def test_download_resume(self, session):
        r = session.get(f"{API}/resume/download", timeout=15)
        assert r.status_code == 200
        assert r.headers.get("content-type") == "application/pdf"
        assert len(r.content) > 100


class TestContact:
    def test_create_contact_message_and_verify_persistence(self, session):
        payload = {
            "name": "TEST_Automation Tester",
            "email": "test_automation@example.com",
            "subject": "TEST_Automated QA Message",
            "message": "This is a test message sent by the automated test suite.",
        }
        r = session.post(f"{API}/contact", json=payload, timeout=20)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["subject"] == payload["subject"]
        assert data["message"] == payload["message"]
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0

        # verify via GET list that it was persisted
        list_r = session.get(f"{API}/contact", timeout=15)
        assert list_r.status_code == 200
        messages = list_r.json()
        assert any(m["email"] == payload["email"] and m["subject"] == payload["subject"] for m in messages)

    def test_create_contact_missing_field_returns_422(self, session):
        payload = {
            "name": "TEST_Missing Field",
            "email": "test_missing@example.com",
            # subject missing
            "message": "Message without subject",
        }
        r = session.post(f"{API}/contact", json=payload, timeout=15)
        assert r.status_code == 422

    def test_create_contact_invalid_email_returns_422(self, session):
        payload = {
            "name": "TEST_Invalid Email",
            "email": "not-an-email",
            "subject": "Test",
            "message": "Test message",
        }
        r = session.post(f"{API}/contact", json=payload, timeout=15)
        assert r.status_code == 422

    def test_list_contact_messages(self, session):
        r = session.get(f"{API}/contact", timeout=15)
        assert r.status_code == 200
        assert isinstance(r.json(), list)
