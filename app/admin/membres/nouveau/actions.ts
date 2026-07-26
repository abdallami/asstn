"use server"
import { prisma } from "@/src/lib/prisma"
import { supabase } from "@/src/lib/supabase"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function creerMembre(formData: FormData) {
  const photo = formData.get("photo") as File
  let photoUrl: string | undefined

  if (photo && photo.size > 0) {
    const nomFichier = `membres/${Date.now()}-${photo.name.replace(/\s+/g, "-")}`

    const { error } = await supabase.storage
      .from("aeestn-media")
      .upload(nomFichier, photo)

    if (error) throw new Error("Échec de l'upload de la photo : " + error.message)

    const { data: urlData } = supabase.storage
      .from("aeestn-media")
      .getPublicUrl(nomFichier)

    photoUrl = urlData.publicUrl
  }

  await prisma.membre.create({
    data: {
      nom: formData.get("nom") as string,
      prenom: formData.get("prenom") as string,
      filiere: formData.get("filiere") as string,
      universite: formData.get("universite") as string,
      promotion: (formData.get("promotion") as string) || undefined,
      telephone: (formData.get("telephone") as string) || undefined,
      role: ((formData.get("role") as string) || undefined) as any,
      photoUrl,
    },
  })

  revalidatePath("/admin/membres")
  redirect("/admin/membres")
}