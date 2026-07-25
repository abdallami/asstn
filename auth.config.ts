import type { NextAuthConfig } from "next-auth"

export const authConfig: NextAuthConfig = {
  pages: { signIn: "/admin/connexion" },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const estConnecte = !!auth?.user
      const isAdminRoute = nextUrl.pathname.startsWith("/admin")
      const isLoginPage = nextUrl.pathname === "/admin/connexion"

      if (isAdminRoute && !isLoginPage && !estConnecte) {
        return false // redirige automatiquement vers pages.signIn
      }
      return true
    },
  },
  providers: [], // laissé vide ici, complété dans auth.ts
}