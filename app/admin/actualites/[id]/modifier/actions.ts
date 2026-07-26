"use server"
import { prisma } from "@/src/lib/prisma"
import { supabase } from "@/src/lib/supabase"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function modifierActualite(id: string, formData: FormData) {
  const photo = formData.get("photo") as File
  let imageUrl: string | undefined

  if (photo && photo.size > 0) {
    const nomFichier = `actus/${Date.now()}-${photo.name.replace(/\s+/g, "-")}`
    const { error } = await supabase.storage.from("aeestn-media").upload(nomFichier, photo)
    if (error) throw new Error("Échec de l'upload : " + error.message)
    const { data } = supabase.storage.from("aeestn-media").getPublicUrl(nomFichier)
    imageUrl = data.publicUrl
  }

  await prisma.actualite.update({
    where: { id },
    data: {
      titre: formData.get("titre") as string,
      contenu: formData.get("contenu") as string,
      ...(imageUrl ? { imageUrl } : {}),
    },
  })

  revalidatePath("/admin/actualites")
  revalidatePath("/actualites")
  redirect("/admin/actualites")
}