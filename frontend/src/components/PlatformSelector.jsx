import { PLATFORMS } from '../mock/mockData.js';

export default function PlatformSelector({ value, onChange }) {
  return (
    <div className="grid grid-cols-3 gap-2" role="tablist" aria-label="Platform">
      {PLATFORMS.map((p) => {
        const active = p.id === value;
        return (
          <button
            key={p.id}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(p.id)}
            className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
              active ? 'border-transparent text-white shadow-lg' : 'border-white/10 text-slate-300 hover:bg-white/5'
            }`}
            style={active ? { background: p.color } : undefined}
          >
            {p.label}
          </button>
        );
      })}
    </div>
  );
}
