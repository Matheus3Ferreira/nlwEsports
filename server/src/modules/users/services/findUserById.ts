import { PrismaClient } from "@prisma/client";

interface User {
  discordId: string;
  username: string;
}

export default async function findUserByDiscordId(
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
