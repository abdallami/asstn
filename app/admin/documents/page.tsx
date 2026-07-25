import { prisma } from "@/src/lib/prisma"
import Link from "next/link"

export default async function ListeDocuments() {
  const documents = await prisma.document.findMany({ orderBy: { createdAt: "desc" } })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Documents ({documents.length})</h1>
        <Link href="/admin/documents/nouveau" className="btn btn-primary">+ Ajouter un document</Link>
      </div>

      <div className="overflow-x-auto bg-base-100 rounded-box shadow">
        <table className="table">
          <thead>
            <tr>
              <th>Titre</th><th>Catégorie</th><th>Date</th><th></th>
            </tr>
          </thead>
          <tbody>
            {documents.map((d) => (
              <tr key={d.id}>
                <td>{d.titre}</td>
                <td>{d.categorie && <span className="badge badge-outline">{d.categorie}</span>}</td>
                <td>{d.createdAt.toLocaleDateString("fr-FR")}</td>
                <td>
                  <a href={d.fichierUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-ghost">
                    📄 Ouvrir
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}