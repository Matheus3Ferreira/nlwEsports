import { PrismaClient } from "@prisma/client";

export default async function findUserByEmail(email: string) {
  const prisma = new PrismaClient();
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  return user;
}
