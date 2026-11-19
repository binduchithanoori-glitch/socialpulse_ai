export default function ChartCard({ title, subtitle, children, className = '' }) {
  return (
    <section className={`card ${className}`}>
      <h3 className="font-semibold">{title}</h3>
      {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}
