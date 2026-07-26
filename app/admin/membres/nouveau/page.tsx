import { creerMembre } from "./actions"

export default function NouveauMembre() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Ajouter un membre</h1>
      <form action={creerMembre} className="card bg-base-100 shadow p-6 gap-4 max-w-lg">
        <input name="prenom" placeholder="Prénom" className="input input-bordered" required />
        <input name="nom" placeholder="Nom" className="input input-bordered" required />
        <input name="filiere" placeholder="Filière" className="input input-bordered" required />
        <input name="universite" placeholder="Université" className="input input-bordered" required />
        <input name="promotion" placeholder="Promotion (ex: L3 2025-2026)" className="input input-bordered" />
        <input name="telephone" placeholder="Téléphone" className="input input-bordered" />
        <select name="role" className="select select-bordered">
          <option value="">Membre simple</option>
          <option value="PRESIDENT">Président</option>
          <option value="VICE_PRESIDENT">Vice-Président</option>
          <option value="SECRETAIRE_GENERAL">Secrétaire Général</option>
          <option value="TRESORIER">Trésorier</option>
          <option value="CHARGE_COMMUNICATION">Chargé de communication</option>
          <option value="AUTRE">Autre</option>
        </select>
        <div>
          <label className="label">Photo (optionnel)</label>
          <input name="photo" type="file" accept="image/*" className="file-input file-input-bordered w-full" />
        </div>
        <button className="btn btn-primary" type="submit">Enregistrer</button>
      </form>
    </div>
  )
}