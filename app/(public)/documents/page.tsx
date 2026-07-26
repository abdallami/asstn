import { prisma } from "@/src/lib/prisma"


export default async function Documents() {
  const documents = await prisma.document.findMany({ orderBy: { createdAt: "desc" } })

  return (
    <div>
      <section className="max-w-6xl mx-auto px-4 md:px-8 pt-16 pb-10 text-center">
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-sable mb-3">Ressources</p>
        <h1 className="font-display text-3xl md:text-4xl text-indigo">Documents</h1>
        <p className="font-body text-encre/60 mt-3">Statuts, règlement intérieur, procès-verbaux</p>
      </section>

     

      <section className="max-w-3xl mx-auto px-4 md:px-8 py-12">
        <div className="bg-base-200 rounded-2xl divide-y divide-indigo/10">
          {documents.length === 0 ? (
            <p className="font-body text-encre/50 p-6 text-center">Aucun document disponible pour le moment.</p>
          ) : (
            documents.map((d) => (
              <a
                key={d.id}
                href={d.fichierUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-5 hover:bg-indigo/5 transition"
              >
                <div>
                  <p className="font-body font-medium text-encre">{d.titre}</p>
                  {d.categorie && (
                    <span className="font-mono text-xs uppercase tracking-wide text-steel mt-1 inline-block">
                      {d.categorie}
                    </span>
                  )}
                </div>
                <span className="font-mono text-xs text-indigo">Télécharger →</span>
              </a>
            ))
          )}
        </div>
      </section>
    </div>
  )
}