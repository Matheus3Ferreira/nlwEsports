import "keen-slider/keen-slider.min.css";

interface GameBannerProps {
  title: string;
  adsCount: number;
  bannerUrl: string;
}

export function GameBanner({ title, adsCount, bannerUrl }: GameBannerProps) {
  return (
    <a href="" className="rounded-lg overflow-hidden keen-slider__slide">
      <img src={bannerUrl} alt="" className=" h-[272px] w-[204px]" />
      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
        <strong className="font-bold text-white block">{title}</strong>
        <span className="text-zinc-300 text-sm block">
          {adsCount === 1 ? `${adsCount} anúncio` : `${adsCount} anúncios`}
        </span>
      </div>
    </a>
  );
}
