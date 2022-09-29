import { PrismaClient } from "@prisma/client";

export default function createDiscordUser(
  discordId: string,
  username: string,
  avatarId: string,
  email: string,
  discriminator: string
) {
  const prisma = new PrismaClient();

  const user = prisma.discordUser.create({
    data: {
      discordId: discordId,
      username: username + "#" + discriminator,
      avatarId: avatarId,
      email: email,
      discriminator: discriminator,
    },
  });

  return user;
}
