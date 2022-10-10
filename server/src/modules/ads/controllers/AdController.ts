import { Request, Response } from "express";
import findAdsbyGameService from "../services/findAdsByGameService";
import { createAd } from "../services/createAd";
import { IAdRequestResponse, IAdSchema } from "../interfaces";
import getDiscordByAd from "../services/getDiscordByAd";

export default class AdController {
  public async list(request: Request, response: Response): Promise<Response> {
    const gameId = request.params.id;
    const ads: IAdRequestResponse[] = await findAdsbyGameService(gameId);

    return response.json(ads);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const gameId = request.params.id;
    const adData: IAdRequestResponse = request.body;
    const ad: IAdSchema = await createAd({ gameId, adData });

    return response.status(201).json(ad);
  }

  public async discord(
    request: Request,
    response: Response
  ): Promise<Response> {
    const adId = request.params.id;

    const discord = await getDiscordByAd(adId);
    return response.json(discord);
  }
}
