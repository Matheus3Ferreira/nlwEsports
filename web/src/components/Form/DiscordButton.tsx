import { DiscordLogo } from "phosphor-react";
import { Link } from "react-router-dom";

export default function DiscordButton() {
  return (
    <Link to="/redirect/discord">
      <button
        className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
        type="submit"
      >
        <DiscordLogo size={32} />
        Conecte-se com Discord
      </button>
    </Link>
  );
}
