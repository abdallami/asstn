import "dotenv/config";
import { prisma,  } from "../src/lib/prisma"
import bcrypt from "bcryptjs"


async function main() {
  const email = "president@aeestn.org"
  const motDePasse = "MotDePasseTemporaire123"
  const nom = "Président AEESTN"

  const hash = await bcrypt.hash(motDePasse, 10)

  await prisma.adminUser.create({
    data: { email, motDePasseHash: hash, nom },
  })

  console.log("✅ Admin créé avec succès :", email)
}

main()
  .catch((e) => console.error("❌ Erreur :", e))
  .finally(() => prisma.$disconnect())