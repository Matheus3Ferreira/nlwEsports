import { Strategy } from "passport-discord";
("passport-discord");
import passport from "passport";
import "dotenv";
import findUserDiscord from "../modules/users/services/findUserDiscord";
import createDiscordUser from "../modules/sessions/services/createDiscordUser";
import createUser from "../modules/users/services/createUser";
import { User } from "@prisma/client";

export default function discordStrategy() {
  const scopes = ["identify", "email", "guilds"];

  if (
    !process.env.DISCORD_CLIENT_ID ||
    !process.env.DISCORD_CLIENT_SECRET ||
    !process.env.DISCORD_REDIRECT_URL
  ) {
    throw new Error("Invalid environment");
  }
  passport.use(
    new Strategy(
      {
        clientID: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
        callbackURL: process.env.DISCORD_REDIRECT_URL,
        scope: scopes,
      },
      async (accessToken, refreshToken, profile, done) => {
        const user = await findUserDiscord(profile.id);
        if (!user) {
          // Create user if it doesn't exist
          if (!profile.avatar) {
            profile.avatar = "Undefined";
          }
          if (!profile.email) {
            profile.email = "Undefined";
          }
          const newUser = await createUser({
            username: profile.username,
            email: profile.email,
          });
          if (!newUser) {
            return done(new Error("Create user failed"));
          }
          const userDiscord = await createDiscordUser(
            profile.id,
            profile.username,
            profile.avatar,
            profile.discriminator,
            newUser.id
          );
          done(null, userDiscord);
        } else {
          done(null, user);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user: User, done) => {
    done(null, user);
  });
}
