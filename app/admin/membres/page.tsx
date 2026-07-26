import { prisma } from "@/src/lib/prisma"
import Link from "next/link"
import { TableauMembres } from "./TableauMembres"

export default async function ListeMembres() {
  const membres = await prisma.membre.findMany({ orderBy: { createdAt: "desc" } })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Membres ({membres.length})</h1>
        <Link href="/admin/membres/nouveau" className="btn btn-primary">+ Ajouter un membre</Link>
      </div>
      <TableauMembres membres={membres} />
    </div>
  )
}