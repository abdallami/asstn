import { prisma } from "./src/lib/prisma"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { authConfig } from "./auth.config"

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email" },
        password: { label: "Mot de passe", type: "password" },
      },
      authorize: async (credentials) => {
        const admin = await prisma.adminUser.findUnique({
          where: { email: credentials.email as string },
        })
        if (!admin) return null

        const valide = await bcrypt.compare(
          credentials.password as string,
          admin.motDePasseHash
        )
        if (!valide) return null

        return { id: admin.id, email: admin.email, name: admin.nom }
      },
    }),
  ],
  session: { strategy: "jwt" },
  cookies: {
    sessionToken: {
      name: "authjs.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        // Pas de maxAge défini → cookie de session : supprimé à la fermeture du navigateur
      },
    },
  },
})