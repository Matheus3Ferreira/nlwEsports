import { useState } from "react";
import { IUserData } from "../pages/Home";

export default function ProfileButton({
  id,
  avatar,
  username,
  discriminator,
}: IUserData) {
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  function handleKeyPress(e: React.KeyboardEvent): void {
    if (e.key === "Escape") {
      setIsProfileOpen(false);
    }
  }

  return (
    <div
      className="flex flex-col gap-2 justify-self-end"
      onKeyDown={handleKeyPress}
    >
      <button
        onClick={() => setIsProfileOpen(!isProfileOpen)}
        className="flex items-center gap-2 relative right-14"
      >
        <img
          src={`https://cdn.discordapp.com/avatars/${id}/${avatar}.png`}
          alt=""
          className="w-14 h-14 rounded-full"
        />
      </button>
      {isProfileOpen && (
        <div className="flex items-center justify-end gap-6 bg-zinc-900 p-3 rounded-md absolute mt-16 right-14">
          <div>
            <p className="text-white">Olá</p>
            <span className="text-white font-semibold text-lg">
              {username}
              <span className="text-zinc-600 font-normal">
                #{discriminator}
              </span>
            </span>
          </div>
          <button className="text-red-600">Log Out</button>
        </div>
      )}
    </div>
  );
}
