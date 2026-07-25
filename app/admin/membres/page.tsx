import { prisma } from "@/src/lib/prisma"
import Link from "next/link"

export default async function ListeMembres() {
  const membres = await prisma.membre.findMany({ orderBy: { createdAt: "desc" } })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Membres ({membres.length})</h1>
        <Link href="/admin/membres/nouveau" className="btn btn-primary">+ Ajouter un membre</Link>
      </div>

      <div className="overflow-x-auto bg-base-100 rounded-box shadow">
        <table className="table">
          <thead>
            <tr>
              <th>Nom</th><th>Filière</th><th>Université</th><th>Rôle</th><th>Cotisation</th>
            </tr>
          </thead>
          <tbody>
            {membres.map((m) => (
              <tr key={m.id}>
                <td>{m.prenom} {m.nom}</td>
                <td>{m.filiere}</td>
                <td>{m.universite}</td>
                <td>{m.role ?? "—"}</td>
                <td>{m.cotisationAJour ? "✅" : "❌"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}