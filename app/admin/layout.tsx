import { auth } from "@/auth"
import { AdminSidebar } from "@/app/components/AdminSidebar"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session) {
    // Pas connecté → aucune sidebar, juste la page (formulaire de connexion)
    return <div className="min-h-screen bg-base-200">{children}</div>
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <AdminSidebar nomUtilisateur={session.user?.name} />
      <main className="flex-1 p-4 md:p-8 bg-base-200 overflow-x-hidden">{children}</main>
    </div>
  )
}