def generate_recommendations(platforms: list[dict]) -> list[dict]:
    results = []
    for item in platforms:
        rate = item["average_engagement_rate"]
        platform = item["platform"]
        if rate < 3:
            results.append({"title": "Strengthen your opening and call to action", "rationale": f"{platform.title()} engagement is below 3%; make the first line specific and invite a response.", "priority": "high", "platform": platform})
        else:
            results.append({"title": "Build on your strong engagement", "rationale": f"{platform.title()} is performing well; reuse the format and topic of its strongest posts.", "priority": "medium", "platform": platform})
    if not results:
        results.append({"title": "Publish consistently and measure results", "rationale": "Add posts to establish a baseline for future recommendations.", "priority": "medium", "platform": None})
    return results
