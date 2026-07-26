"use server"
import { signOut } from "@/auth"

export async function deconnexionAction() {
  await signOut({ redirectTo: "/admin/connexion" })
}