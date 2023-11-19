"use client";

import Image from "next/image";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import Label from "@/components/common/Label";
import Assets from "@/config/assets";

const banners = [Assets.Banner1, Assets.Banner2, Assets.Banner3];

const Banner = () => {
  const [currentBanner, setCurrentBanner] = useState<number>(0);

  const defaultStyle =
    "absolute top-1/2 z-10 translate-y-[-50%] cursor-pointer text-slate-300 duration-500 hover:text-white";

  const handlePrev = (e: MouseEvent) => {
    e.stopPropagation();
    const prevBanner = currentBanner - 1;
    setCurrentBanner(prevBanner);
  };

  const handleNext = (e: MouseEvent) => {
    e.stopPropagation();
    const nextBanner = currentBanner + 1;
    setCurrentBanner(nextBanner);
  };

  return (
    <div className="relative flex w-full overflow-hidden">
      {banners.map((banner, index) => (
        <div
          className="relative h-60 w-full shrink-0 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentBanner * 100}%)` }}
          key={index}>
          <Image src={banner} alt="배너 아이템" fill priority />
        </div>
      ))}
      {currentBanner > 0 && (
        <IoIosArrowBack
          size={30}
          onClick={handlePrev}
          className={`${defaultStyle} left-2`}
        />
      )}
      {currentBanner < banners.length - 1 && (
        <IoIosArrowForward
          size={30}
          onClick={handleNext}
          className={`${defaultStyle} right-2`}
        />
      )}
      <Label
        size="sm"
        className="cs:z-1 cs:bg-primary cs:absolute cs:bottom-4 cs:right-5 cs:shadow-down cs:h-6 text-white">
        {currentBanner + 1} / {banners.length}
      </Label>
    </div>
  );
};

export default Banner;
