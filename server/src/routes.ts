import { Router } from "express";
import GameController from "./modules/games/controllers/GameController";
import AdController from "./modules/ads/controllers/AdController";
import SessionController from "./modules/sessions/controllers/SessionController";
import session from "express-session";
import passport from "passport";
import discordStrategy from "./strategies/discordStrategy";
import routerSessions from "./modules/sessions/controllers/sessions.routes";

const routes = Router();
const gameController = new GameController();
const adController = new AdController();
const sessionController = new SessionController();

discordStrategy()

routes.use(
  session({
    secret: "xiii is secret",
    cookie: {
      maxAge: 60000 * 60 * 24, // ???
    },
    saveUninitialized: false,
  })
);

routes.use(passport.initialize());
routes.use(passport.session());

routes.get("/games", gameController.list); // Get all games

routes.post("/games/:id/ads", adController.create); // Create ad

routes.get("/games/:id/ads", adController.list); //List ads from a game.

routes.get("/ads/:id/discord", adController.discord); // Get discord from ad

routes.use("/auth", routerSessions);

export default routes;
