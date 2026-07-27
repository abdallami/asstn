"use client"
import Image from "next/image"
import { useState } from "react"

export function LogoPartenaire({ nom, logo }: { nom: string; logo: string }) {
  const [erreur, setErreur] = useState(false)

  if (erreur) {
    return (
      <div className="h-16 w-16 flex items-center justify-center rounded-full bg-papier/10 text-papier/60 font-display text-xl">
        {nom.split(" ").map((mot) => mot[0]).slice(0, 2).join("")}
      </div>
    )
  }

  return (
    <div className="h-16 w-16 relative flex items-center justify-center">
      <Image src={logo} alt={nom} fill className="object-contain" onError={() => setErreur(true)} />
    </div>
  )
}