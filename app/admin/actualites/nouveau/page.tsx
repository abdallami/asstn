import { creerActualite } from "./actions"

export default function NouvelleActualite() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Publier une actualité</h1>
      <form
        action={creerActualite}
        encType="multipart/form-data"
        className="card bg-base-100 shadow p-6 gap-4 max-w-lg"
      >
        <input name="titre" placeholder="Titre" className="input input-bordered" required />
        <textarea
          name="contenu" placeholder="Contenu de l'actualité"
          className="textarea textarea-bordered h-32" required
        />
        <div>
          <label className="label">Photo (optionnel)</label>
          <input name="photo" type="file" accept="image/*" className="file-input file-input-bordered w-full" />
        </div>
        <button className="btn btn-primary" type="submit">Publier</button>
      </form>
    </div>
  )
}