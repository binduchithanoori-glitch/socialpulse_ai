import ChartCard from './ChartCard.jsx';

const tone = {
  positive: 'bg-emerald-500/15 text-emerald-300',
  neutral: 'bg-slate-500/20 text-slate-300',
  negative: 'bg-rose-500/15 text-rose-300',
};

export default function TrendingTopics({ topics }) {
  const max = Math.max(...topics.map((t) => t.mentions));
  return (
    <ChartCard title="Trending topics" subtitle="Most mentioned in comments">
      <ul className="space-y-3">
        {topics.map((t) => (
          <li key={t.topic}>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{t.topic}</span>
              <span className={`rounded-full px-2 py-0.5 text-xs ${tone[t.sentiment]}`}>{t.mentions.toLocaleString()}</span>
            </div>
            <div className="mt-1 h-1.5 rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-pink-500" style={{ width: `${(t.mentions / max) * 100}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </ChartCard>
  );
}
