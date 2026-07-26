import { prisma } from "@/src/lib/prisma"
import { LigneRoute } from "@/app/components/LigneRoute"
import Image from "next/image"

const LABELS_ROLE: Record<string, string> = {
  PRESIDENT: "Président",
  VICE_PRESIDENT: "Vice-Président",
  SECRETAIRE_GENERAL: "Secrétaire Général",
  TRESORIER: "Trésorier",
  CHARGE_COMMUNICATION: "Chargé de communication",
  AUTRE: "Membre du bureau",
}

function InitialesAvatar({ prenom, nom }: { prenom: string; nom: string }) {
  const initiales = `${prenom[0] ?? ""}${nom[0] ?? ""}`.toUpperCase()
  return (
    <div className="h-full w-full flex items-center justify-center bg-indigo/10 text-indigo font-display text-2xl">
      {initiales}
    </div>
  )
}

export default async function Annuaire() {
  const membres = await prisma.membre.findMany({ orderBy: { nom: "asc" } })
  const bureau = membres.filter((m) => m.role)
  const simples = membres.filter((m) => !m.role)

  const CarteMembre = ({ m, mise = false }: { m: (typeof membres)[number]; mise?: boolean }) => (
    <div className={`rounded-2xl overflow-hidden ${mise ? "bg-indigo text-papier" : "bg-base-200"}`}>
      <div className="h-40 relative">
        {m.photoUrl ? (
          <Image src={m.photoUrl} alt={`${m.prenom} ${m.nom}`} fill className="object-cover" />
        ) : (
          <InitialesAvatar prenom={m.prenom} nom={m.nom} />
        )}
      </div>
      <div className="p-5">
        {m.role && (
          <span className={`font-mono text-xs tracking-widest uppercase ${mise ? "text-sable" : "text-steel"}`}>
            {LABELS_ROLE[m.role]}
          </span>
        )}
        <h3 className={`font-display text-lg mt-1 ${mise ? "text-papier" : "text-indigo"}`}>
          {m.prenom} {m.nom}
        </h3>
        <p className={`font-body text-sm mt-1 ${mise ? "text-papier/70" : "text-encre/60"}`}>
          {m.filiere} · {m.universite}
        </p>
        {m.promotion && (
          <p className={`font-mono text-xs mt-2 ${mise ? "text-papier/50" : "text-encre/40"}`}>
            {m.promotion}
          </p>
        )}
      </div>
    </div>
  )

  return (
    <div>
      <section className="max-w-6xl mx-auto px-4 md:px-8 pt-16 pb-10 text-center">
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-sable mb-3">Communauté</p>
        <h1 className="font-display text-3xl md:text-4xl text-indigo">Annuaire des membres</h1>
        <p className="font-body text-encre/60 mt-3">{membres.length} membres inscrits à l&apos;AEESTN</p>
      </section>

      <LigneRoute />

      <section className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        {bureau.length > 0 && (
          <>
            <h2 className="font-display text-xl text-indigo mb-6">Bureau exécutif</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 mb-14">
              {bureau.map((m) => <CarteMembre key={m.id} m={m} mise />)}
            </div>
          </>
        )}

        <h2 className="font-display text-xl text-indigo mb-6">Membres</h2>
        {simples.length === 0 ? (
          <p className="font-body text-encre/50">Aucun membre pour le moment.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {simples.map((m) => <CarteMembre key={m.id} m={m} />)}
          </div>
        )}
      </section>
    </div>
  )
}