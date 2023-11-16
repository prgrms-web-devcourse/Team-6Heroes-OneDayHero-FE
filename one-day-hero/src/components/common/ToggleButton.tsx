"use client";

import { PropsWithChildren, useCallback, useState } from "react";
import {
  FieldValues,
  UseFormGetValues,
  UseFormSetValue
} from "react-hook-form";

type ToggleButtonProps = {
  className?: "";
  selectedDate: string;
  setValue: UseFormSetValue<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
};

const ToggleButton = ({
  children,
  className,
  setValue,
  getValues,
  selectedDate,
  ...props
}: PropsWithChildren<ToggleButtonProps>) => {
  const [clicked, setClicked] = useState<boolean>(false);

  const handleButtonClick = useCallback(() => {
    const setArray = () => {
      const prevArray = getValues("favoriteWorkingDay.favoriteDate") || [];

      const updatedArray = prevArray.includes(selectedDate)
        ? prevArray.filter((day: string) => day !== selectedDate)
        : [...prevArray, selectedDate];

      return updatedArray;
    };

    const test = setArray();

    setValue("favoriteWorkingDay.favoriteDate", test);

    setClicked(!clicked);
  }, [setValue, clicked, getValues, selectedDate]);

  const defaultStyle = "w-11 h-11 text-base text-black rounded-lg border";

  return (
    <button
      className={`${defaultStyle} ${
        clicked
          ? "border-primary bg-primary-lightest border-4"
          : "border-background-darken bg-white"
      } ${className}`}
      onClick={handleButtonClick}
      {...props}>
      {selectedDate}
    </button>
  );
};

export default ToggleButton;
