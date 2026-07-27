import { prisma } from "@/src/lib/prisma"
import Link from "next/link"
import Image from "next/image"
import { LigneRoute } from "@/app/components/LigneRoute"
import { IllustrationHero } from "@/app/components/IllustrationHero"
import { MachineAEcrire }from "@/app/components/MachineAEcrire"
import { Reveal } from "@/app/components/Reveal"
import { LogoPartenaire } from "@/app/components/LogoPartenaire"

const PARTENAIRES = [
  { nom: "Ambassade du Tchad au Niger", logo: "/partenaires/ambassade-tchad.jpeg" },
  { nom: "NITA Transfert d'Argent", logo: "/partenaires/nita.jpeg" },
  { nom: "Amana Transfert d'Argent", logo: "/partenaires/amana.jpeg" },
]

export default async function Accueil() {
  const [dernieresActus, prochainEvenement, nbMembres] = await Promise.all([
    prisma.actualite.findMany({ orderBy: { createdAt: "desc" }, take: 3 }),
    prisma.evenement.findFirst({ where: { dateEvent: { gte: new Date() } }, orderBy: { dateEvent: "asc" } }),
    prisma.membre.count(),
  ])

  return (
    <div>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 pt-16 md:pt-20 pb-16">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="text-center md:text-left">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-sable mb-4">
              Association des Élèves, Étudiants et Stagiaires Tchadiens au Niger
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-indigo leading-tight min-h-[1.4em] md:min-h-[2.8em]">
              <MachineAEcrire texte="Une communauté qui traverse la distance ensemble." />
            </h1>
            <p className="font-body text-lg text-encre/70 mt-6">
              Nous accompagnons chaque étudiant tchadien au Niger — logement, entraide académique,
              démarches administratives et vie associative.
            </p>
            <div className="flex gap-3 justify-center md:justify-start flex-wrap mt-8">
              <Link href="/annuaire" className="px-6 py-3 rounded-full bg-indigo text-papier font-body hover:bg-sable hover:scale-105 transition-all">
                Découvrir les membres
              </Link>
              <Link href="/contact" className="px-6 py-3 rounded-full border border-indigo text-indigo font-body hover:bg-indigo hover:text-papier transition-all">
                Nous rejoindre
              </Link>
            </div>
          </div>

          <div className="animate-flotter">
            <IllustrationHero />
          </div>
        </div>
      </section>

      <LigneRoute />

      {/* Stats — section sombre bleu/noir pour le contraste moderne */}
      <section className="bg-encre text-papier py-16">
        <Reveal>
          <div className="max-w-4xl mx-auto px-4 md:px-8 grid grid-cols-2 gap-8 text-center">
            <div className="group cursor-default">
              <p className="font-display text-4xl md:text-5xl text-papier group-hover:text-sable transition-colors">
                {nbMembres}
              </p>
              <p className="font-mono text-xs tracking-widest uppercase text-papier/50 mt-2">Membres inscrits</p>
            </div>
            <div className="group cursor-default">
              <p className="font-display text-2xl md:text-3xl text-papier group-hover:text-sable transition-colors leading-snug">
                {prochainEvenement ? prochainEvenement.titre : "Bientôt"}
              </p>
              <p className="font-mono text-xs tracking-widest uppercase text-papier/50 mt-2">Prochain événement</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Dernières actualités */}
      <section className="bg-base-200 py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <Reveal>
            <div className="flex justify-between items-end mb-10">
              <h2 className="font-display text-2xl md:text-3xl text-indigo">Dernières actualités</h2>
              <Link href="/actualites" className="font-mono text-xs tracking-widest uppercase text-steel hover:text-sable transition lien-souligne">
                Voir tout →
              </Link>
            </div>
          </Reveal>

          {dernieresActus.length === 0 ? (
            <p className="text-encre/50 font-body">Aucune actualité publiée pour le moment.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {dernieresActus.map((a, i) => (
                <Reveal key={a.id} delai={i * 120}>
                  <article className="bg-papier rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    {a.imageUrl && (
                      <div className="h-44 relative overflow-hidden">
                        <Image src={a.imageUrl} alt={a.titre} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
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
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Partenaires — section sombre également, pour encadrer les stats visuellement */}
      <section className="bg-indigo py-16">
        <Reveal>
          <div className="max-w-5xl mx-auto px-4 md:px-8 text-center">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-sable mb-3">Ils nous accompagnent</p>
            <h2 className="font-display text-2xl md:text-3xl text-papier mb-10">Partenaires</h2>

           <div className="overflow-hidden">
          <div className="flex w-max animate-defiler">
            {[...PARTENAIRES, ...PARTENAIRES].map((p, i) => (
              <div
                key={`${p.nom}-${i}`}
                className="w-56 shrink-0 mx-3 bg-papier/5 border border-papier/15 rounded-2xl p-6 flex flex-col items-center gap-3 hover:bg-papier/10 hover:border-sable/60 transition-all duration-300"
              >
                <LogoPartenaire nom={p.nom} logo={p.logo} />
                <p className="font-body text-sm text-papier/80 text-center">{p.nom}</p>
              </div>
            ))}
          </div>
        </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
