import { prisma } from "@/src/lib/prisma"
import { modifierMembre } from "./actions"
import { notFound } from "next/navigation"

export default async function ModifierMembre({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const membre = await prisma.membre.findUnique({ where: { id } })
  if (!membre) notFound()

  const action = modifierMembre.bind(null, id)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Modifier {membre.prenom} {membre.nom}</h1>
      <form action={action} className="card bg-base-100 shadow p-6 gap-4 max-w-lg">
        <input name="prenom" defaultValue={membre.prenom} placeholder="Prénom" className="input input-bordered" required />
        <input name="nom" defaultValue={membre.nom} placeholder="Nom" className="input input-bordered" required />
        <input name="filiere" defaultValue={membre.filiere} placeholder="Filière" className="input input-bordered" required />
        <input name="universite" defaultValue={membre.universite} placeholder="Université" className="input input-bordered" required />
        <input name="promotion" defaultValue={membre.promotion ?? ""} placeholder="Promotion" className="input input-bordered" />
        <input name="telephone" defaultValue={membre.telephone ?? ""} placeholder="Téléphone" className="input input-bordered" />
        <select name="role" defaultValue={membre.role ?? ""} className="select select-bordered">
          <option value="">Membre simple</option>
          <option value="PRESIDENT">Président</option>
          <option value="VICE_PRESIDENT">Vice-Président</option>
          <option value="SECRETAIRE_GENERAL">Secrétaire Général</option>
          <option value="TRESORIER">Trésorier</option>
          <option value="CHARGE_COMMUNICATION">Chargé de communication</option>
          <option value="AUTRE">Autre</option>
        </select>
        <label className="label cursor-pointer justify-start gap-2">
          <input type="checkbox" name="cotisationAJour" defaultChecked={membre.cotisationAJour} className="checkbox" />
          Cotisation à jour
        </label>
        <div>
          <label className="label">Remplacer la photo (optionnel)</label>
          <input name="photo" type="file" accept="image/*" className="file-input file-input-bordered w-full" />
        </div>
        <button className="btn btn-primary" type="submit">Enregistrer les modifications</button>
      </form>
    </div>
  )
}