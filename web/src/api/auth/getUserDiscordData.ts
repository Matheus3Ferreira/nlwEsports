import axios from "axios";
import React from "react";
import { IUserData } from "../../pages/Home";

export default async function getUserDiscordData(
  setUserData: React.Dispatch<React.SetStateAction<IUserData>>
) {
  const parsedUrl = new URL(window.location.href);
  const accessToken = parsedUrl.searchParams.get("access_token");

  await axios
    .get("https://discord.com/api/users/@me", {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) =>
      setUserData({
        id: response.data.id,
        avatar: response.data.avatar,
        username: response.data.username,
        discriminator: response.data.discriminator,
      })
    );

  return;
}
