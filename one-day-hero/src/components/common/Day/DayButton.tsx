"use client";

import { useState } from "react";

const DayButton = ({
  children,
  className
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const [clicked, setClicked] = useState<boolean>(false);

  const handleDayClick = () => {
    setClicked(!clicked);
  };

  const defaultStyle = "w-11 h-11 text-base rounded-lg border";

  return (
    <button
      className={`${defaultStyle} ${
        clicked
          ? "border-4 border-lime-200 bg-lime-100"
          : "border-zinc-300 bg-white"
      } ${className}`}
      onClick={handleDayClick}>
      {children}
    </button>
  );
};

export default DayButton;
