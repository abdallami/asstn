"use server"
import { prisma } from "@/src/lib/prisma"
import { revalidatePath } from "next/cache"

export async function supprimerDocuments(ids: string[]) {
  await prisma.document.deleteMany({ where: { id: { in: ids } } })
  revalidatePath("/admin/documents")
  revalidatePath("/documents")
} 