"use client"
import { useState, useTransition } from "react"
import Link from "next/link"
import { supprimerDocuments } from "./actions"

type Doc = { id: string; titre: string; categorie: string | null; fichierUrl: string; createdAt: Date }

export function TableauDocuments({ documents }: { documents: Doc[] }) {
  const [selection, setSelection] = useState<string[]>([])
  const [isPending, startTransition] = useTransition()

  const toutSelectionne = documents.length > 0 && selection.length === documents.length
  const toggleTout = () => setSelection(toutSelectionne ? [] : documents.map((d) => d.id))
  const toggleUn = (id: string) =>
    setSelection((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  const supprimerUn = (id: string) => {
    if (!confirm("Supprimer ce document ?")) return
    startTransition(async () => { await supprimerDocuments([id]) })
  }

  const supprimerSelection = () => {
    if (!confirm(`Supprimer ${selection.length} document(s) ?`)) return
    startTransition(async () => { await supprimerDocuments(selection); setSelection([]) })
  }

  return (
    <div>
      {selection.length > 0 && (
        <div className="flex items-center justify-between bg-error/10 border border-error/30 rounded-lg px-4 py-2 mb-4 gap-2">
          <span className="text-sm">{selection.length} sélectionné(s)</span>
          <button onClick={supprimerSelection} disabled={isPending} className="btn btn-sm btn-error">Supprimer</button>
        </div>
      )}

      <div className="overflow-x-auto bg-base-100 rounded-box shadow">
        <table className="table min-w-[560px]">
          <thead>
            <tr>
              <th><input type="checkbox" className="checkbox" checked={toutSelectionne} onChange={toggleTout} /></th>
              <th>Titre</th><th>Catégorie</th><th>Date</th><th></th>
            </tr>
          </thead>
          <tbody>
            {documents.map((d) => (
              <tr key={d.id}>
                <td><input type="checkbox" className="checkbox" checked={selection.includes(d.id)} onChange={() => toggleUn(d.id)} /></td>
                <td>{d.titre}</td>
                <td>{d.categorie && <span className="badge badge-outline">{d.categorie}</span>}</td>
                <td>{d.createdAt.toLocaleDateString("fr-FR")}</td>
                <td className="flex gap-1">
                  <a href={d.fichierUrl} target="_blank" rel="noopener noreferrer" className="btn btn-xs btn-ghost">Ouvrir</a>
                  <Link href={`/admin/documents/${d.id}/modifier`} className="btn btn-xs btn-ghost">Modifier</Link>
                  <button onClick={() => supprimerUn(d.id)} disabled={isPending} className="btn btn-xs btn-ghost text-error">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}