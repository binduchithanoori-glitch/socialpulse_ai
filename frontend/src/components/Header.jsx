export default function Header() {
  return (
    <header className="border-b border-white/10">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-4 sm:px-6">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-pink-500 text-lg font-bold">S</div>
        <div>
          <h1 className="text-lg font-semibold leading-tight">SocialPulse <span className="text-brand-400">AI</span></h1>
          <p className="text-xs text-slate-400">Cross-platform post intelligence</p>
        </div>
      </div>
    </header>
  );
}
