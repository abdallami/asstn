"use client"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

export default function ConnexionAdmin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [erreur, setErreur] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErreur("")
    const res = await signIn("credentials", { email, password, redirect: false })
    if (res?.error) {
      setErreur("Email ou mot de passe incorrect")
    } else {
      router.push("/admin")
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-10 bg-base-200">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <Image src="/logo.jpeg" alt="Logo AEESTN" width={64} height={64} className="rounded-full" />
        </div>

        <form onSubmit={handleSubmit} className="card w-full bg-base-100 shadow-xl p-6 gap-4">
          <div className="text-center">
            <h1 className="text-xl font-bold text-primary">Espace réservé au bureau AEESTN</h1>
            <p className="text-sm opacity-60 mt-1">
              Connectez-vous avec vos identifiants pour accéder à la gestion du site.
            </p>
          </div>

          {erreur && <p className="text-error text-sm text-center">{erreur}</p>}

          <input
            type="email" placeholder="Email" className="input input-bordered w-full"
            value={email} onChange={(e) => setEmail(e.target.value)} required
          />
          <input
            type="password" placeholder="Mot de passe" className="input input-bordered w-full"
            value={password} onChange={(e) => setPassword(e.target.value)} required
          />
          <button className="btn btn-primary w-full" type="submit">Se connecter</button>
        </form>

        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-primary hover:underline">
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  )
}