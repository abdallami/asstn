import { prisma } from "@/src/lib/prisma"
import Image from "next/image"
import { LigneRoute } from "@/app/components/LigneRoute"

export default async function Evenements() {
  const evenements = await prisma.evenement.findMany({ orderBy: { dateEvent: "desc" } })
  const aVenir = evenements.filter((e) => e.dateEvent >= new Date())
  const passes = evenements.filter((e) => e.dateEvent < new Date())

  const Carte = ({ e, attenue = false }: { e: (typeof evenements)[number]; attenue?: boolean }) => (
    <div className={`bg-base-200 rounded-2xl overflow-hidden ${attenue ? "opacity-60" : ""}`}>
      {e.imageUrl && (
        <div className="h-44 relative">
          <Image src={e.imageUrl} alt={e.titre} fill className="object-cover" />
        </div>
      )}
      <div className="p-6">
        <h3 className="font-display text-lg text-indigo mb-2">{e.titre}</h3>
        <p className="font-body text-sm text-encre/70">{e.description}</p>
       <p className="font-mono text-xs text-encre/50 mt-4">
        {e.dateEvent.toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short" })}
        {e.lieu && ` · ${e.lieu}`}
      </p>
      </div>
    </div>
  )

  return (
    <div>
      <section className="max-w-6xl mx-auto px-4 md:px-8 pt-16 pb-10 text-center">
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-sable mb-3">Agenda</p>
        <h1 className="font-display text-3xl md:text-4xl text-indigo">Événements</h1>
      </section>

      <LigneRoute />

      <section className="max-w-5xl mx-auto px-4 md:px-8 py-12">
        <h2 className="font-display text-xl text-indigo mb-6">À venir</h2>
        {aVenir.length === 0 ? (
          <p className="font-body text-encre/50 mb-14">Aucun événement à venir pour le moment.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 mb-14">
            {aVenir.map((e) => <Carte key={e.id} e={e} />)}
          </div>
        )}

        <h2 className="font-display text-xl text-indigo mb-6">Événements passés</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {passes.map((e) => <Carte key={e.id} e={e} attenue />)}
        </div>
      </section>
    </div>
  )
}