from typing import Literal

from fastapi import FastAPI, HTTPException, Query, Request
from fastapi.exception_handlers import http_exception_handler
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, ConfigDict, Field

from app.analytics.engagement import engagement_rate
from app.analytics.recommendations import generate_recommendations
from app.analytics.sentiment import analyze_sentiment
from app.analytics.trends import extract_topics_and_hashtags
from app.analytics.urls import validate_post_url
from app.data import SAMPLE_POSTS

Platform = Literal["youtube", "instagram", "x"]
app = FastAPI(title="SocialPulse AI API", version="1.0.0", description="Social analytics demo API; sample analytics are simulated.")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=False, allow_methods=["*"], allow_headers=["*"])


class Metrics(BaseModel):
    model_config = ConfigDict(extra="forbid")
    likes: int = Field(default=0, ge=0)
    comments: int = Field(default=0, ge=0)
    shares: int = Field(default=0, ge=0)
    views: int = Field(default=0, ge=0)


class AnalyzeRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")
    url: str = Field(min_length=1, max_length=2048)
    text: str = Field(default="", max_length=10000)
    metrics: Metrics | None = None
    follower_count: int | None = Field(default=None, ge=0)


@app.exception_handler(Exception)
async def unexpected_error_handler(request: Request, exc: Exception):
    return JSONResponse(status_code=500, content={"error": {"code": "internal_error", "message": "An unexpected error occurred."}})


@app.exception_handler(RequestValidationError)
async def validation_error_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(status_code=422, content={"error": {"code": "validation_error", "message": "Request validation failed.", "details": exc.errors()}})


@app.exception_handler(HTTPException)
async def http_error_handler(request: Request, exc: HTTPException):
    if exc.status_code == 422:
        return JSONResponse(status_code=422, content={"error": {"code": "validation_error", "message": str(exc.detail)}})
    return await http_exception_handler(request, exc)


def analyze_post(url: str, text: str, metrics: dict, follower_count: int | None = None) -> dict:
    platform = validate_post_url(url)
    rate, basis = engagement_rate(metrics, follower_count)
    topics, hashtags = extract_topics_and_hashtags([text])
    return {"platform": platform, "url": url, "engagement_rate": rate, "engagement_rate_basis": basis,
            "sentiment": analyze_sentiment(text), "topics": [entry["name"] for entry in topics[:5]],
            "hashtags": [entry["name"] for entry in hashtags], "high_performing": bool(rate is not None and rate >= 5), "metrics": metrics}


def enriched_posts():
    result = []
    for post in SAMPLE_POSTS:
        item = analyze_post(post["url"], post["text"], post["metrics"])
        result.append({**item, "text": post["text"]})
    return result


@app.post("/api/analyze")
def analyze(request: AnalyzeRequest):
    try:
        submitted_platform = validate_post_url(request.url)
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc
    if request.metrics is None:
        sample = next((p for p in SAMPLE_POSTS if p["platform"] == submitted_platform), None)
        metrics = sample["metrics"].copy() if sample else {"likes": 0, "comments": 0, "shares": 0, "views": 0}
        source = "simulated"
    else:
        metrics = request.metrics.model_dump()
        source = "user_provided"
    return {"data_source": source, "analysis": analyze_post(request.url, request.text, metrics, request.follower_count)}


@app.get("/api/dashboard")
def dashboard(platform: Platform | None = None, days: int = Query(default=30, ge=1, le=90)):
    posts = [p for p in enriched_posts() if platform is None or p["platform"] == platform]
    platforms = []
    for name in ([platform] if platform else ["youtube", "instagram", "x"]):
        group = [p for p in posts if p["platform"] == name]
        platforms.append({"platform": name, "posts_analyzed": len(group),
                          "average_engagement_rate": round(sum(p["engagement_rate"] or 0 for p in group) / len(group), 2) if group else 0.0,
                          "average_sentiment": round(sum(p["sentiment"]["score"] for p in group) / len(group), 2) if group else 0.0})
    ranked = sorted(posts, key=lambda p: p["engagement_rate"] or 0, reverse=True)
    rates = [p["engagement_rate"] or 0 for p in posts]
    summary = {"posts_analyzed": len(posts), "average_engagement_rate": round(sum(rates) / len(rates), 2) if rates else 0.0,
               "top_platform": max(platforms, key=lambda p: p["average_engagement_rate"])["platform"] if platforms else None}
    return {"data_source": "simulated", "period_days": days, "summary": summary, "platforms": platforms, "top_posts": ranked[:5]}


@app.get("/api/sentiment")
def sentiment(platform: Platform | None = None):
    posts = [p for p in enriched_posts() if platform is None or p["platform"] == platform]
    distribution = {label: sum(p["sentiment"]["label"] == label for p in posts) for label in ("positive", "neutral", "negative")}
    return {"data_source": "simulated", "distribution": distribution, "posts": posts}


@app.get("/api/trends")
def trends(platform: Platform | None = None, limit: int = Query(default=10, ge=1, le=50)):
    posts = [p for p in SAMPLE_POSTS if platform is None or p["platform"] == platform]
    topics, hashtags = extract_topics_and_hashtags([p["text"] for p in posts])
    return {"data_source": "simulated", "topics": topics[:limit], "hashtags": hashtags[:limit]}


@app.get("/api/recommendations")
def recommendations(platform: Platform | None = None):
    values = dashboard(platform=platform)["platforms"]
    return {"data_source": "simulated", "recommendations": generate_recommendations(values)}
