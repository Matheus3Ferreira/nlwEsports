import { PrismaClient } from "@prisma/client";
import { convertMinutesToHoursString } from "../../../utils/convert-minutes-to-hours-string";
import { IAdSchema } from "../interfaces";

export default async function findAdsbyGameService(gameId: string) {
  const prisma = new PrismaClient();

  const ads: IAdSchema[] = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      yearsPlaying: true,
      weekDays: true,
      hourStart: true,
      hourEnd: true,
      useVoiceChannel: true,
      discord: true,
    },
    where: { gameId },
    orderBy: {
      createdAt: "desc",
    },
  });
  return ads.map((ad) => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(","),
      hourStart: convertMinutesToHoursString(ad.hourStart),
      hourEnd: convertMinutesToHoursString(ad.hourEnd),
    };
  });
}
