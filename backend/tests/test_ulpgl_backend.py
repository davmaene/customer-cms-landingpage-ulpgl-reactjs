"""ULPGL Backend API Test Suite
Tests for auth, contents (CRUD + workflow), faculties, search, newsletter, contact, dashboard.
"""
import os
import time
import requests
import pytest

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://academic-nexus-48.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"

ADMIN = {"email": "admin@ulpgl.net", "password": "Admin@2026"}
PUBLISHER = {"email": "publisher@ulpgl.net", "password": "Publisher@2026"}


# ---------- fixtures ----------
@pytest.fixture(scope="session")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="session")
def admin_token(session):
    r = session.post(f"{API}/auth/login", json=ADMIN, timeout=15)
    assert r.status_code == 200, f"admin login failed: {r.status_code} {r.text}"
    return r.json()["token"]


@pytest.fixture(scope="session")
def publisher_token(session):
    r = session.post(f"{API}/auth/login", json=PUBLISHER, timeout=15)
    assert r.status_code == 200, f"publisher login failed: {r.status_code} {r.text}"
    return r.json()["token"]


def H(token):
    return {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}


# ---------- health ----------
class TestHealth:
    def test_health(self, session):
        r = session.get(f"{API}/health", timeout=10)
        assert r.status_code == 200
        assert r.json().get("status") == "healthy"


# ---------- auth ----------
class TestAuth:
    def test_login_admin(self, session):
        r = session.post(f"{API}/auth/login", json=ADMIN)
        assert r.status_code == 200
        data = r.json()
        assert "token" in data and isinstance(data["token"], str)
        assert data["user"]["email"] == ADMIN["email"]
        assert data["user"]["role"] == "super_admin"
        assert "password" not in data["user"]

    def test_login_publisher(self, session):
        r = session.post(f"{API}/auth/login", json=PUBLISHER)
        assert r.status_code == 200
        data = r.json()
        assert data["user"]["role"] == "faculty_publisher"

    def test_login_invalid(self, session):
        r = session.post(f"{API}/auth/login", json={"email": "admin@ulpgl.net", "password": "wrong"})
        assert r.status_code == 401

    def test_login_missing_fields(self, session):
        r = session.post(f"{API}/auth/login", json={"email": "x@x.com"})
        assert r.status_code == 400

    def test_me_with_token(self, session, admin_token):
        r = session.get(f"{API}/auth/me", headers=H(admin_token))
        assert r.status_code == 200
        assert r.json()["user"]["email"] == ADMIN["email"]

    def test_me_without_token(self, session):
        r = session.get(f"{API}/auth/me")
        assert r.status_code == 401


# ---------- faculties ----------
class TestFaculties:
    def test_list_faculties(self, session):
        r = session.get(f"{API}/faculties")
        assert r.status_code == 200
        items = r.json()["items"]
        assert isinstance(items, list)
        assert len(items) >= 1, "seed should create faculties"
        # Each should include filieres
        assert "filieres" in items[0]
        assert "slug" in items[0]

    def test_faculty_detail(self, session):
        r = session.get(f"{API}/faculties")
        slug = r.json()["items"][0]["slug"]
        r2 = session.get(f"{API}/faculties/{slug}")
        assert r2.status_code == 200
        assert r2.json()["item"]["slug"] == slug

    def test_faculty_not_found(self, session):
        r = session.get(f"{API}/faculties/does-not-exist-xyz")
        assert r.status_code == 404


# ---------- contents ----------
class TestContents:
    def test_list_contents_published(self, session):
        r = session.get(f"{API}/contents")
        assert r.status_code == 200
        items = r.json()["items"]
        assert isinstance(items, list)
        for it in items:
            assert it["status"] == "published"

    def test_filter_contents_by_type(self, session):
        r = session.get(f"{API}/contents", params={"type": "event"})
        assert r.status_code == 200
        for it in r.json()["items"]:
            assert it["type"] == "event"

    def test_publisher_creates_pending(self, session, publisher_token):
        payload = {
            "type": "article",
            "title": f"TEST_Article_Publisher_{int(time.time())}",
            "content": "Contenu de test publié par publisher",
            "excerpt": "Resume",
            "category": "Test",
        }
        r = session.post(f"{API}/contents", json=payload, headers=H(publisher_token))
        assert r.status_code == 201, r.text
        item = r.json()["item"]
        assert item["status"] == "pending"
        assert item["title"] == payload["title"]
        # Persistence check via admin endpoint
        return item["id"]

    def test_admin_creates_published(self, session, admin_token):
        payload = {
            "type": "article",
            "title": f"TEST_Article_Admin_{int(time.time())}",
            "content": "Contenu admin",
        }
        r = session.post(f"{API}/contents", json=payload, headers=H(admin_token))
        assert r.status_code == 201
        item = r.json()["item"]
        assert item["status"] == "published"
        assert item["publishedAt"] is not None
        # Verify it appears in public listing
        slug = item["slug"]
        r2 = session.get(f"{API}/contents/slug/{slug}")
        assert r2.status_code == 200

    def test_approve_workflow(self, session, publisher_token, admin_token):
        # Publisher creates pending
        payload = {
            "type": "activity",
            "title": f"TEST_Pending_Approve_{int(time.time())}",
            "content": "À approuver",
        }
        r = session.post(f"{API}/contents", json=payload, headers=H(publisher_token))
        assert r.status_code == 201
        cid = r.json()["item"]["id"]
        # Admin approves
        r2 = session.post(f"{API}/contents/{cid}/approve", headers=H(admin_token))
        assert r2.status_code == 200
        assert r2.json()["item"]["status"] == "published"

    def test_reject_workflow(self, session, publisher_token, admin_token):
        payload = {
            "type": "event",
            "title": f"TEST_Pending_Reject_{int(time.time())}",
            "content": "À rejeter",
        }
        r = session.post(f"{API}/contents", json=payload, headers=H(publisher_token))
        assert r.status_code == 201
        cid = r.json()["item"]["id"]
        r2 = session.post(
            f"{API}/contents/{cid}/reject",
            json={"reason": "Hors sujet"},
            headers=H(admin_token),
        )
        assert r2.status_code == 200
        body = r2.json()["item"]
        assert body["status"] == "rejected"
        assert body["rejectionReason"] == "Hors sujet"

    def test_publisher_cannot_approve(self, session, publisher_token, admin_token):
        # admin creates pending-like by creating a publisher one
        payload = {
            "type": "article",
            "title": f"TEST_Forbidden_Approve_{int(time.time())}",
            "content": "x",
        }
        r = session.post(f"{API}/contents", json=payload, headers=H(publisher_token))
        cid = r.json()["item"]["id"]
        r2 = session.post(f"{API}/contents/{cid}/approve", headers=H(publisher_token))
        assert r2.status_code == 403


# ---------- search ----------
class TestSearch:
    def test_search_basic(self, session):
        r = session.get(f"{API}/search", params={"q": "ulpgl"})
        assert r.status_code == 200
        d = r.json()
        assert "contents" in d and "faculties" in d and "filieres" in d

    def test_search_empty(self, session):
        r = session.get(f"{API}/search", params={"q": ""})
        assert r.status_code == 200
        assert r.json() == {"contents": [], "faculties": [], "filieres": []}

    def test_search_faculty_term(self, session):
        # 'sciences' should match at least the Sciences faculty from seed
        r = session.get(f"{API}/search", params={"q": "sciences"})
        assert r.status_code == 200
        assert len(r.json()["faculties"]) >= 1


# ---------- newsletter ----------
class TestNewsletter:
    def test_subscribe(self, session, admin_token):
        email = f"test_newsletter_{int(time.time())}@example.com"
        r = session.post(f"{API}/newsletter", json={"email": email})
        assert r.status_code == 200
        assert r.json()["ok"] is True
        # Verify persistence via admin
        r2 = session.get(f"{API}/newsletter", headers=H(admin_token))
        assert r2.status_code == 200
        emails = [n["email"] for n in r2.json()["items"]]
        assert email in emails

    def test_subscribe_invalid_email(self, session):
        r = session.post(f"{API}/newsletter", json={"email": "not-an-email"})
        assert r.status_code == 400

    def test_subscribe_duplicate(self, session):
        email = f"dup_{int(time.time())}@example.com"
        r1 = session.post(f"{API}/newsletter", json={"email": email})
        r2 = session.post(f"{API}/newsletter", json={"email": email})
        assert r1.status_code == 200 and r2.status_code == 200


# ---------- contact ----------
class TestContact:
    def test_contact_create(self, session, admin_token):
        payload = {
            "name": "TEST_User",
            "email": f"test_contact_{int(time.time())}@example.com",
            "subject": "Test subject",
            "message": "Test message body",
        }
        r = session.post(f"{API}/contact", json=payload)
        assert r.status_code == 201
        mid = r.json()["item"]["id"]
        # Admin retrieves
        r2 = session.get(f"{API}/contact", headers=H(admin_token))
        assert r2.status_code == 200
        ids = [m["id"] for m in r2.json()["items"]]
        assert mid in ids

    def test_contact_missing_fields(self, session):
        r = session.post(f"{API}/contact", json={"name": "x"})
        assert r.status_code == 400


# ---------- dashboard ----------
class TestDashboard:
    def test_stats_admin(self, session, admin_token):
        r = session.get(f"{API}/dashboard/stats", headers=H(admin_token))
        assert r.status_code == 200
        d = r.json()
        for k in ["total", "pending", "published", "rejected", "newsletters", "messages"]:
            assert k in d
            assert isinstance(d[k], int)

    def test_stats_publisher(self, session, publisher_token):
        r = session.get(f"{API}/dashboard/stats", headers=H(publisher_token))
        assert r.status_code == 200
        # Publisher should see 0 newsletters/messages
        assert r.json()["newsletters"] == 0
        assert r.json()["messages"] == 0

    def test_stats_unauthorized(self, session):
        r = session.get(f"{API}/dashboard/stats")
        assert r.status_code == 401


# ---------- users (admin) ----------
class TestUsers:
    def test_list_users_admin(self, session, admin_token):
        r = session.get(f"{API}/users", headers=H(admin_token))
        assert r.status_code == 200
        items = r.json()["items"]
        assert any(u["email"] == ADMIN["email"] for u in items)
        # passwords must not leak
        for u in items:
            assert "password" not in u

    def test_list_users_publisher_forbidden(self, session, publisher_token):
        r = session.get(f"{API}/users", headers=H(publisher_token))
        assert r.status_code == 403


# ---------- cloudinary (iteration 2) ----------
class TestCloudinary:
    def test_config_admin(self, session, admin_token):
        r = session.get(f"{API}/cloudinary/config", headers=H(admin_token))
        assert r.status_code == 200
        data = r.json()
        assert "configured" in data
        # Keys not yet provided
        assert data["configured"] is False

    def test_config_requires_auth(self, session):
        r = session.get(f"{API}/cloudinary/config")
        assert r.status_code == 401

    def test_signature_returns_503_when_not_configured(self, session, admin_token):
        r = session.get(f"{API}/cloudinary/signature", headers=H(admin_token))
        # Expected because Cloudinary keys not yet provided
        assert r.status_code == 503
        assert "message" in r.json()

    def test_signature_requires_auth(self, session):
        r = session.get(f"{API}/cloudinary/signature")
        assert r.status_code == 401


# ---------- user registration (iteration 2) ----------
class TestRegister:
    def _faculty_id(self, session):
        r = session.get(f"{API}/faculties")
        return r.json()["items"][0]["id"]

    def test_register_publisher_as_admin(self, session, admin_token):
        ts = int(time.time())
        email = f"TEST_pub_{ts}@example.com"
        fid = self._faculty_id(session)
        payload = {
            "name": f"TEST Publisher {ts}",
            "email": email,
            "password": "TestPub@2026",
            "role": "faculty_publisher",
            "facultyId": fid,
        }
        r = session.post(f"{API}/auth/register", json=payload, headers=H(admin_token))
        assert r.status_code == 201, r.text
        user = r.json()["user"]
        assert user["email"] == email.lower()
        assert user["role"] == "faculty_publisher"
        assert "password" not in user
        # The new user must be able to login
        r2 = session.post(f"{API}/auth/login", json={"email": email, "password": "TestPub@2026"})
        assert r2.status_code == 200
        assert r2.json()["user"]["email"] == email.lower()

    def test_register_forbidden_for_publisher(self, session, publisher_token):
        ts = int(time.time())
        payload = {
            "name": "Should Fail",
            "email": f"TEST_forbidden_{ts}@example.com",
            "password": "X@123456",
            "role": "faculty_publisher",
        }
        r = session.post(f"{API}/auth/register", json=payload, headers=H(publisher_token))
        assert r.status_code == 403

    def test_register_requires_auth(self, session):
        r = session.post(f"{API}/auth/register", json={"name": "x", "email": "x@x.com", "password": "x"})
        assert r.status_code == 401

    def test_register_duplicate_email(self, session, admin_token):
        ts = int(time.time())
        email = f"TEST_dup_{ts}@example.com"
        fid = self._faculty_id(session)
        payload = {
            "name": "Dup",
            "email": email,
            "password": "Dup@12345",
            "role": "faculty_publisher",
            "facultyId": fid,
        }
        r1 = session.post(f"{API}/auth/register", json=payload, headers=H(admin_token))
        assert r1.status_code == 201
        r2 = session.post(f"{API}/auth/register", json=payload, headers=H(admin_token))
        assert r2.status_code == 409

    def test_register_missing_fields(self, session, admin_token):
        r = session.post(f"{API}/auth/register", json={"email": "x@x.com"}, headers=H(admin_token))
        assert r.status_code == 400

