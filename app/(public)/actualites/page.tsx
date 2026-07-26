import { prisma } from "@/src/lib/prisma"
import Image from "next/image"

export default async function Actualites() {
  const actus = await prisma.actualite.findMany({ orderBy: { createdAt: "desc" } })

  return (
    <div>
      <section className="max-w-6xl mx-auto px-4 md:px-8 pt-16 pb-10 text-center">
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-sable mb-3">Vie associative</p>
        <h1 className="font-display text-3xl md:text-4xl text-indigo">Actualités</h1>
      </section>

      <section className="max-w-5xl mx-auto px-4 md:px-8 py-12">
        {actus.length === 0 ? (
          <p className="font-body text-encre/50 text-center">Aucune actualité publiée pour le moment.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {actus.map((a) => (
              <article key={a.id} className="bg-base-200 rounded-2xl overflow-hidden">
                {a.imageUrl && (
                  <div className="h-52 relative">
                    <Image src={a.imageUrl} alt={a.titre} fill className="object-cover" />
                  </div>
                )}
                <div className="p-6">
                  <p className="font-mono text-xs text-encre/40 mb-2">
                    {a.createdAt.toLocaleDateString("fr-FR", { dateStyle: "long" })}
                  </p>
                  <h2 className="font-display text-xl text-indigo mb-3">{a.titre}</h2>
                  <p className="font-body text-encre/70 whitespace-pre-line">{a.contenu}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}