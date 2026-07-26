import { prisma } from "@/src/lib/prisma"
import { modifierDocument } from "./actions"
import { notFound } from "next/navigation"

export default async function ModifierDocument({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const document = await prisma.document.findUnique({ where: { id } })
  if (!document) notFound()

  const action = modifierDocument.bind(null, id)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Modifier le document</h1>
      <form action={action} className="card bg-base-100 shadow p-6 gap-4 max-w-lg">
        <input name="titre" defaultValue={document.titre} className="input input-bordered" required />
        <select name="categorie" defaultValue={document.categorie ?? ""} className="select select-bordered">
          <option value="">Catégorie (optionnel)</option>
          <option value="PV réunion">PV de réunion</option>
          <option value="Statuts">Statuts</option>
          <option value="Règlement intérieur">Règlement intérieur</option>
          <option value="Autre">Autre</option>
        </select>
        <div>
          <label className="label">Remplacer le fichier (optionnel)</label>
          <input name="fichier" type="file" accept="application/pdf" className="file-input file-input-bordered w-full" />
        </div>
        <button className="btn btn-primary" type="submit">Enregistrer</button>
      </form>
    </div>
  )
}