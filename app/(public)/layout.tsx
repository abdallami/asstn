import Link from "next/link"

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-papier/90 backdrop-blur border-b border-indigo/10">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="font-display text-xl font-semibold text-indigo tracking-tight">
            A.E.E.S.T.N
          </Link>
          <nav className="hidden md:flex items-center gap-1 font-body text-sm">
            <Link href="/" className="px-3 py-2 rounded-full hover:bg-indigo/5 text-encre/80 hover:text-indigo transition">Accueil</Link>
            <Link href="/annuaire" className="px-3 py-2 rounded-full hover:bg-indigo/5 text-encre/80 hover:text-indigo transition">Membres</Link>
            <Link href="/actualites" className="px-3 py-2 rounded-full hover:bg-indigo/5 text-encre/80 hover:text-indigo transition">Actualités</Link>
            <Link href="/evenements" className="px-3 py-2 rounded-full hover:bg-indigo/5 text-encre/80 hover:text-indigo transition">Événements</Link>
            <Link href="/documents" className="px-3 py-2 rounded-full hover:bg-indigo/5 text-encre/80 hover:text-indigo transition">Documents</Link>
            <Link href="/contact" className="ml-2 px-4 py-2 rounded-full bg-indigo text-papier hover:bg-steel transition">Contact</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-indigo text-papier">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 text-center">
          <p className="font-display text-lg mb-1">A.E.E.S.T.N</p>
          <p className="text-sm text-papier/70 max-w-md mx-auto">
            Association des Élèves, Étudiants et Stagiaires Tchadiens au Niger
          </p>
          <p className="text-xs text-papier/40 mt-6 font-mono">
            © {new Date().getFullYear()} AEESTN
          </p>
        </div>
      </footer>
    </div>
  )
}