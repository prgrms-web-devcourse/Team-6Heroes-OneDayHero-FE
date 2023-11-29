"use client";

import Image, { StaticImageData } from "next/image";
import { useCallback, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type BannerProps = {
  banners: StaticImageData[];
};

const Banner = ({ banners }: BannerProps) => {
  const [currentBanner, setCurrentBanner] = useState<number>(0);

  const defaultStyle =
    "absolute top-1/2 z-10 translate-y-[-50%] cursor-pointer text-white text-opacity-50 duration-500 hover:text-white";

  const handlePrev = () => {
    setCurrentBanner((curr) => (curr === 0 ? banners.length - 1 : curr - 1));
  };

  const handleNext = useCallback(() => {
    setCurrentBanner((curr) => (curr === banners.length - 1 ? 0 : curr + 1));
  }, [banners]);

  useEffect(() => {
    if (!banners || banners.length === 0) return;
    const slideInterval = setInterval(handleNext, 3000);

    return () => clearInterval(slideInterval);
  }, [banners, handleNext]);

  return (
    <>
      {banners && (
        <div className="relative flex w-full overflow-hidden">
          {banners.map((banner, index) => (
            <div
              className="relative h-60 w-full shrink-0 transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentBanner * 100}%)` }}
              key={index}>
              <Image
                src={banner}
                alt="배너 아이템"
                height={240}
                priority={index === currentBanner}
                className="mx-auto"
              />
            </div>
          ))}
          <IoIosArrowBack
            size={30}
            onClick={handlePrev}
            className={`${defaultStyle} left-2`}
          />
          <IoIosArrowForward
            size={30}
            onClick={handleNext}
            className={`${defaultStyle} right-2`}
          />
          <div className="absolute bottom-0 left-2/4 flex translate-x-[-50%] items-center gap-2">
            {banners.map((_, index) => (
              <div
                key={index}
                className={`h-3 w-3 rounded-full bg-white transition-all ${
                  currentBanner === index ? "p-2" : "bg-opacity-50"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Banner;
