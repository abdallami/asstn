import { prisma } from "@/src/lib/prisma"
import { modifierEvenement } from "./actions"
import { notFound } from "next/navigation"

function versDatetimeLocal(date: Date) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
}

export default async function ModifierEvenement({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const evenement = await prisma.evenement.findUnique({ where: { id } })
  if (!evenement) notFound()

  const action = modifierEvenement.bind(null, id)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Modifier l&apos;événement</h1>
      <form action={action} className="card bg-base-100 shadow p-6 gap-4 max-w-lg">
        <input name="titre" defaultValue={evenement.titre} className="input input-bordered" required />
        <textarea name="description" defaultValue={evenement.description} className="textarea textarea-bordered h-28" required />
        <input name="lieu" defaultValue={evenement.lieu ?? ""} placeholder="Lieu" className="input input-bordered" />
        <input name="dateEvent" type="datetime-local" defaultValue={versDatetimeLocal(evenement.dateEvent)} className="input input-bordered" required />
        <div>
          <label className="label">Remplacer la photo (optionnel)</label>
          <input name="photo" type="file" accept="image/*" className="file-input file-input-bordered w-full" />
        </div>
        <button className="btn btn-primary" type="submit">Enregistrer</button>
      </form>
    </div>
  )
}