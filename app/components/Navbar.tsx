"use client"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { LigneRoute } from "@/app/components/LigneRoute"

const LIENS = [
  { href: "/", label: "Accueil" },
  { href: "/annuaire", label: "Membres" },
  { href: "/actualites", label: "Actualités" },
  { href: "/evenements", label: "Événements" },
  { href: "/documents", label: "Documents" },
]

export function Navbar() {
  const [ouvert, setOuvert] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-papier/90 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOuvert(false)}>
          <Image src="/logo.png" alt="Logo AEESTN" width={36} height={36} className="rounded-full" />
          <span className="font-display text-lg font-semibold text-indigo tracking-tight hidden sm:block">
            A.E.E.S.T.N
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 font-body text-sm">
      {LIENS.map((l) => (
        <Link key={l.href} href={l.href} className="px-3 py-2 rounded-full hover:bg-indigo/5 text-encre/80 hover:text-indigo transition">
          {l.label}
        </Link>
      ))}
      <Link href="/admin/connexion" className="px-3 py-2 rounded-full hover:bg-indigo/5 text-encre/50 hover:text-indigo transition font-mono text-xs uppercase tracking-wide">
        Bureau
      </Link>
      <Link href="/contact" className="ml-2 px-4 py-2 rounded-full bg-indigo text-papier hover:bg-steel transition">
        Contact
      </Link>
    </nav>

        <button onClick={() => setOuvert(!ouvert)} className="md:hidden p-2 text-indigo" aria-label="Ouvrir le menu">
          {ouvert ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      <div className="pb-2 border-t border-indigo/5">
        <LigneRoute />
      </div>

          {ouvert && (
      <nav className="md:hidden flex flex-col px-4 pb-4 gap-1 font-body text-sm bg-papier border-t border-indigo/10">
        {LIENS.map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setOuvert(false)} className="px-3 py-3 rounded-lg hover:bg-indigo/5 text-encre/80">
            {l.label}
          </Link>
        ))}
        <Link href="/admin/connexion" onClick={() => setOuvert(false)} className="px-3 py-3 rounded-lg hover:bg-indigo/5 text-encre/50 font-mono text-xs uppercase tracking-wide">
          Espace bureau
        </Link>
        <Link href="/contact" onClick={() => setOuvert(false)} className="px-3 py-3 rounded-lg bg-indigo text-papier text-center mt-2">
          Contact
        </Link>
      </nav>
    )}
    </header>
  )
}