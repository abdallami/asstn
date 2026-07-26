import { prisma } from "@/src/lib/prisma"
import Link from "next/link"
import { TableauActualites } from "./TableauActualites"

export default async function ListeActualites() {
  const actus = await prisma.actualite.findMany({ orderBy: { createdAt: "desc" } })

  return (
    <div>
      <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
        <h1 className="text-2xl font-bold">Actualités ({actus.length})</h1>
        <Link href="/admin/actualites/nouveau" className="btn btn-primary">+ Publier</Link>
      </div>
      <TableauActualites actus={actus} />
    </div>
  )
}