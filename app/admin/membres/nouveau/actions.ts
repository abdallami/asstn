"use server"
import { prisma } from "@/src/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function creerMembre(formData: FormData) {
  await prisma.membre.create({
    data: {
      nom: formData.get("nom") as string,
      prenom: formData.get("prenom") as string,
      filiere: formData.get("filiere") as string,
      universite: formData.get("universite") as string,
      promotion: (formData.get("promotion") as string) || undefined,
      telephone: (formData.get("telephone") as string) || undefined,
      role: ((formData.get("role") as string) || undefined) as any,
    },
  })

  revalidatePath("/admin/membres")
  redirect("/admin/membres")
}