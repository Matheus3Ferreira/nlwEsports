import { Request, Response } from "express";
import listGames from "../services/listGames";

export default class GameController {
  public async list(request: Request, response: Response): Promise<Response> {
    const games = await listGames();

    return response.status(200).json(games);
  }
}
