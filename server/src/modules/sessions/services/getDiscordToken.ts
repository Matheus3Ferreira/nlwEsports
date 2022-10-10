import axios, { AxiosResponse } from "axios";

export default async function getDiscordToken(params: URLSearchParams) {
  const responseUserData = await axios.post(
    "https://discord.com/api/oauth2/token",
    params,
    {
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
    }
  );
  return responseUserData.data;
}
