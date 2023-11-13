"use client";

import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

type StarRatingProps = {
  size?: "sm" | "lg";
  value?: number;
  readOnly?: boolean;
  readOnlyValue?: 1 | 2 | 3 | 4 | 5;
  editValue?: 1 | 2 | 3 | 4 | 5;
  // eslint-disable-next-line no-unused-vars
  onSelect?: (idx: number) => void;
  className?: string;
};

const scoreList = [1, 2, 3, 4, 5];
const initialStarState = Array(scoreList.length).fill(false);

const StarRating = ({
  size = "lg",
  value,
  readOnly,
  readOnlyValue,
  onSelect,
  className
}: StarRatingProps) => {
  const [starState, setStarState] = useState<boolean[]>(
    value ? initialStarState.map((_, idx) => value > idx) : initialStarState
  );

  const handleClick = (index: number) => {
    const resetState = starState.map(() => false);

    const newState = resetState.map((_, idx) => idx <= index);
    setStarState(newState);
  };

  useEffect(() => {
    if (onSelect) {
      const count = starState.filter((active) => active).length;

      onSelect(count);
    }
  }, [onSelect, starState]);

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {scoreList.map((_, index) => (
        <FaStar
          key={index}
          size={size === "lg" ? 45 : 12}
          className={`${
            (!readOnly ? starState[index] : readOnlyValue! > index)
              ? "text-yellow-400"
              : "text-inactive"
          }`}
          onClick={!readOnly ? () => handleClick(index) : undefined}
        />
      ))}
    </div>
  );
};

export default StarRating;
