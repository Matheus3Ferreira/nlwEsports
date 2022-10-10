import axios from "axios";

export default async function getDiscordUserData(accessToken: string) {
  const response = await axios.get("https://discord.com/api/users/@me", {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });

  return {
    id: response.data.id,
    avatar: response.data.avatar,
    username: response.data.username,
    discriminator: response.data.discriminator,
  };
}
