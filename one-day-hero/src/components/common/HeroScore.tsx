import React from "react";

const VILLAIN_MAX_SCORE = 20;
const HERO_INITAIL_SCORE = 30;

interface HeroScoreProps extends React.ComponentProps<"div"> {
  size?: "sm" | "lg";
  score: number;
}

const HeroScore = ({
  size = "lg",
  score = HERO_INITAIL_SCORE,
  className = "",
  ...props
}: HeroScoreProps) => {
  const isHero = score > VILLAIN_MAX_SCORE;
  const guageLevel = Math.ceil((score * 12) / 100);

  const sizes = {
    sm: "text-sm h-3 rounded-md",
    lg: "text-lg h-6 rounded-xl"
  };
  const guageWidth = [
    "w-0",
    "w-1/12",
    "w-2/12",
    "w-3/12",
    "w-4/12",
    "w-5/12",
    "w-6/12",
    "w-7/12",
    "w-8/12",
    "w-9/12",
    "w-10/12",
    "w-11/12",
    "w-full"
  ];
  const guageColor = isHero ? "bg-sub" : "bg-bad";
  const textColor = isHero ? "text-sub" : "text-bad";

  return (
    <div className={`${className} flex flex-col`}>
      {size === "sm" && <p className={`${textColor} text-right`}>{score} 점</p>}
      <div
        className={`${sizes[size]} bg-base-darken flex grow items-center`}
        {...props}>
        <div
          className={`${sizes[size]} ${guageColor} ${guageWidth[guageLevel]} flex flex-row-reverse items-center`}>
          {size === "lg" && isHero && (
            <p className={`mr-2 text-white`}>{score} 점</p>
          )}
        </div>
        {size === "lg" && !isHero && (
          <p className={`text-bad ml-1 font-semibold`}>{score} 점</p>
        )}
      </div>
    </div>
  );
};

export default HeroScore;
