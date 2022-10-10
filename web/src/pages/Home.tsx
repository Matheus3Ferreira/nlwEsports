import logoImg from "../assets/logo-nlw-esports.svg";
import { GameBanner } from "../components/GameBanner";
import { CreateAdBanner } from "../components/CreateAdBanner";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { CreateAdModal } from "../components/CreateAdModal";
import ProfileButton from "../components/ProfileButton";
import getGames from "../api/getGames";
import { SignInModal } from "../components/SignInModal";
import { SignUpModal } from "../components/SignUpModal";
import getUserDiscordData from "../api/auth/getUserDiscordData";

export interface Game {
  bannerUrl: string;
  id: string;
  title: string;
  _count: { ads: number };
}

export interface IUserDiscordData {
  id: string;
  avatar: string;
  username: string;
  discriminator: string;
}

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [userDiscordData, setUserDiscordData] = useState<IUserDiscordData>({
    id: "",
    avatar: "",
    username: "",
    discriminator: "",
  });
  const [whichModalIsOpen, setWhichModalIsOpen] = useState<{
    signIn: boolean;
    signUp: boolean;
  }>({
    signIn: false,
    signUp: false,
  });

  useEffect(() => {
    getGames(setGames);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("access_token_discord") !== null) {
      const token = localStorage.getItem("access_token_discord") as string;
      getUserDiscordData({ token, setUserDiscordData });
    }
  }, []);

  return (
    <div className="flex justify-center items-center flex-col my-20 px-5">
      <header className=" justify-between items-center flex w-[100%]">
        <div className="w-14 h-14" />
        <img src={logoImg} alt="" />
        <Dialog.Root>
          {userDiscordData.id ? (
            <ProfileButton
              id={userDiscordData.id}
              avatar={userDiscordData.avatar}
              username={userDiscordData.username}
              discriminator={userDiscordData.discriminator}
            />
          ) : (
            <div>
              <Dialog.Trigger
                onClick={() =>
                  setWhichModalIsOpen({
                    signIn: true,
                    signUp: false,
                  })
                }
                className="font-semibold text-violet-600 m-7 hover:animate-shake"
              >
                Conectar-se
              </Dialog.Trigger>
              {whichModalIsOpen.signIn && (
                <SignInModal onChangeModal={setWhichModalIsOpen} />
              )}
              {whichModalIsOpen.signUp && (
                <SignUpModal onChangeModal={setWhichModalIsOpen} />
              )}
            </div>
          )}
        </Dialog.Root>
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
