"use server"
import { prisma } from "@/src/lib/prisma"
import { revalidatePath } from "next/cache"

export async function supprimerMembres(ids: string[]) {
  await prisma.membre.deleteMany({ where: { id: { in: ids } } })
  revalidatePath("/admin/membres")
  revalidatePath("/annuaire")
}