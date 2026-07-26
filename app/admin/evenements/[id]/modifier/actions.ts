"use server"
import { prisma } from "@/src/lib/prisma"
import { supabase } from "@/src/lib/supabase"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function modifierEvenement(id: string, formData: FormData) {
  const photo = formData.get("photo") as File
  let imageUrl: string | undefined

  if (photo && photo.size > 0) {
    const nomFichier = `evenements/${Date.now()}-${photo.name.replace(/\s+/g, "-")}`
    const { error } = await supabase.storage.from("aeestn-media").upload(nomFichier, photo)
    if (error) throw new Error("Échec de l'upload : " + error.message)
    const { data } = supabase.storage.from("aeestn-media").getPublicUrl(nomFichier)
    imageUrl = data.publicUrl
  }

  await prisma.evenement.update({
    where: { id },
    data: {
      titre: formData.get("titre") as string,
      description: formData.get("description") as string,
      lieu: (formData.get("lieu") as string) || undefined,
      dateEvent: new Date(formData.get("dateEvent") as string),
      ...(imageUrl ? { imageUrl } : {}),
    },
  })

  revalidatePath("/admin/evenements")
  revalidatePath("/evenements")
  redirect("/admin/evenements")
}