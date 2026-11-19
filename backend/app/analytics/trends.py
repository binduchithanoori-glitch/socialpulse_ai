import re
from collections import Counter

STOP_WORDS = {"about", "after", "again", "and", "are", "for", "from", "have", "into", "is", "our", "that", "the", "this", "with", "your"}


def extract_topics_and_hashtags(texts: list[str]) -> tuple[list[dict], list[dict]]:
    hashtags = Counter(tag for text in texts for tag in re.findall(r"#[\w]+", text, flags=re.UNICODE))
    words = Counter(word.lower() for text in texts for word in re.findall(r"\b[a-zA-Z][a-zA-Z0-9]{2,}\b", text)
                    if word.lower() not in STOP_WORDS)
    return ([{"name": name.title(), "count": count} for name, count in words.most_common()],
            [{"name": name, "count": count} for name, count in hashtags.most_common()])
