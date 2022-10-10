import { Request, Response } from "express";
import generateTokenService from "../../sessions/services/generateToken";
import createUser, { IUser } from "../services/createUser";
import findUserByEmail from "../services/findUserByEmail";
import findUserById from "../services/findUserById";

export default class UserController {
  public async create(request: Request, response: Response) {
    const { username, password, email, phone, whatsapp, discordId } =
      request.body as IUser;

    if (!username || !email || !password) {
      return response.status(400).json({ message: "Some data is missing. :(" });
    }

    if (await findUserByEmail(email)) {
      return response.status(400).json({ message: "User already exists :(" });
    }

    const newUser = await createUser({
      username,
      password,
      email,
      phone,
      whatsapp,
      discordId,
    });

    const token = generateTokenService(newUser.id);

    return response.status(201).json(token);
  }
  public async findOne(request: Request, response: Response) {
    const { id } = request.params;
    const user = await findUserById(id);

    return response.json(user);
  }
}
