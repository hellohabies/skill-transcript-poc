import { prisma } from "../config/prisma";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

async function main() {
  const admin = await prisma.admin.create({
    data: {
      user: {
        create: {
          email: "admin@skill-transcript.com",
          firstName: "System",
          lastName: "Administrator",
          nameTitle: "Mr.",
          password: await bcrypt.hash("P@ssw0rd", SALT_ROUNDS),
          role: "ADMIN",
          sex: "OTHER",
        },
      },
    },
  });

  console.log(`Admin created with ID: ${admin.userId}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
