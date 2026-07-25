"use server"
import { prisma } from "@/src/lib/prisma"
import { supabase } from "@/src/lib/supabase"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function creerActualite(formData: FormData) {
  const titre = formData.get("titre") as string
  const contenu = formData.get("contenu") as string
  const photo = formData.get("photo") as File

  let imageUrl: string | undefined

  if (photo && photo.size > 0) {
    const nomFichier = `actus/${Date.now()}-${photo.name.replace(/\s+/g, "-")}`

    const { error } = await supabase.storage
      .from("aeestn-media")
      .upload(nomFichier, photo)

    if (error) {
      throw new Error("Échec de l'upload de la photo : " + error.message)
    }

    const { data: urlData } = supabase.storage
      .from("aeestn-media")
      .getPublicUrl(nomFichier)

    imageUrl = urlData.publicUrl
  }

  await prisma.actualite.create({
    data: { titre, contenu, imageUrl, publiePar: "Bureau AEESTN" },
  })

  revalidatePath("/admin/actualites")
  redirect("/admin/actualites")
}