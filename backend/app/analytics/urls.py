from urllib.parse import parse_qs, urlparse


def validate_post_url(url: str) -> str:
    """Validate a supported public post URL and return its platform key."""
    parsed = urlparse(url)
    host = (parsed.hostname or "").lower().removeprefix("www.")
    if parsed.scheme != "https" or parsed.username or parsed.password or parsed.port:
        raise ValueError("URL must use HTTPS and cannot include credentials or a custom port.")
    path = parsed.path.strip("/")
    segments = path.split("/") if path else []
    if host in {"youtube.com", "m.youtube.com"}:
        video_id = parse_qs(parsed.query).get("v", [""])[0]
        if (path == "watch" and video_id) or (len(segments) == 2 and segments[0] == "shorts" and segments[1]):
            return "youtube"
    if host == "youtu.be" and len(segments) == 1 and segments[0]:
        return "youtube"
    if host == "instagram.com" and len(segments) == 2 and segments[0] in {"p", "reel", "tv"} and segments[1]:
        return "instagram"
    if host in {"x.com", "twitter.com"} and len(segments) == 3 and segments[1] == "status" and segments[0] and segments[2].isdigit():
        return "x"
    raise ValueError("URL must point to a supported YouTube, Instagram, or X post.")
