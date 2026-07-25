import { prisma } from "@/src/lib/prisma"
import Link from "next/link"
import Image from "next/image"

export default async function ListeActualites() {
  const actus = await prisma.actualite.findMany({ orderBy: { createdAt: "desc" } })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Actualités ({actus.length})</h1>
        <Link href="/admin/actualites/nouveau" className="btn btn-primary">+ Publier une actualité</Link>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {actus.map((a) => (
          <div key={a.id} className="card bg-base-100 shadow">
            {a.imageUrl && (
              <figure className="h-40 relative">
                <Image src={a.imageUrl} alt={a.titre} fill className="object-cover" />
              </figure>
            )}
            <div className="card-body">
              <h2 className="card-title">{a.titre}</h2>
              <p className="text-sm opacity-70 line-clamp-2">{a.contenu}</p>
              <p className="text-xs opacity-50">{a.createdAt.toLocaleDateString("fr-FR")}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}