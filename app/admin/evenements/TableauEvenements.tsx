"use client"
import { useState, useTransition } from "react"
import Link from "next/link"
import Image from "next/image"
import { supprimerEvenements } from "./actions"

type Evt = { id: string; titre: string; description: string; lieu: string | null; dateEvent: Date; imageUrl: string | null }

export function TableauEvenements({ evenements }: { evenements: Evt[] }) {
  const [selection, setSelection] = useState<string[]>([])
  const [isPending, startTransition] = useTransition()

  const toggleUn = (id: string) =>
    setSelection((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  const supprimerUn = (id: string) => {
    if (!confirm("Supprimer cet événement ?")) return
    startTransition(async () => { await supprimerEvenements([id]) })
  }

  const supprimerSelection = () => {
    if (!confirm(`Supprimer ${selection.length} événement(s) ?`)) return
    startTransition(async () => { await supprimerEvenements(selection); setSelection([]) })
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
        {evenements.map((e) => {
          const estPasse = e.dateEvent < new Date()
          return (
            <div key={e.id} className="card bg-base-100 shadow relative">
              <label className="absolute top-2 left-2 z-10">
                <input type="checkbox" className="checkbox bg-base-100" checked={selection.includes(e.id)} onChange={() => toggleUn(e.id)} />
              </label>
              {e.imageUrl && (
                <figure className="h-40 relative">
                  <Image src={e.imageUrl} alt={e.titre} fill className="object-cover" />
                </figure>
              )}
              <div className="card-body">
                <div className="flex justify-between items-start gap-2">
                  <h2 className="card-title text-base">{e.titre}</h2>
                  <span className={`badge ${estPasse ? "badge-ghost" : "badge-success"}`}>{estPasse ? "Passé" : "À venir"}</span>
                </div>
                <p className="text-sm opacity-70 line-clamp-2">{e.description}</p>
                <div className="card-actions justify-end mt-2">
                  <Link href={`/admin/evenements/${e.id}/modifier`} className="btn btn-xs btn-ghost">Modifier</Link>
                  <button onClick={() => supprimerUn(e.id)} disabled={isPending} className="btn btn-xs btn-ghost text-error">Supprimer</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}