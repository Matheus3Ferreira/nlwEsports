import { PrismaClient } from "@prisma/client";

export default async function getDiscordByAd(
  adId: string
): Promise<{ discord: string }> {
  const prisma = new PrismaClient();
  const discord = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });
  return discord;
}
