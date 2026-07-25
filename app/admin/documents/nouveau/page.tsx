import { creerDocument } from "./actions"

export default function NouveauDocument() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Ajouter un document</h1>
      <form
        action={creerDocument}
        className="card bg-base-100 shadow p-6 gap-4 max-w-lg"
      >
        <input name="titre" placeholder="Titre du document" className="input input-bordered" required />

        <select name="categorie" className="select select-bordered">
          <option value="">Catégorie (optionnel)</option>
          <option value="PV réunion">PV de réunion</option>
          <option value="Statuts">Statuts</option>
          <option value="Règlement intérieur">Règlement intérieur</option>
          <option value="Autre">Autre</option>
        </select>

        <div>
          <label className="label">Fichier (PDF)</label>
          <input
            name="fichier" type="file" accept="application/pdf"
            className="file-input file-input-bordered w-full" required
          />
        </div>

        <button className="btn btn-primary" type="submit">Enregistrer</button>
      </form>
    </div>
  )
}