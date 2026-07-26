"use client"
import { useState, useTransition } from "react"
import Link from "next/link"
import { supprimerMembres } from "./actions"

type Membre = {
  id: string
  nom: string
  prenom: string
  filiere: string
  universite: string
  role: string | null
  cotisationAJour: boolean
}

export function TableauMembres({ membres }: { membres: Membre[] }) {
  const [selection, setSelection] = useState<string[]>([])
  const [isPending, startTransition] = useTransition()

  const toutSelectionne = membres.length > 0 && selection.length === membres.length
  const toggleTout = () => setSelection(toutSelectionne ? [] : membres.map((m) => m.id))
  const toggleUn = (id: string) =>
    setSelection((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  const supprimerUn = (id: string) => {
    if (!confirm("Supprimer ce membre ?")) return
    startTransition(async () => {
      await supprimerMembres([id])
      setSelection((prev) => prev.filter((x) => x !== id))
    })
  }

  const supprimerSelection = () => {
    if (!confirm(`Supprimer ${selection.length} membre(s) sélectionné(s) ?`)) return
    startTransition(async () => {
      await supprimerMembres(selection)
      setSelection([])
    })
  }

  return (
    <div>
      {selection.length > 0 && (
        <div className="flex items-center justify-between bg-error/10 border border-error/30 rounded-lg px-4 py-2 mb-4 gap-2">
          <span className="text-sm">{selection.length} sélectionné(s)</span>
          <button onClick={supprimerSelection} disabled={isPending} className="btn btn-sm btn-error">
            {isPending ? "..." : "Supprimer"}
          </button>
        </div>
      )}

      <div className="overflow-x-auto bg-base-100 rounded-box shadow">
        <table className="table min-w-[640px]">
          <thead>
            <tr>
              <th><input type="checkbox" className="checkbox" checked={toutSelectionne} onChange={toggleTout} /></th>
              <th>Nom</th><th>Filière</th><th>Université</th><th>Rôle</th><th>Cotisation</th><th></th>
            </tr>
          </thead>
          <tbody>
            {membres.map((m) => (
              <tr key={m.id}>
                <td><input type="checkbox" className="checkbox" checked={selection.includes(m.id)} onChange={() => toggleUn(m.id)} /></td>
                <td>{m.prenom} {m.nom}</td>
                <td>{m.filiere}</td>
                <td>{m.universite}</td>
                <td>{m.role ?? "—"}</td>
                <td>{m.cotisationAJour ? "✅" : "❌"}</td>
                <td className="flex gap-1">
                  <Link href={`/admin/membres/${m.id}/modifier`} className="btn btn-xs btn-ghost">Modifier</Link>
                  <button onClick={() => supprimerUn(m.id)} disabled={isPending} className="btn btn-xs btn-ghost text-error">
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}