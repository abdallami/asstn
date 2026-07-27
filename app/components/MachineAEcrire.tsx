"use client"
import { useEffect, useState } from "react"

export function MachineAEcrire({ texte, delai = 35 }: { texte: string; delai?: number }) {
  const [affiche, setAffiche] = useState("")

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAffiche("")
    let i = 0
    const interval = setInterval(() => {
      i++
      setAffiche(texte.slice(0, i))
      if (i >= texte.length) clearInterval(interval)
    }, delai)
    return () => clearInterval(interval)
  }, [texte, delai])

  return (
    <span>
      {affiche}
      <span className="inline-block w-[3px] h-[1em] bg-indigo align-middle ml-1 animate-pulse" />
    </span>
  )
}