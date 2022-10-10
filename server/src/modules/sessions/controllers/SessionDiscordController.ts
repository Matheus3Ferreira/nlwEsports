import axios from "axios";
import { Request, Response } from "express";

export interface IDiscordUser {
  discordId: string;
  username: string;
  avatarId: string;
  email: string;
  discriminator: string;
  userId: string;
}

export default class SessionDiscordController {
  public async redirect(request: Request, response: Response) {
    const code = request.query.code as string;

    if (
      !process.env.DISCORD_CLIENT_ID ||
      !process.env.DISCORD_CLIENT_SECRET ||
      !process.env.DISCORD_REDIRECT_URL
    ) {
      return response.status(500).json({ message: "Invalid environments." });
    }
    const data = {
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: process.env.DISCORD_REDIRECT_URL,
    };
    try {
      const token = await axios.post(
        "https://discord.com/api/oauth2/token",
        new URLSearchParams(data),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      response.redirect(
        `http://127.0.0.1:5173/sign-in/discord/success?access_token=${token.data.access_token}&refresh_token=${token.data.refresh_token}`
      );
    } catch (err) {
      response.json(err);
    }
  }
}
