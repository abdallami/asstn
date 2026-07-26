function DrapeauTchad() {
  return (
    <svg width="20" height="14" viewBox="0 0 30 20" className="rounded-sm shrink-0">
      <rect width="10" height="20" fill="#002664" />
      <rect x="10" width="10" height="20" fill="#FECB00" />
      <rect x="20" width="10" height="20" fill="#C60C30" />
    </svg>
  )
}

function DrapeauNiger() {
  return (
    <svg width="20" height="14" viewBox="0 0 30 20" className="rounded-sm shrink-0">
      <rect width="30" height="20" fill="#FFFFFF" />
      <rect width="30" height="6.67" fill="#E05206" />
      <rect y="13.33" width="30" height="6.67" fill="#0DB02B" />
      <circle cx="15" cy="10" r="3" fill="#E05206" />
    </svg>
  )
}

export function LigneRoute() {
  return (
    <div className="flex items-center gap-3 max-w-4xl mx-auto px-4 py-2 text-steel">
      <span className="font-mono text-xs tracking-widest uppercase whitespace-nowrap flex items-center gap-2">
        <DrapeauTchad />
        N&apos;Djamena
      </span>
      <svg className="flex-1 h-4" viewBox="0 0 400 16" preserveAspectRatio="none">
        <circle cx="6" cy="8" r="4" fill="currentColor" />
        <line x1="14" y1="8" x2="386" y2="8" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 6" strokeLinecap="round" />
        <circle cx="394" cy="8" r="4" fill="currentColor" />
      </svg>
      <span className="font-mono text-xs tracking-widest uppercase whitespace-nowrap flex items-center gap-2">
        Niamey
        <DrapeauNiger />
      </span>
    </div>
  )
}