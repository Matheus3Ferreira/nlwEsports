import * as Dialog from "@radix-ui/react-dialog";
import { DiscordLogo, User } from "phosphor-react";
import { Input } from "./Form/Input";

import { FormEvent, SetStateAction, useState } from "react";
import { Link } from "react-router-dom";
import DiscordButton from "./Form/DiscordButton";

interface ISignInProps {
  onChangeModal: React.Dispatch<
    SetStateAction<{ signIn: boolean; signUp: boolean }>
  >;
}

export function SignInModal({ onChangeModal }: ISignInProps) {
  async function handleFormSubmit(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    // await axios.post("http://localhost:3333/api/auth/user", data); IMPLEMENT AFTER BACKEND
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[540px] shadow-lg shadow-black/45">
        <div className="flex justify-between">
          <span className="text-white text-sm">Sign In</span>
          <button
            className="text-violet-600 text-sm"
            onClick={() => onChangeModal({ signIn: false, signUp: true })}
          >
            Register
          </button>
        </div>
        <Dialog.Title className="text-3xl font-black">
          Encontre já o seu novo duo
        </Dialog.Title>
        <form
          action=""
          onSubmit={handleFormSubmit}
          className="mt-8 flex flex-col gap-4 justify-center"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Username</label>
            <Input
              name="username"
              type="text"
              id="username"
              placeholder="JoãoBananinha2"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password">Senha</label>
            <Input
              name="password"
              type="password"
              id="password"
              placeholder="••••••••••"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-auto bg-zinc-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-zinc-600"
            >
              <User className="w-8 h-8" />
              Conectar-se
            </button>
          </div>
          <div className="flex text-zinc-900 items-center gap-3 font-black">
            <div className="w-[100%] h-[1px] bg-zinc-900"></div>ou
            <div className="w-[100%] h-[1px] bg-zinc-900"></div>
          </div>
          <footer className="mt-4 flex justify-center gap-4">
            <DiscordButton />
          </footer>
        </form>

        <Dialog.Description />
      </Dialog.Content>
    </Dialog.Portal>
  );
}
