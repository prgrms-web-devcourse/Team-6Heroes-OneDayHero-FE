"use client";

import {
  MouseEventHandler,
  PropsWithChildren,
  useEffect,
  useRef,
  useState
} from "react";

interface HorizontalScrollProps {
  className?: string;
}

const HorizontalScroll = ({
  className = "",
  children
}: PropsWithChildren<HorizontalScrollProps>) => {
  const [dragState, setDragState] = useState<boolean>(false); // 드래그 상태
  const [startX, setStartX] = useState<number | null>(null); //어디서부터 시작했는지
  const containerRef = useRef<HTMLDivElement | null>(null);

  const defaultStyle = "overflow-x-auto";

  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    setDragState(true);
    setStartX(e.clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => {
      // 마우스 떼면 드래그 상태는 false 드래그 끝.
      setDragState(false);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (dragState && startX !== null && containerRef.current) {
        setStartX(event.clientX);
        const currentX = event.clientX - startX;
        containerRef.current.scrollLeft -= currentX;
      }
    };

    if (dragState) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    // 이벤트 리스너 해제
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragState, startX]);

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
