"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa";

type StarRatingProps = {
  value?: 1 | 2 | 3 | 4 | 5;
  size?: "sm" | "lg";
  readOnly?: boolean;
  // eslint-disable-next-line no-unused-vars
  onSelect?: (idx: number) => void;
  className?: string;
};

const scoreList = [1, 2, 3, 4, 5];

const StarRating = ({
  value,
  size = "lg",
  readOnly,
  onSelect,
  className
}: StarRatingProps) => {
  const [score, setScore] = useState<boolean[]>(
    Array(scoreList.length).fill(false)
  );

  const handleClick = (index: number) => {
    const resetScore = score.map(() => false);

    const newScore = resetScore.map((el, idx) => idx <= index && !el);
    setScore(newScore);

    onSelect && onSelect(index + 1);
  };

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {scoreList.map((_, index) => (
        <FaStar
          key={index}
          size={size === "lg" ? 50 : 12}
          className={`${
            (!readOnly ? score[index] : value! > index)
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
