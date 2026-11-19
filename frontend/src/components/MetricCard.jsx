export default function MetricCard({ label, value, delta, suffix = '' }) {
  const up = delta >= 0;
  return (
    <div className="card">
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-bold">{typeof value === 'number' ? value.toLocaleString() : value}{suffix}</p>
      {delta !== undefined && (
        <p className={`mt-1 text-xs font-medium ${up ? 'text-emerald-400' : 'text-rose-400'}`}>
          {up ? '▲' : '▼'} {Math.abs(delta)}% vs last post
        </p>
      )}
    </div>
  );
}
