import { Request, Response } from "express";
import findUserByEmail from "../../users/services/findUserByEmail";
import generateTokenService from "../services/generateToken";
import verifyCredentials from "../services/verifyCredentials";

export default class SessionStandardController {
  public async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const verifiedUser = await verifyCredentials({ email, password });
    if (!verifiedUser) {
      throw new Error("Email or password not valid");
    }
    verifiedUser.password = "";

    const token = generateTokenService(verifiedUser.id);

    return response.json({ verifiedUser, token });
  }
}
