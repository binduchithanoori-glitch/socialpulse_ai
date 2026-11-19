import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import ChartCard from './ChartCard.jsx';

export default function EngagementChart({ data }) {
  return (
    <ChartCard title="Engagement by day" subtitle="Likes and comments">
      <div className="h-64">
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid stroke="rgba(255,255,255,.06)" vertical={false} />
            <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
            <YAxis stroke="#64748b" fontSize={12} />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,.1)', borderRadius: 12 }} cursor={{ fill: 'rgba(255,255,255,.04)' }} />
            <Legend />
            <Bar dataKey="likes" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
            <Bar dataKey="comments" fill="#f472b6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
