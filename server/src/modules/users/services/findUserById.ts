import { PrismaClient } from "@prisma/client";

export default async function findUserById(id: string) {
  const prisma = new PrismaClient();
  const user = await prisma.user.findFirst({
    where: {
      id: id,
    },
  });
  if (user) {
    user.password = "";
    return user;
  }
  return;
}
