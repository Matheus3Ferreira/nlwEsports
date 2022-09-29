import { Request, Response } from "express";

export default class SessionController {
  public async auth() {}
  public async redirect(request: Request, response: Response) {
    response.status(200).json({ discord: "Você me encontrou!" });
  }
}
