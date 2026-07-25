import Link from "next/link"
import { auth } from "@/auth"
import { signOut } from "@/auth"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-primary text-primary-content p-4 flex flex-col gap-2">
        <h2 className="font-bold text-lg mb-4">AEESTN Admin</h2>
        <Link href="/admin" className="btn btn-ghost justify-start">Tableau de bord</Link>
        <Link href="/admin/membres" className="btn btn-ghost justify-start">Membres</Link>
        <Link href="/admin/actualites" className="btn btn-ghost justify-start">Actualités</Link>
        <Link href="/admin/evenements" className="btn btn-ghost justify-start">Événements</Link>
        <Link href="/admin/documents" className="btn btn-ghost justify-start">Documents</Link>

        <div className="mt-auto">
          <p className="text-sm opacity-75">{session?.user?.name}</p>
          <form action={async () => { "use server"; await signOut({ redirectTo: "/admin/connexion" }) }}>
            <button className="btn btn-sm btn-outline mt-2">Déconnexion</button>
          </form>
        </div>
      </aside>
      <main className="flex-1 p-8 bg-base-200">{children}</main>
    </div>
  )
}