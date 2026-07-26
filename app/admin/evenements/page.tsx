import { prisma } from "@/src/lib/prisma"
import Link from "next/link"
import { TableauEvenements } from "./TableauEvenements"

export default async function ListeEvenements() {
  const evenements = await prisma.evenement.findMany({ orderBy: { dateEvent: "desc" } })

  return (
    <div>
      <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
        <h1 className="text-2xl font-bold">Événements ({evenements.length})</h1>
        <Link href="/admin/evenements/nouveau" className="btn btn-primary">+ Ajouter</Link>
      </div>
      <TableauEvenements evenements={evenements} />
    </div>
  )
}