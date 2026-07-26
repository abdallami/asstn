export function IllustrationHero() {
  return (
    <svg viewBox="0 0 400 400" className="w-full max-w-sm mx-auto" xmlns="http://www.w3.org/2000/svg">
      {/* Cercle de fond */}
      <circle cx="200" cy="200" r="180" fill="#1B2A56" fillOpacity="0.06" />
      <circle cx="200" cy="200" r="140" fill="#C89B3C" fillOpacity="0.08" />

      {/* Livre ouvert (repris du logo) */}
      <g transform="translate(200,215)">
        <path d="M0,-50 L-90,-30 L-90,60 L0,40 Z" fill="#F7F4EC" stroke="#1B2A56" strokeWidth="4" strokeLinejoin="round" />
        <path d="M0,-50 L90,-30 L90,60 L0,40 Z" fill="#F7F4EC" stroke="#1B2A56" strokeWidth="4" strokeLinejoin="round" />
        <line x1="0" y1="-50" x2="0" y2="40" stroke="#1B2A56" strokeWidth="4" />
        {/* lignes de texte suggérées */}
        <line x1="-70" y1="-15" x2="-15" y2="-22" stroke="#3E5C8A" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
        <line x1="-70" y1="0" x2="-15" y2="-6" stroke="#3E5C8A" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
        <line x1="-70" y1="15" x2="-15" y2="10" stroke="#3E5C8A" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
        <line x1="15" y1="-22" x2="70" y2="-15" stroke="#3E5C8A" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
        <line x1="15" y1="-6" x2="70" y2="0" stroke="#3E5C8A" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
        <line x1="15" y1="10" x2="70" y2="15" stroke="#3E5C8A" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
      </g>

      {/* Trajet pointillé au-dessus du livre, reliant deux repères */}
      <g>
        <circle cx="90" cy="110" r="7" fill="#B3432F" />
        <circle cx="90" cy="110" r="3" fill="#F7F4EC" />
        <path d="M90,110 Q200,60 310,110" fill="none" stroke="#C89B3C" strokeWidth="2.5" strokeDasharray="1 8" strokeLinecap="round" />
        <circle cx="310" cy="110" r="7" fill="#4C7A5B" />
        <circle cx="310" cy="110" r="3" fill="#F7F4EC" />
      </g>

      {/* Petites étoiles / points décoratifs évoquant une carte */}
      <circle cx="60" cy="280" r="3" fill="#3E5C8A" opacity="0.4" />
      <circle cx="340" cy="260" r="3" fill="#3E5C8A" opacity="0.4" />
      <circle cx="320" cy="330" r="3" fill="#C89B3C" opacity="0.6" />
      <circle cx="75" cy="330" r="3" fill="#C89B3C" opacity="0.6" />
    </svg>
  )
}