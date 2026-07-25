"use server"
import { prisma } from "@/src/lib/prisma"
import { supabase } from "@/src/lib/supabase"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function creerEvenement(formData: FormData) {
  const titre = formData.get("titre") as string
  const description = formData.get("description") as string
  const lieu = formData.get("lieu") as string
  const dateEvent = formData.get("dateEvent") as string
  const photo = formData.get("photo") as File

  let imageUrl: string | undefined

  if (photo && photo.size > 0) {
    const nomFichier = `evenements/${Date.now()}-${photo.name.replace(/\s+/g, "-")}`

    const { error } = await supabase.storage
      .from("aeestn-media")
      .upload(nomFichier, photo)

    if (error) throw new Error("Échec de l'upload : " + error.message)

    const { data: urlData } = supabase.storage
      .from("aeestn-media")
      .getPublicUrl(nomFichier)

    imageUrl = urlData.publicUrl
  }

  await prisma.evenement.create({
    data: {
      titre,
      description,
      lieu: lieu || undefined,
      dateEvent: new Date(dateEvent),
      imageUrl,
    },
  })

  revalidatePath("/admin/evenements")
  redirect("/admin/evenements")
}