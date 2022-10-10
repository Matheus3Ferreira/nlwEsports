import { PrismaClient } from "@prisma/client";

interface User {
  discordId: string;
  username: string;
  password?: String;
  phone?: String;
  whatsapp?: Boolean;
}

export default async function findUserDiscord(
  id: string
): Promise<User | null> {
  const prisma = new PrismaClient();
  const user = await prisma.discordUser.findFirst({
    where: {
      discordId: id,
    },
  });

  return user;
}
