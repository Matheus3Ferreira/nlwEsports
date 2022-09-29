import { PrismaClient } from "@prisma/client";
import { convertHoursStringToMinutes } from "../../../utils/convert-hours-string-to-minutes";
import { IAdRequestResponse } from "../interfaces";

interface IRequest {
  body: IAdRequestResponse;
  gameId: string;
}

export async function createAd({ body, gameId }: IRequest) {
  const prisma = new PrismaClient();
  const ad = await prisma.ad.create({
    data: {
      gameId: gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(","),
      hourStart: convertHoursStringToMinutes(body.hourStart),
      hourEnd: convertHoursStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    },
  });
  return ad;
}
