import axios from "axios";
import { request, Request, Response, Router } from "express";
import passport from "passport";
import SessionController from "./SessionController";

const routerSessions = Router();
const sessionController = new SessionController();

routerSessions.get("/discord", passport.authenticate("discord"));

routerSessions.get("/redirect", async (req: Request, res: Response) => {
  console.log(req);
  if (
    !process.env.DISCORD_CLIENT_ID ||
    !process.env.DISCORD_CLIENT_SECRET ||
    !process.env.DISCORD_REDIRECT_URL
  ) {
    throw new Error("Invalid discord developer data.");
  }
  const params = new URLSearchParams();
  const code = req.query.code;

  if (typeof code !== "string") throw new Error("Invalid code.");

  params.append("client_id", process.env.DISCORD_CLIENT_ID);
  params.append("client_secret", process.env.DISCORD_CLIENT_SECRET);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", process.env.DISCORD_REDIRECT_URL);
  params.append("scope", "identify");
  try {
    const response = await axios.post(
      "https://discord.com/api/oauth2/token",
      params,
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
      }
    );
    res.redirect(
      `http://127.0.0.1:5173/?access_token=${response.data.access_token}&refresh_token=${response.data.refresh_token}`
    );
  } catch (err) {
    res.json(err);
  }
});

export default routerSessions;
