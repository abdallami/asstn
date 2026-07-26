"use client"
import Link from "next/link"
import { useState } from "react"
import { deconnexionAction } from "@/app/admin/actions"

const LIENS = [
  { href: "/admin", label: "Tableau de bord" },
  { href: "/admin/membres", label: "Membres" },
  { href: "/admin/actualites", label: "Actualités" },
  { href: "/admin/evenements", label: "Événements" },
  { href: "/admin/documents", label: "Documents" },
]

export function AdminSidebar({ nomUtilisateur }: { nomUtilisateur?: string | null }) {
  const [ouvert, setOuvert] = useState(false)

  return (
    <>
      <div className="md:hidden flex items-center justify-between bg-primary text-primary-content px-4 py-3 sticky top-0 z-40">
        <span className="font-bold">AEESTN Admin</span>
        <button onClick={() => setOuvert(true)} className="text-2xl leading-none" aria-label="Ouvrir le menu">☰</button>
      </div>

      {ouvert && (
        <div className="md:hidden fixed inset-0 bg-black/40 z-40" onClick={() => setOuvert(false)} />
      )}

      <aside
        className={`bg-primary text-primary-content p-4 flex flex-col gap-2 w-64
        fixed md:sticky top-0 left-0 h-full md:h-screen z-50 transition-transform
        ${ouvert ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <h2 className="font-bold text-lg mb-4">AEESTN Admin</h2>
        {LIENS.map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setOuvert(false)} className="btn btn-ghost justify-start">
            {l.label}
          </Link>
        ))}
        <div className="mt-auto">
          <p className="text-sm opacity-75">{nomUtilisateur}</p>
          <form action={deconnexionAction}>
            <button className="btn btn-sm btn-outline mt-2 w-full">Déconnexion</button>
          </form>
        </div>
      </aside>
    </>
  )
}