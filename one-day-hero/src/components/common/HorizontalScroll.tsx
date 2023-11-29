"use client";

import React, {
  MouseEventHandler,
  PropsWithChildren,
  useEffect,
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

  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    setDragState(true);
    setStartX(e.clientX);
    setCurrentScroll(containerRef.current?.scrollLeft || 0);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current && dragState) {
        const scrollLeft = startX - e.clientX + currentScroll;
        containerRef.current.scrollLeft = scrollLeft;
      }
    };

    const handleMouseUp = () => {
      if (containerRef.current && dragState) {
        setDragState(false);
      }
    };

    if (dragState) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragState, startX, currentScroll]);

  return (
    <div
      ref={containerRef}
      className={`${defaultStyle} ${className}`}
      onMouseDown={handleMouseDown}>
      {children}
    </div>
  );
};

export default HorizontalScroll;
