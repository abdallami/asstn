export function LigneRoute() {
  return (
    <div className="flex items-center gap-3 max-w-4xl mx-auto px-4 py-2 text-steel">
      <span className="font-mono text-xs tracking-widest uppercase whitespace-nowrap">N&apos;Djamena</span>
      <svg className="flex-1 h-4" viewBox="0 0 400 16" preserveAspectRatio="none">
        <circle cx="6" cy="8" r="4" fill="currentColor" />
        <line x1="14" y1="8" x2="386" y2="8" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 6" strokeLinecap="round" />
        <circle cx="394" cy="8" r="4" fill="currentColor" />
      </svg>
      <span className="font-mono text-xs tracking-widest uppercase whitespace-nowrap">Niamey</span>
    </div>
  )
}