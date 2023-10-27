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
          ? "border-4 border-primary bg-primary-lightest"
          : "border-base-darken bg-white"
      } ${className}`}
      onClick={handleDayClick}>
      {children}
    </button>
  );
};

export default DayButton;
