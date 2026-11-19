export const PLATFORMS = [
  { id: "youtube", label: "YouTube", color: "#ef4444", placeholder: "https://www.youtube.com/watch?v=..." },
  { id: "instagram", label: "Instagram", color: "#ec4899", placeholder: "https://www.instagram.com/p/..." },
  { id: "x", label: "X", color: "#0ea5e9", placeholder: "https://x.com/user/status/..." },
];

// Deterministic pseudo-random so the same URL gives the same mock result.
function seeded(str) {
  let h = 2166136261;
  for (const c of str) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return () => ((h = Math.imul(h ^ (h >>> 15), 2246822507)) >>> 0) / 4294967295;
}

const SCALE = { youtube: 120000, instagram: 45000, x: 80000 };

export function getMockAnalysis(platform, url) {
  const rnd = seeded(platform + url);
  const views = Math.round(SCALE[platform] * (0.5 + rnd()));
  const likes = Math.round(views * (0.04 + rnd() * 0.06));
  const comments = Math.round(likes * (0.08 + rnd() * 0.1));
  const shares = Math.round(likes * (0.1 + rnd() * 0.2));
  const engagementRate = +(((likes + comments + shares) / views) * 100).toFixed(2);
  const pos = 40 + Math.round(rnd() * 30);
  const neg = 5 + Math.round(rnd() * 15);

  return {
    platform,
    url,
    metrics: { views, likes, comments, shares, engagementRate },
    deltas: { views: 12.4, likes: 8.1, comments: -2.3, engagementRate: 3.6 },
    sentiment: {
      breakdown: [
        { name: "Positive", value: pos },
        { name: "Neutral", value: 100 - pos - neg },
        { name: "Negative", value: neg },
      ],
      timeline: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"].map((day) => ({
        day,
        positive: 40 + Math.round(rnd() * 35),
        neutral: 15 + Math.round(rnd() * 20),
        negative: 5 + Math.round(rnd() * 15),
      })),
    },
    engagementTimeline: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => ({
      day: d,
      likes: Math.round(likes * rnd() * 0.3),
      comments: Math.round(comments * rnd() * 0.3),
    })),
    topics: [
      { topic: "#AIrevolution", mentions: 1840, sentiment: "positive" },
      { topic: "product launch", mentions: 1320, sentiment: "positive" },
      { topic: "pricing", mentions: 960, sentiment: "negative" },
      { topic: "#creatoreconomy", mentions: 780, sentiment: "neutral" },
      { topic: "tutorial", mentions: 640, sentiment: "positive" },
      { topic: "giveaway", mentions: 510, sentiment: "neutral" },
    ],
    recommendations: [
      { id: 1, priority: "high", title: "Reply to pricing concerns", detail: "Pricing drives most negative comments. A pinned reply or FAQ post could lift sentiment." },
      { id: 2, priority: "medium", title: "Post during peak hours", detail: "Engagement peaks between 6–9 PM. Schedule your next post in this window." },
      { id: 3, priority: "medium", title: "Double down on tutorials", detail: "Tutorial-style content earns the most positive mentions. Consider a short series." },
      { id: 4, priority: "low", title: "Add a stronger call-to-action", detail: "Comments trail likes; ask a direct question to spark conversation." },
    ],
  };
}

export function getMockComparison() {
  return [
    { platform: "YouTube", engagement: 5.8, reach: 92, sentiment: 74, growth: 11 },
    { platform: "Instagram", engagement: 7.4, reach: 68, sentiment: 81, growth: 16 },
    { platform: "X", engagement: 3.9, reach: 77, sentiment: 58, growth: 7 },
  ];
}
