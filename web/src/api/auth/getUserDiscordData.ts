import axios from "axios";
import React from "react";
import { IUserDiscordData } from "../../pages/Home";

interface IPropsUserDiscord {
  token: string;
  setUserDiscordData: React.Dispatch<React.SetStateAction<IUserDiscordData>>;
}

export default async function getUserDiscordData({
  token,
  setUserDiscordData,
}: IPropsUserDiscord) {
  const data = await axios
    .get("https://discord.com/api/users/@me", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then(({ data }) =>
      setUserDiscordData({
        username: data.username,
        avatar: data.avatar,
        discriminator: data.discriminator,
        id: data.id,
      })
    );

  return data;
}
