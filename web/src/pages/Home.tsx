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
import getUserDiscordData from "../api/getUserDiscordData";
import getUserData from "../api/getUserData";
import GameSlider from "../components/GameSlider";

export interface IGame {
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

export interface IUserData {
  id: string;
  username: string;
  phone: string;
  whatsapp: boolean;
  discord?: IUserDiscordData | undefined;
}

export default function Home() {
  const [games, setGames] = useState<IGame[]>([]);
  const [gamesLoaded, setGamesLoaded] = useState<boolean>(false);
  const [userDiscordData, setUserDiscordData] = useState<IUserDiscordData>({
    id: "",
    avatar: "",
    username: "",
    discriminator: "",
  });

  const [userData, setUserData] = useState<IUserData>({
    id: "",
    username: "",
    phone: "",
    whatsapp: false,
    discord: userDiscordData || undefined,
  });
  const [whichModalIsOpen, setWhichModalIsOpen] = useState({
    signIn: false,
    signUp: false,
  });

  useEffect(() => {
    getGames(setGames);
  }, []);

  useEffect(() => {
    games.length > 0 && setGamesLoaded(true);
  }, [games]);

  useEffect(() => {
    if (localStorage.getItem("access_token_discord") !== null) {
      const token = localStorage.getItem("access_token_discord") as string;
      getUserDiscordData({ token, setUserDiscordData });
    }
    if (localStorage.getItem("jwt_token") !== null) {
      const token = localStorage.getItem("jwt_token") as string;
      getUserData({ token, setUserData });
    }
  }, []);
  console.log(localStorage);

  return (
    <div className="flex justify-center items-center flex-col my-20 px-5">
      <header className="justify-center items-center flex flex-col-reverse w-[100%] flex-wrap">
        <img src={logoImg} alt="" />
        <div className="relative self-end md:absolute md:right-4">
          <Dialog.Root>
            {userData.id ? (
              <ProfileButton
                id={userDiscordData.id || userData.id}
                avatar={userDiscordData.avatar}
                username={userDiscordData.username || userData.username}
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
                  <SignInModal
                    onChangeModal={setWhichModalIsOpen}
                    setUserData={setUserData}
                  />
                )}
                {whichModalIsOpen.signUp && (
                  <SignUpModal
                    onChangeModal={setWhichModalIsOpen}
                    setUserData={setUserData}
                  />
                )}
              </div>
            )}
          </Dialog.Root>
        </div>
      </header>

      <h1 className="text-6xl text-white font-black mt-20 ">
        Seu{" "}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{" "}
        está aqui.
      </h1>
      {gamesLoaded && <GameSlider games={games} />}
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal games={games} />
      </Dialog.Root>
    </div>
  );
}
