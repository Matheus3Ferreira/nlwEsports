import { PrismaClient } from "@prisma/client";
import { GameSchema } from "../interfaces";

export default async function listGames(): Promise<GameSchema[]> {
  const prisma = new PrismaClient();
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });
  return games;
}
