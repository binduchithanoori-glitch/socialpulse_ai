import { useState } from 'react';

export default function UrlInput({ placeholder, loading, onSubmit }) {
  const [url, setUrl] = useState('');
  const valid = /^https?:\/\/.+\..+/.test(url.trim());

  const handle = (e) => {
    e.preventDefault();
    if (valid && !loading) onSubmit(url.trim());
  };

  return (
    <form onSubmit={handle} className="flex flex-col gap-2 sm:flex-row">
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none placeholder:text-slate-500 focus:border-brand-500"
      />
      <button
        type="submit"
        disabled={!valid || loading}
        className="rounded-xl bg-gradient-to-r from-brand-600 to-pink-500 px-6 py-3 text-sm font-semibold transition enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {loading ? 'Analyzing…' : 'Analyze post'}
      </button>
    </form>
  );
}
