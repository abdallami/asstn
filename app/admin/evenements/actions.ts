"use server"
import { prisma } from "@/src/lib/prisma"
import { revalidatePath } from "next/cache"

export async function supprimerEvenements(ids: string[]) {
  await prisma.evenement.deleteMany({ where: { id: { in: ids } } })
  revalidatePath("/admin/evenements")
  revalidatePath("/evenements")
}