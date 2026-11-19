from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_analyze_valid_url_and_metrics():
    response = client.post("/api/analyze", json={"url": "https://www.youtube.com/watch?v=abcdefghijk", "text": "Great #AI", "metrics": {"likes": 10, "comments": 2, "shares": 3, "views": 100}})
    assert response.status_code == 200
    body = response.json()
    assert body["analysis"]["platform"] == "youtube"
    assert body["analysis"]["engagement_rate"] == 15.0
    assert body["analysis"]["sentiment"]["label"] == "positive"
    assert body["data_source"] == "user_provided"


def test_invalid_url_returns_contract_error():
    response = client.post("/api/analyze", json={"url": "https://example.com/post"})
    assert response.status_code == 422
    assert response.json()["error"]["code"] == "validation_error"


def test_analytics_endpoints_use_labeled_simulated_data():
    for endpoint in ("/api/dashboard", "/api/sentiment", "/api/trends", "/api/recommendations"):
        response = client.get(endpoint)
        assert response.status_code == 200
        assert response.json()["data_source"] == "simulated"


def test_platform_filter_and_query_validation():
    assert client.get("/api/dashboard?platform=x").json()["summary"]["posts_analyzed"] == 1
    assert client.get("/api/trends?limit=0").status_code == 422


def test_zero_views_can_use_followers():
    response = client.post("/api/analyze", json={"url": "https://x.com/person/status/123456", "text": "", "metrics": {"likes": 10, "comments": 0, "shares": 0, "views": 0}, "follower_count": 100})
    assert response.json()["analysis"]["engagement_rate"] == 10.0


def test_rejects_non_https_and_malformed_social_urls():
    for url in (
        "http://x.com/person/status/123456",
        "https://x.com.attacker.invalid/person/status/123456",
        "https://user@x.com/person/status/123456",
        "https://www.youtube.com/watch",
        "https://instagram.com/accounts/login/",
    ):
        response = client.post("/api/analyze", json={"url": url})
        assert response.status_code == 422, url
        assert response.json()["error"]["code"] == "validation_error"
