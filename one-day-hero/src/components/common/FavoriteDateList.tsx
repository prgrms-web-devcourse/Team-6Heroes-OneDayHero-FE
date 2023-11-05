import { UserResponse } from "@/types/response";

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

type DateEN = ArrayElement<
  UserResponse["data"]["favoriteWorkingDay"]["favoriteDate"]
>;

const DateMap: { [key in DateEN]: string } = {
  MON: "월",
  TUE: "화",
  WED: "수",
  THU: "목",
  FRI: "금",
  SAT: "토",
  SUN: "일"
};

type FavoriteDateListProps = {
  favoriteDate: DateEN[];
  className?: string;
};

const FavoriteDateList = ({
  favoriteDate,
  className
}: FavoriteDateListProps) => {
  const defaultStyle =
    "w-11 h-11 text-base text-black rounded-lg border flex justify-center items-center";

  return (
    <div className={`flex flex-wrap gap-x-1.5 justify-center ${className}`}>
      {Object.entries(DateMap).map(([dateEN, dateKR]) => {
        const favored = favoriteDate.includes(dateEN as DateEN);

        return (
          <div
            className={`${defaultStyle} ${
              favored
                ? "border-4 border-primary bg-primary-lightest"
                : "border-background-darken bg-white"
            }`}>
            {dateKR}
          </div>
        );
      })}
    </div>
  );
};

export default FavoriteDateList;
