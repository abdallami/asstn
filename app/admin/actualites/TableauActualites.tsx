"use client"
import { useState, useTransition } from "react"
import Link from "next/link"
import Image from "next/image"
import { supprimerActualites } from "./actions"

type Actu = { id: string; titre: string; contenu: string; imageUrl: string | null; createdAt: Date }

export function TableauActualites({ actus }: { actus: Actu[] }) {
  const [selection, setSelection] = useState<string[]>([])
  const [isPending, startTransition] = useTransition()

  const toggleUn = (id: string) =>
    setSelection((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  const supprimerUn = (id: string) => {
    if (!confirm("Supprimer cette actualité ?")) return
    startTransition(async () => { await supprimerActualites([id]) })
  }

  const supprimerSelection = () => {
    if (!confirm(`Supprimer ${selection.length} actualité(s) ?`)) return
    startTransition(async () => { await supprimerActualites(selection); setSelection([]) })
  }

  return (
    <div>
      {selection.length > 0 && (
        <div className="flex items-center justify-between bg-error/10 border border-error/30 rounded-lg px-4 py-2 mb-4 gap-2">
          <span className="text-sm">{selection.length} sélectionné(s)</span>
          <button onClick={supprimerSelection} disabled={isPending} className="btn btn-sm btn-error">Supprimer</button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actus.map((a) => (
          <div key={a.id} className="card bg-base-100 shadow">
            <label className="absolute top-2 left-2 z-10">
              <input type="checkbox" className="checkbox bg-base-100" checked={selection.includes(a.id)} onChange={() => toggleUn(a.id)} />
            </label>
            {a.imageUrl && (
              <figure className="h-40 relative">
                <Image src={a.imageUrl} alt={a.titre} fill className="object-cover" />
              </figure>
            )}
            <div className="card-body">
              <h2 className="card-title text-base">{a.titre}</h2>
              <p className="text-sm opacity-70 line-clamp-2">{a.contenu}</p>
              <div className="card-actions justify-end mt-2">
                <Link href={`/admin/actualites/${a.id}/modifier`} className="btn btn-xs btn-ghost">Modifier</Link>
                <button onClick={() => supprimerUn(a.id)} disabled={isPending} className="btn btn-xs btn-ghost text-error">Supprimer</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}