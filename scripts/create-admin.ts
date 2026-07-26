import "dotenv/config"
import { prisma } from "../src/lib/prisma"
import bcrypt from "bcryptjs"

async function main() {
  const email = process.env.ADMIN_EMAIL
  const motDePasse = process.env.ADMIN_PASSWORD
  const nom = process.env.ADMIN_NOM

  if (!email || !motDePasse || !nom) {
    throw new Error("ADMIN_EMAIL, ADMIN_PASSWORD et ADMIN_NOM doivent être définis dans .env")
  }

  const hash = await bcrypt.hash(motDePasse, 10)

  await prisma.adminUser.create({
    data: { email, motDePasseHash: hash, nom },
  })

  console.log("✅ Admin créé avec succès :", email)
}

main()
  .catch((e) => console.error("❌ Erreur :", e))
  .finally(() => prisma.$disconnect())