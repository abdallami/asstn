import { Navbar } from "@/app/components/Navbar"

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
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