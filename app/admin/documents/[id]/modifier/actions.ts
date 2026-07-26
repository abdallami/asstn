"use server"
import { prisma } from "@/src/lib/prisma"
import { supabase } from "@/src/lib/supabase"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function modifierDocument(id: string, formData: FormData) {
  const fichier = formData.get("fichier") as File
  let fichierUrl: string | undefined

  if (fichier && fichier.size > 0) {
    const nomFichier = `documents/${Date.now()}-${fichier.name.replace(/\s+/g, "-")}`
    const { error } = await supabase.storage.from("aeestn-media").upload(nomFichier, fichier)
    if (error) throw new Error("Échec de l'upload : " + error.message)
    const { data } = supabase.storage.from("aeestn-media").getPublicUrl(nomFichier)
    fichierUrl = data.publicUrl
  }

  await prisma.document.update({
    where: { id },
    data: {
      titre: formData.get("titre") as string,
      categorie: (formData.get("categorie") as string) || undefined,
      ...(fichierUrl ? { fichierUrl } : {}),
    },
  })

  revalidatePath("/admin/documents")
  revalidatePath("/documents")
  redirect("/admin/documents")
}