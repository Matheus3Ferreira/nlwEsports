import { PrismaClient } from "@prisma/client";
import { convertHoursStringToMinutes } from "../../../utils/convert-hours-string-to-minutes";
import { IAdRequestResponse } from "../interfaces";

interface IRequest {
  adData: IAdRequestResponse;
  gameId: string;
}

export async function createAd({ adData, gameId }: IRequest) {
  const prisma = new PrismaClient();
  const ad = await prisma.ad.create({
    data: {
      gameId: gameId,
      name: adData.name,
      yearsPlaying: adData.yearsPlaying,
      discord: adData.discord,
      weekDays: adData.weekDays.join(","),
      hourStart: convertHoursStringToMinutes(adData.hourStart),
      hourEnd: convertHoursStringToMinutes(adData.hourEnd),
      useVoiceChannel: adData.useVoiceChannel,
    },
  });
  return ad;
}
