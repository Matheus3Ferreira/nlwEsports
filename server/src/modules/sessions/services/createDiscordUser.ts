import { PrismaClient } from "@prisma/client";

export default function createDiscordUser(
  discordId: string,
  username: string,
  avatarId: string,
  discriminator: string,
  userId: string
) {
  const prisma = new PrismaClient();

  const user = prisma.discordUser.create({
    data: {
      discordId: discordId,
      username: username,
      avatarId: avatarId,
      discriminator: discriminator,
      userId: userId,
    },
  });

  return user;
}
