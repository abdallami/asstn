"use client"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function ConnexionAdmin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [erreur, setErreur] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  const res = await signIn("credentials", { email, password, redirect: false })
  if (res?.error) {
    setErreur("Email ou mot de passe incorrect")
  } else {
    router.push("/admin")
    router.refresh()
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <form onSubmit={handleSubmit} className="card w-96 bg-base-100 shadow-xl p-6 gap-4">
        <h1 className="text-xl font-bold text-primary">Espace réservé au bureau AEESTN</h1>
        <p className="text-sm opacity-60 -mt-2">Connectez-vous avec vos identifiants pour accéder à la gestion du site.</p>
        {erreur && <p className="text-error text-sm">{erreur}</p>}
        <input
          type="email" placeholder="Email" className="input input-bordered"
          value={email} onChange={(e) => setEmail(e.target.value)} required
        />
        <input
          type="password" placeholder="Mot de passe" className="input input-bordered"
          value={password} onChange={(e) => setPassword(e.target.value)} required
        />
        <button className="btn btn-primary" type="submit">
          Se connecter
        </button>
      </form>
    </div>
  )
}