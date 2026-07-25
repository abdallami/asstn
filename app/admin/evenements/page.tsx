import { prisma } from "@/src/lib/prisma"
import Link from "next/link"
import Image from "next/image"

export default async function ListeEvenements() {
  const evenements = await prisma.evenement.findMany({ orderBy: { dateEvent: "desc" } })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Événements ({evenements.length})</h1>
        <Link href="/admin/evenements/nouveau" className="btn btn-primary">+ Ajouter un événement</Link>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {evenements.map((e) => {
          const estPasse = e.dateEvent < new Date()
          return (
            <div key={e.id} className="card bg-base-100 shadow">
              {e.imageUrl && (
                <figure className="h-40 relative">
                  <Image src={e.imageUrl} alt={e.titre} fill className="object-cover" />
                </figure>
              )}
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <h2 className="card-title">{e.titre}</h2>
                  <span className={`badge ${estPasse ? "badge-ghost" : "badge-success"}`}>
                    {estPasse ? "Passé" : "À venir"}
                  </span>
                </div>
                <p className="text-sm opacity-70 line-clamp-2">{e.description}</p>
                <p className="text-xs opacity-50">
                  📅 {e.dateEvent.toLocaleDateString("fr-FR", { dateStyle: "long" })}
                  {e.lieu && ` · 📍 ${e.lieu}`}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}