import { useState } from 'react';
import Header from './components/Header.jsx';
import PlatformSelector from './components/PlatformSelector.jsx';
import UrlInput from './components/UrlInput.jsx';
import MetricCard from './components/MetricCard.jsx';
import EngagementChart from './components/EngagementChart.jsx';
import SentimentCharts from './components/SentimentCharts.jsx';
import TrendingTopics from './components/TrendingTopics.jsx';
import Recommendations from './components/Recommendations.jsx';
import PlatformComparison from './components/PlatformComparison.jsx';
import useAnalysis from './hooks/useAnalysis.js';
import { PLATFORMS } from './mock/mockData.js';

export default function App() {
  const [platform, setPlatform] = useState('youtube');
  const { data, loading, error, run } = useAnalysis();
  const current = PLATFORMS.find((p) => p.id === platform);
  const m = data?.metrics;

  return (
    <div className="min-h-screen bg-[radial-gradient(60rem_30rem_at_top,rgba(124,58,237,.18),transparent)]">
      <Header />
      <main className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6">
        <section className="card space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Analyze a post</h2>
            <p className="text-sm text-slate-400">Pick a platform, paste a post link and get instant insights.</p>
          </div>
          <PlatformSelector value={platform} onChange={setPlatform} />
          <UrlInput key={platform} placeholder={current.placeholder} loading={loading} onSubmit={(url) => run({ platform, url })} />
          {error && <p className="text-sm text-rose-400">{error}</p>}
        </section>

        {!data && !loading && (
          <p className="py-6 text-center text-sm text-slate-500">Enter a post URL above to see metrics, sentiment and AI recommendations.</p>
        )}
        {loading && <p className="py-6 text-center text-sm text-slate-400 animate-pulse">Crunching the numbers…</p>}

        {data && !loading && (
          <>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
              <MetricCard label="Views" value={m.views} delta={data.deltas.views} />
              <MetricCard label="Likes" value={m.likes} delta={data.deltas.likes} />
              <MetricCard label="Comments" value={m.comments} delta={data.deltas.comments} />
              <MetricCard label="Shares" value={m.shares} />
              <MetricCard label="Engagement" value={m.engagementRate} suffix="%" delta={data.deltas.engagementRate} />
            </div>
            <SentimentCharts sentiment={data.sentiment} />
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="lg:col-span-2"><EngagementChart data={data.engagementTimeline} /></div>
              <TrendingTopics topics={data.topics} />
            </div>
            <Recommendations items={data.recommendations} />
          </>
        )}

        <PlatformComparison />
      </main>
    </div>
  );
}
