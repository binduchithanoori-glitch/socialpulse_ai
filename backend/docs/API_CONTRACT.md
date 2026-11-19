# SocialPulse AI API contract

Base path: `/api`. All responses are JSON. Dates are UTC ISO-8601 strings. The current implementation uses clearly identified simulated analytics data; it does not call social network APIs.

## `POST /api/analyze`

Analyze one submitted post and return an `analysis` object.

Request:

```json
{
  "url": "https://www.youtube.com/watch?v=abcdefghijk",
  "text": "A sample post about #AI is quite good",
  "metrics": {"likes": 120, "comments": 8, "shares": 10, "views": 2000},
  "follower_count": 5000
}
```

`url` is required and must be a supported YouTube, Instagram, or X post URL. `text`, `metrics`, and `follower_count` are optional. Metric values and follower count must be non-negative integers. Metrics default to simulated values when omitted.

Response `200`:

```json
{
  "data_source": "simulated",
  "analysis": {
    "platform": "youtube",
    "url": "https://www.youtube.com/watch?v=abcdefghijk",
    "engagement_rate": 6.9,
    "engagement_rate_basis": "(likes + comments + shares) / views * 100",
    "sentiment": {"label": "positive", "score": 0.5},
    "topics": ["AI"],
    "hashtags": ["#AI"],
    "high_performing": true,
    "metrics": {"likes": 120, "comments": 8, "shares": 10, "views": 2000}
  }
}
```

Engagement rate is `null` if views are zero, or if views are absent and there is no follower count. With a follower count and no views, the denominator is followers and the basis says so. Sentiment score is in `[-1, 1]`; sentiment and performance are heuristic estimates, not model or platform guarantees.

## `GET /api/dashboard`

Returns platform comparison, summary, and sample posts. Optional query: `platform` (`youtube`, `instagram`, or `x`), `days` (1–90, defaults to 30).

```json
{"data_source":"simulated","period_days":30,"summary":{"posts_analyzed":3,"average_engagement_rate":5.36,"top_platform":"instagram"},"platforms":[{"platform":"youtube","posts_analyzed":1,"average_engagement_rate":4.6,"average_sentiment":0.57}],"top_posts":[]}
```

## `GET /api/sentiment`

Returns sentiment distribution and sample analyzed posts. Optional `platform` as above.

```json
{"data_source":"simulated","distribution":{"positive":3,"neutral":0,"negative":0},"posts":[]}
```

## `GET /api/trends`

Returns ranked topics and hashtags, with simulated counts. Optional `platform` as above and `limit` (1–50, defaults to 10).

```json
{"data_source":"simulated","topics":[{"name":"AI","count":12}],"hashtags":[{"name":"#AI","count":8}]}
```

## `GET /api/recommendations`

Returns rule-based recommendations based on the simulated sample analytics. Optional `platform` as above.

```json
{"data_source":"simulated","recommendations":[{"title":"Build on your strong engagement","rationale":"Instagram is performing well; reuse the format and topic of its strongest posts.","priority":"medium","platform":"instagram"}]}
```

“AI-based” recommendations in this demo are deterministic rules; no external AI service is configured.

## Errors

Validation errors use FastAPI's `422` response. Unsupported or malformed post URLs return `422`. Unexpected errors return a JSON `500` response with `{"error":{"code":"internal_error","message":"An unexpected error occurred."}}`. Missing resources return `404` where applicable.
