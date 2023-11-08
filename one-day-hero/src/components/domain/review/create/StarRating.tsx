"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa";

type StarRatingProps = {
  // eslint-disable-next-line no-unused-vars
  onSelect: (idx: number) => void;
};

const scoreList = [1, 2, 3, 4, 5];

const StarRating = ({ onSelect }: StarRatingProps) => {
  const [score, setScore] = useState<boolean[]>(
    Array(scoreList.length).fill(false)
  );

  const handleClick = (index: number) => {
    const resetScore = score.map(() => false);

    const newScore = resetScore.map((el, idx) => idx <= index && !el);
    setScore(newScore);

    onSelect(index + 1);
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {scoreList.map((_, index) => (
        <FaStar
          key={index}
          size="50"
          className={`${score[index] ? "text-yellow-400" : "text-inactive"}`}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

export default StarRating;
