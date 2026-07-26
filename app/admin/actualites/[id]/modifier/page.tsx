import { prisma } from "@/src/lib/prisma"
import { modifierActualite } from "./actions"
import { notFound } from "next/navigation"

export default async function ModifierActualite({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const actu = await prisma.actualite.findUnique({ where: { id } })
  if (!actu) notFound()

  const action = modifierActualite.bind(null, id)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Modifier l&apos;actualité</h1>
      <form action={action} className="card bg-base-100 shadow p-6 gap-4 max-w-lg">
        <input name="titre" defaultValue={actu.titre} placeholder="Titre" className="input input-bordered" required />
        <textarea name="contenu" defaultValue={actu.contenu} className="textarea textarea-bordered h-32" required />
        <div>
          <label className="label">Remplacer la photo (optionnel)</label>
          <input name="photo" type="file" accept="image/*" className="file-input file-input-bordered w-full" />
        </div>
        <button className="btn btn-primary" type="submit">Enregistrer</button>
      </form>
    </div>
  )
}