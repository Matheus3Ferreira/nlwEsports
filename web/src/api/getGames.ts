import axios from "axios";
import { Game } from "../pages/Home";

export default async function getGames(
  setGames: React.Dispatch<React.SetStateAction<Game[]>>
) {
  await axios.get("http://localhost:3333/api/games").then((response) => {
    setGames(response.data);
  });
}
