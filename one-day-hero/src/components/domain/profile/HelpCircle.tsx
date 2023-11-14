"use client";

import { MouseEventHandler, PropsWithChildren, useRef, useState } from "react";
import { FiHelpCircle } from "react-icons/fi";

type HelpCircleProps = {
  className?: string;
};

const HelpCircle = ({
  className,
  children
}: PropsWithChildren<HelpCircleProps>) => {
  const [showMenu, setShowMenu] = useState(false);
  const [enoughBottomSpace, setEnoughBottomSpace] = useState(true);
  const [enoughXSpace, setEnoughXSpace] = useState<
    "LEFT" | "MID_LEFT" | "MID_RIGHT" | "RIGHT"
  >("MID_LEFT");

  const boxRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter: MouseEventHandler<HTMLDivElement> = (e) => {
    if (!boxRef.current) return;

    setShowMenu(true);

    const { height, width } = boxRef.current.getBoundingClientRect();

    setEnoughBottomSpace(e.clientY + height <= window.innerHeight);

    if (e.clientX < width / 4) {
      setEnoughXSpace("LEFT");
    } else if (e.clientX + width / 4 >= window.innerWidth) {
      setEnoughXSpace("RIGHT");
    } else if (e.clientX + (3 * width) / 4 >= window.innerWidth) {
      setEnoughXSpace("MID_RIGHT");
    } else {
      setEnoughXSpace("MID_LEFT");
    }
  };

  const handleMouseLeave = () => {
    setShowMenu(false);
  };

  const boxPositionYStyle = enoughBottomSpace ? "top-7" : "bottom-7";
  const boxPositionXStyle = {
    LEFT: "-left-3",
    MID_LEFT: "-left-12",
    MID_RIGHT: "-right-12",
    RIGHT: "-right-3"
  };
  /**@note ref 달려있는 div 의 w-48 수정 시 같이 수정 필요*/

  const tailPositionStyle = enoughBottomSpace
    ? "top-3 border-t-transparent border-b-white"
    : "bottom-3 border-t-white border-b-transparent";
  const visibilityStyle = showMenu ? "" : "invisible";

  return (
    <div className={`relative ${className}`}>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <FiHelpCircle size="18" className="text-neutral-400" />
      </div>
      <div
        className={`absolute z-[61] h-0 w-0 border-8 border-x-transparent ${tailPositionStyle} ${visibilityStyle}`}
      />
      <div
        ref={boxRef}
        className={`absolute z-[60] w-48 break-words rounded-md bg-white p-3 text-sm shadow-down ${boxPositionYStyle} ${boxPositionXStyle[enoughXSpace]} ${visibilityStyle}`}>
        {children}
      </div>
    </div>
  );
};

export default HelpCircle;
