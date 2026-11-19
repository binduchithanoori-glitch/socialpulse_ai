import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import ChartCard from './ChartCard.jsx';
import { getPlatformComparison } from '../services/analyticsService.js';

export default function PlatformComparison() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getPlatformComparison().then(setRows).catch(() => setRows([]));
  }, []);

  return (
    <ChartCard title="Platform comparison" subtitle="Average performance across your accounts">
      <div className="h-72">
        <ResponsiveContainer>
          <BarChart data={rows} barGap={4}>
            <CartesianGrid stroke="rgba(255,255,255,.06)" vertical={false} />
            <XAxis dataKey="platform" stroke="#64748b" fontSize={12} />
            <YAxis stroke="#64748b" fontSize={12} />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,.1)', borderRadius: 12 }} cursor={{ fill: 'rgba(255,255,255,.04)' }} />
            <Legend />
            <Bar dataKey="engagement" name="Engagement %" fill="#a78bfa" radius={[6, 6, 0, 0]} />
            <Bar dataKey="reach" name="Reach score" fill="#38bdf8" radius={[6, 6, 0, 0]} />
            <Bar dataKey="sentiment" name="Positive sentiment %" fill="#34d399" radius={[6, 6, 0, 0]} />
            <Bar dataKey="growth" name="Growth %" fill="#f472b6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
