"use server"
import { prisma } from "@/src/lib/prisma"
import { supabase } from "@/src/lib/supabase"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function creerDocument(formData: FormData) {
  const titre = formData.get("titre") as string
  const categorie = formData.get("categorie") as string
  const fichier = formData.get("fichier") as File

  if (!fichier || fichier.size === 0) {
    throw new Error("Un fichier est requis")
  }

  const nomFichier = `documents/${Date.now()}-${fichier.name.replace(/\s+/g, "-")}`

  const { error } = await supabase.storage
    .from("aeestn-media")
    .upload(nomFichier, fichier)

  if (error) throw new Error("Échec de l'upload : " + error.message)

  const { data: urlData } = supabase.storage
    .from("aeestn-media")
    .getPublicUrl(nomFichier)

  await prisma.document.create({
    data: {
      titre,
      categorie: categorie || undefined,
      fichierUrl: urlData.publicUrl,
    },
  })

  revalidatePath("/admin/documents")
  redirect("/admin/documents")
}