import logoImg from "../assets/logo-nlw-esports.svg";
import { GameBanner } from "../components/GameBanner";
import { CreateAdBanner } from "../components/CreateAdBanner";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { CreateAdModal } from "../components/CreateAdModal";
import axios from "axios";
import ProfileButton from "../components/ProfileButton";
import { useSearchParams } from "react-router-dom";
import getGames from "../api/getGames";
import getUserDiscordData from "../api/auth/getUserDiscordData";

export interface Game {
  bannerUrl: string;
  id: string;
  title: string;
  _count: { ads: number };
}

export interface IUserData {
  id: string;
  avatar: string;
  username: string;
  discriminator: string;
}

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [userData, setUserData] = useState<IUserData>({
    id: "",
    avatar: "",
    username: "",
    discriminator: "",
  });

  useEffect(() => {
    getGames(setGames);
  }, []);

  useEffect(() => {
    getUserDiscordData(setUserData);
  }, []);

  return (
    <div className="flex justify-center items-center flex-col my-20 px-5">
      <header className=" justify-between items-center flex w-[100%]">
        <div className="w-14 h-14" />
        <img src={logoImg} alt="" />
        {userData.id ? (
          <ProfileButton
            id={userData.id}
            avatar={userData.avatar}
            username={userData.username}
            discriminator={userData.discriminator}
          />
        ) : (
          <a
            className="font-semibold text-violet-600 m-7 hover:animate-shake"
            href="http://localhost:3333/api/auth/discord"
          >
            Conectar-se
          </a>
        )}
      </header>
      <h1 className="text-6xl text-white font-black mt-20 ">
        Seu{" "}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{" "}
        está aqui.
      </h1>
      <div className="grid grid-cols-6 gap-6 mt-16 max-w-[1344px]">
        {games.map((game) => (
          <GameBanner
            title={game.title}
            adsCount={game._count.ads}
            bannerUrl={game.bannerUrl}
            key={game.id}
          />
        ))}
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal games={games} />
      </Dialog.Root>
    </div>
  );
}
