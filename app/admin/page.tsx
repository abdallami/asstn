import { prisma } from "@/src/lib/prisma"
export default async function TableauDeBord() {
  const [nbMembres, nbActus, nbEvenements] = await Promise.all([
    prisma.membre.count(),
    prisma.actualite.count(),
    prisma.evenement.count(),
  ])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Tableau de bord</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="stat bg-base-100 rounded-box shadow">
          <div className="stat-title">Membres</div>
          <div className="stat-value text-primary">{nbMembres}</div>
        </div>
        <div className="stat bg-base-100 rounded-box shadow">
          <div className="stat-title">Actualités</div>
          <div className="stat-value text-primary">{nbActus}</div>
        </div>
        <div className="stat bg-base-100 rounded-box shadow">
          <div className="stat-title">Événements</div>
          <div className="stat-value text-primary">{nbEvenements}</div>
        </div>
      </div>
    </div>
  )
}