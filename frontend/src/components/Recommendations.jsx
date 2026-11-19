import ChartCard from './ChartCard.jsx';

const badge = {
  high: 'bg-rose-500/15 text-rose-300',
  medium: 'bg-amber-500/15 text-amber-300',
  low: 'bg-sky-500/15 text-sky-300',
};

export default function Recommendations({ items }) {
  return (
    <ChartCard title="✨ AI recommendations" subtitle="Suggested next steps">
      <ul className="space-y-3">
        {items.map((r) => (
          <li key={r.id} className="rounded-xl border border-white/10 bg-slate-900/60 p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold">{r.title}</p>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${badge[r.priority]}`}>{r.priority}</span>
            </div>
            <p className="mt-1 text-xs text-slate-400">{r.detail}</p>
          </li>
        ))}
      </ul>
    </ChartCard>
  );
}
