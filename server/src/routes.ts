import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import GameController from "./modules/games/controllers/GameController";
import AdController from "./modules/ads/controllers/AdController";
import SessionDiscordController from "./modules/sessions/controllers/SessionDiscordController";
import session from "express-session";
import passport from "passport";
import discordStrategy from "./strategies/discordStrategy";
import UserController from "./modules/users/controllers/UserController";
import SessionStandardController from "./modules/sessions/controllers/SessionStandardController";
import ensureAuthenticated from "./middlewares/ensureAuthenticated";

const routes = Router();
const gameController = new GameController();
const adController = new AdController();
const sessionDiscordController = new SessionDiscordController();
const sessionStandardController = new SessionStandardController();
const userController = new UserController();

discordStrategy();

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

routes.get("/auth/discord", passport.authenticate("discord")); // Auth discord session
routes.get("/auth/discord/redirect", sessionDiscordController.redirect); // Redirect to correct status

routes.get("/users/:id", userController.findOne);

routes.post("/users", userController.create);

routes.post("/auth/users", sessionStandardController.create);

routes.get("/test/middleware", ensureAuthenticated); // Verify JWT. IMPLEMENT: OAuth Verifycation

export default routes;
