import re

POSITIVE = {"amazing", "awesome", "best", "enjoy", "excellent", "good", "great", "happy", "love", "wonderful", "win"}
NEGATIVE = {"bad", "broken", "fail", "hate", "poor", "sad", "terrible", "worst", "wrong"}


def analyze_sentiment(text: str) -> dict[str, str | float]:
    words = re.findall(r"[a-z']+", text.lower())
    score = (sum(word in POSITIVE for word in words) - sum(word in NEGATIVE for word in words)) / max(len(words), 1)
    score = round(max(-1.0, min(1.0, score * 4)), 2)
    label = "positive" if score > 0.05 else "negative" if score < -0.05 else "neutral"
    return {"label": label, "score": score}
