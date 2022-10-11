import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react.es";
import { IGame } from "../pages/Home";
import React, { useState } from "react";
import { GameBanner } from "./GameBanner";
import { CaretLeft, CaretRight } from "phosphor-react";

interface IProps {
  games: IGame[];
}

export default function GamesCarrosel({ games }: IProps) {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    slides: {
      perView: 6,
      spacing: 24,
    },
  });
  return (
    <div className="flex mt-16 items-center">
      <Arrow
        left
        onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
        disabled={currentSlide === 0}
      />
      <div
        ref={sliderRef}
        className="keen-slider max-w-[1344px] h-[270px] overflow-hidden"
      >
        {games.map((game) => (
          <GameBanner
            title={game.title}
            adsCount={game._count.ads}
            bannerUrl={game.bannerUrl}
            key={game.id}
          />
        ))}
      </div>

      <Arrow
        onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
        disabled={
          instanceRef.current &&
          currentSlide === instanceRef.current.track.details.slides.length - 6
        }
      />
    </div>
  );
}

function Arrow(props: {
  disabled: boolean | null;
  left?: boolean;
  onClick: (e: any) => void;
}) {
  const disabeld = props.disabled ? " arrow--disabled" : "";
  return (
    <button
      onClick={props.onClick}
      className={`${props.left ? "mr-6" : "ml-6"} text-white`}
    >
      {props.left ? (
        <CaretLeft className={`${disabeld && "text-zinc-600"}`} size={60} />
      ) : (
        <CaretRight className={`${disabeld && "text-zinc-600"} `} size={60} />
      )}
    </button>
  );
}
