import { creerEvenement } from "./actions"

export default function NouvelEvenement() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Ajouter un événement</h1>
      <form
        action={creerEvenement}
        encType="multipart/form-data"
        className="card bg-base-100 shadow p-6 gap-4 max-w-lg"
      >
        <input name="titre" placeholder="Titre de l'événement" className="input input-bordered" required />
        <textarea
          name="description" placeholder="Description"
          className="textarea textarea-bordered h-28" required
        />
        <input name="lieu" placeholder="Lieu (ex: Niamey, Faculté X)" className="input input-bordered" />

        <div>
          <label className="label">Date de l'événement</label>
          <input name="dateEvent" type="datetime-local" className="input input-bordered w-full" required />
        </div>

        <div>
          <label className="label">Photo / affiche (optionnel)</label>
          <input name="photo" type="file" accept="image/*" className="file-input file-input-bordered w-full" />
        </div>

        <button className="btn btn-primary" type="submit">Ajouter</button>
      </form>
    </div>
  )
}