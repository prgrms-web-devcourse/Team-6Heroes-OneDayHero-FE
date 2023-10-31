"use client";

import { useState } from "react";

const ToggleButton = ({
  children,
  className
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const [clicked, setClicked] = useState<boolean>(false);

  const handleButtonClick = () => {
    setClicked(!clicked);
  };

  const defaultStyle = "w-11 h-11 text-base text-black rounded-lg border";

  return (
    <button
      className={`${defaultStyle} ${
        clicked
          ? "border-primary bg-primary-lightest border-4"
          : "border-base-darken bg-white "
      } ${className}`}
      onClick={handleButtonClick}>
      {children}
    </button>
  );
};

export default ToggleButton;
