"use server"
import { prisma } from "@/src/lib/prisma"
import { revalidatePath } from "next/cache"

export async function supprimerActualites(ids: string[]) {
  await prisma.actualite.deleteMany({ where: { id: { in: ids } } })
  revalidatePath("/admin/actualites")
  revalidatePath("/actualites")
}