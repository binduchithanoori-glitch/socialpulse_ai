# SocialPulse AI – Frontend

React + Vite + Tailwind CSS + Recharts.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

Runs on mock data by default. Copy `.env.example` to `.env.local` and set `VITE_USE_MOCK=false`
to call a backend. All HTTP lives in `src/services/`; adjust endpoints there to match `docs/API_CONTRACT.md`.
