import { Area, AreaChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import ChartCard from './ChartCard.jsx';

const COLORS = { Positive: '#34d399', Neutral: '#94a3b8', Negative: '#fb7185' };
const tip = { backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,.1)', borderRadius: 12 };

export default function SentimentCharts({ sentiment }) {
  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <ChartCard title="Sentiment split" subtitle="Share of comments" className="lg:col-span-2">
        <div className="h-64">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={sentiment.breakdown} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3} stroke="none">
                {sentiment.breakdown.map((s) => <Cell key={s.name} fill={COLORS[s.name]} />)}
              </Pie>
              <Tooltip contentStyle={tip} formatter={(v) => `${v}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
      <ChartCard title="Sentiment over time" subtitle="Last 7 days" className="lg:col-span-3">
        <div className="h-64">
          <ResponsiveContainer>
            <AreaChart data={sentiment.timeline}>
              <CartesianGrid stroke="rgba(255,255,255,.06)" vertical={false} />
              <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip contentStyle={tip} />
              <Area type="monotone" dataKey="positive" stackId="1" stroke={COLORS.Positive} fill={COLORS.Positive} fillOpacity={0.5} />
              <Area type="monotone" dataKey="neutral" stackId="1" stroke={COLORS.Neutral} fill={COLORS.Neutral} fillOpacity={0.4} />
              <Area type="monotone" dataKey="negative" stackId="1" stroke={COLORS.Negative} fill={COLORS.Negative} fillOpacity={0.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
}
