import { Request, Response } from "express";
import findUserById from "../../users/services/findUserById";
import generateTokenService from "../services/generateToken";
import verifyCredentials from "../services/verifyCredentials";

export default class SessionStandardController {
  public async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const verifiedUser = await verifyCredentials({ email, password });
    if (!verifiedUser) {
      return response.status(400).json("Email or password not valid");
    }

    const token = generateTokenService(verifiedUser.id);

    return response.json(token);
  }
  public async me(request: Request, response: Response) {
    const id = request.userId;
    const user = await findUserById(id);
    if (!user) {
      return response
        .status(500)
        .json(
          "User not found after authenticate. Seems like there is something wrong in authentication middleware."
        );
    }
    return response.json(user);
  }
}
