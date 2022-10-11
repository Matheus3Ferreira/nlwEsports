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
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    loop: false,
    mode: "snap",
    rtl: false,
    slides: {
      perView: "auto",
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

      <div className="h-[240px] max-w-[1344px]">
        <div ref={sliderRef} className="keen-slider" style={{ maxWidth: 1344 }}>
          {games.map((game) => (
            <GameBanner
              title={game.title}
              adsCount={game._count.ads}
              bannerUrl={game.bannerUrl}
              key={game.id}
            />
          ))}
        </div>
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
