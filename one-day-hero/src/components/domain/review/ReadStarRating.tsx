import { FaStar } from "react-icons/fa";

type ReadStarRatingProps = {
  value: 1 | 2 | 3 | 4 | 5;
  className?: string;
};

const scoreList = [1, 2, 3, 4, 5];

const ReadStarRating = ({ value, className }: ReadStarRatingProps) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      {scoreList.map((_, index) => (
        <FaStar
          key={index}
          size={14}
          className={`${value > index ? "text-yellow-400" : "text-inactive"}`}
        />
      ))}
    </div>
  );
};

export default ReadStarRating;
