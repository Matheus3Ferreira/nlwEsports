import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react.es";
import { IGame } from "../pages/Home";
import React from "react";
import { GameBanner } from "./GameBanner";

interface IProps {
  games: IGame[];
}

export default function GamesCarrosel({ games }: IProps) {
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 6,
      spacing: 24,
    },
  });

  return (
    <div ref={sliderRef} className="keen-slider flex mt-16 max-w-[1344px]">
      {games.map((game) => (
        <GameBanner
          title={game.title}
          adsCount={game._count.ads}
          bannerUrl={game.bannerUrl}
          key={game.id}
        />
      ))}
      {games.map((game) => (
        <GameBanner
          title={game.title}
          adsCount={game._count.ads}
          bannerUrl={game.bannerUrl}
          key={game.id}
        />
      ))}
    </div>
  );
}
