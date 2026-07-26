import { prisma } from "@/src/lib/prisma"
import Link from "next/link"
import Image from "next/image"
import { LigneRoute } from "../components/LigneRoute"
import {  IllustrationHero} from "@/app/components/IllustrationHero"

export default async function Accueil() {
  const [dernieresActus, prochainEvenement, nbMembres] = await Promise.all([
    prisma.actualite.findMany({ orderBy: { createdAt: "desc" }, take: 3 }),
    prisma.evenement.findFirst({
      where: { dateEvent: { gte: new Date() } },
      orderBy: { dateEvent: "asc" },
    }),
    prisma.membre.count(),
  ])

  return (
    <div>
      <section className="max-w-6xl mx-auto px-4 md:px-8 pt-16 md:pt-20 pb-16">
    <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
      {/* Texte — toujours en premier dans le DOM, donc en haut sur mobile */}
      <div className="text-center md:text-left">
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-sable mb-4">
          Association des Élèves, Étudiants et Stagiaires Tchadiens au Niger
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-indigo leading-tight">
          Une communauté qui traverse la distance ensemble.
        </h1>
        <p className="font-body text-lg text-encre/70 mt-6">
          Nous accompagnons chaque étudiant tchadien au Niger — logement, entraide académique,
          démarches administratives et vie associative.
        </p>
        <div className="flex gap-3 justify-center md:justify-start flex-wrap mt-8">
          <Link href="/annuaire" className="px-6 py-3 rounded-full bg-indigo text-papier font-body hover:bg-steel transition">
            Découvrir les membres
          </Link>
          <Link href="/contact" className="px-6 py-3 rounded-full border border-indigo text-indigo font-body hover:bg-indigo/5 transition">
            Nous rejoindre
          </Link>
        </div>
      </div>

      {/* Illustration — toujours en second dans le DOM, donc en bas sur mobile */}
      <div>
        <IllustrationHero />
      </div>
    </div>
  </section>
      <LigneRoute />

      {/* Stats */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-16 grid grid-cols-2 gap-8 text-center">
        <div>
          <p className="font-display text-4xl md:text-5xl text-indigo">{nbMembres}</p>
          <p className="font-mono text-xs tracking-widest uppercase text-encre/50 mt-2">Membres inscrits</p>
        </div>
        <div>
          <p className="font-display text-2xl md:text-3xl text-indigo leading-snug">
            {prochainEvenement ? prochainEvenement.titre : "Bientôt"}
          </p>
          <p className="font-mono text-xs tracking-widest uppercase text-encre/50 mt-2">Prochain événement</p>
        </div>
      </section>

      {/* Dernières actualités */}
      <section className="bg-base-200 py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex justify-between items-end mb-10">
            <h2 className="font-display text-2xl md:text-3xl text-indigo">Dernières actualités</h2>
            <Link href="/actualites" className="font-mono text-xs tracking-widest uppercase text-steel hover:text-indigo transition">
              Voir tout →
            </Link>
          </div>

          {dernieresActus.length === 0 ? (
            <p className="text-encre/50 font-body">Aucune actualité publiée pour le moment.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {dernieresActus.map((a) => (
                <article key={a.id} className="bg-papier rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
                  {a.imageUrl && (
                    <div className="h-44 relative">
                      <Image src={a.imageUrl} alt={a.titre} fill className="object-cover" />
                    </div>
                  )}
                  <div className="p-5">
                    <p className="font-mono text-xs text-encre/40 mb-2">
                      {a.createdAt.toLocaleDateString("fr-FR", { dateStyle: "long" })}
                    </p>
                    <h3 className="font-display text-lg text-indigo mb-2">{a.titre}</h3>
                    <p className="font-body text-sm text-encre/70 line-clamp-3">{a.contenu}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}