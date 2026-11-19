def engagement_rate(metrics: dict[str, int], follower_count: int | None = None) -> tuple[float | None, str | None]:
    denominator = metrics.get("views", 0)
    if denominator:
        basis = "(likes + comments + shares) / views * 100"
    elif follower_count:
        denominator = follower_count
        basis = "(likes + comments + shares) / followers * 100"
    else:
        return None, None
    interactions = sum(metrics.get(key, 0) for key in ("likes", "comments", "shares"))
    return round(interactions / denominator * 100, 2), basis
