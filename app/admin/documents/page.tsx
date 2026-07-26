import { prisma } from "@/src/lib/prisma"
import Link from "next/link"
import { TableauDocuments } from "./TableauDocuments"

export default async function ListeDocuments() {
  const documents = await prisma.document.findMany({ orderBy: { createdAt: "desc" } })

  return (
    <div>
      <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
        <h1 className="text-2xl font-bold">Documents ({documents.length})</h1>
        <Link href="/admin/documents/nouveau" className="btn btn-primary">+ Ajouter</Link>
      </div>
      <TableauDocuments documents={documents} />
    </div>
  )
}