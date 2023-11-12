"use client";

import React, {
  MouseEventHandler,
  PropsWithChildren,
  useRef,
  useState
} from "react";

type HorizontalScrollProps = {
  className?: string;
};

const HorizontalScroll = ({
  className,
  children
}: PropsWithChildren<HorizontalScrollProps>) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dragState, setDragState] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [currentScroll, setCurrentScroll] = useState<number>(0);

  const defaultStyle = "overflow-x-auto flex";

  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (event) => {
    setDragState(true);
    setStartX(event.clientX);
    setCurrentScroll(containerRef.current?.scrollLeft || 0);
  };

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (event) => {
    if (containerRef.current && dragState) {
      const scrollLeft = startX - event.clientX + currentScroll;
      containerRef.current.scrollLeft = scrollLeft;
    }
  };

  const handleMouseUp = () => {
    if (containerRef.current && dragState) {
      setDragState(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`${defaultStyle} ${className}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}>
      {children}
    </div>
  );
};

export default HorizontalScroll;
