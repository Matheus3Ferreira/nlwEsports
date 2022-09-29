import { Strategy } from "passport-discord";
("passport-discord");
import passport from "passport";
import "dotenv";
import findUserByDiscordId from "../modules/users/services/findUserById";
import createDiscordUser from "../modules/users/services/createDiscordUser";

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
        const user = await findUserByDiscordId(profile.id);
        console.log(accessToken);
        try {
          if (!user) {
            if (!profile.avatar) {
              profile.avatar = "Undefined";
            }
            if (!profile.email) {
              profile.email = "Undefined";
            }
            const save = await createDiscordUser(
              profile.id,
              profile.username,
              profile.avatar,
              profile.email,
              profile.discriminator
            );
            done(null, save);
          } else {
            done(null, user);
          }
        } catch (error: any) {
          done(error.message, undefined);
        }
      }
    )
  );
}
