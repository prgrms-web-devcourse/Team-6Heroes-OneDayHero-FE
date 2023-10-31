"use client";

import {
  MouseEventHandler,
  PropsWithChildren,
  useEffect,
  useRef,
  useState
} from "react";

interface HorizontalScrollProps {
  dragStart: () => void;
  dragEnd: () => void;
  className?: string;
}

const HorizontalScroll = ({
  dragStart,
  dragEnd,
  className = "",
  children
}: PropsWithChildren<HorizontalScrollProps>) => {
  const [dragState, setDragState] = useState<boolean>(false); // 드래그 상태
  const [startX, setStartX] = useState<number | null>(null); //어디서부터 시작했는지
  const [scrollX, setScrollX] = useState<number>(0); // 스크롤 왼쪽 기준
  const containerRef = useRef<HTMLDivElement | null>(null);

  const defaultStyle = "overflow-x-auto";

  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    setDragState(true);
    setStartX(e.clientX);
    setScrollX(containerRef?.current?.scrollLeft || 0);
  };

  useEffect(() => {
    const handleMouseUp = () => {
      // 마우스 떼면 드래그 상태는 false 드래그 끝.
      setDragState(false);
      dragEnd();
    };

    const handleMouseMove = (event: MouseEvent) => {
      // 드래그 움직이면
      if (dragState && startX !== null && containerRef.current) {
        dragStart();
        setStartX(event.clientX);
        const currentX = event.clientX - startX;
        containerRef.current.scrollLeft = scrollX - currentX;
      }
    };

    console.log(startX, "스타트 지점 startX"); // 찐 스타트 지점
    console.log(scrollX, "지금은 어딘지");

    if (dragState) {
      document.addEventListener(
        "mousemove",
        handleMouseMove as unknown as EventListener
      );
      document.addEventListener("mouseup", handleMouseUp);
    }

    // 이벤트 리스너 해제
    return () => {
      document.removeEventListener(
        "mousemove",
        handleMouseMove as unknown as EventListener
      );
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragState, startX, dragStart, dragEnd]);

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
