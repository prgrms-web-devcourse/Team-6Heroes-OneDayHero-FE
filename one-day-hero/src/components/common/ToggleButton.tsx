"use client";

import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import {
  FieldValues,
  UseFormGetValues,
  UseFormSetValue
} from "react-hook-form";

type ToggleButtonProps = {
  className?: "";
  dateName: string;
  setValue: UseFormSetValue<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  dayKR: string;
};

const ToggleButton = ({
  className,
  setValue,
  getValues,
  dayKR,
  dateName,
  ...props
}: PropsWithChildren<ToggleButtonProps>) => {
  const [clicked, setClicked] = useState<boolean>(false);

  const checked = getValues("favoriteWorkingDay.favoriteDate")?.includes(
    dateName
  );

  useEffect(() => {
    if (checked) {
      setClicked(!clicked);
    }
  }, []);

  const handleButtonClick = useCallback(() => {
    const setArray = () => {
      const prevArray = getValues("favoriteWorkingDay.favoriteDate") || [];

      const updatedArray = prevArray.includes(dateName)
        ? prevArray.filter((day: string) => day !== dateName)
        : [...prevArray, dateName];

      return updatedArray;
    };

    const test = setArray();

    setValue("favoriteWorkingDay.favoriteDate", test);
  }, [setValue, getValues, dateName]);

  const defaultStyle = "w-11 h-11 text-base text-black rounded-lg border";

  return (
    <input
      value={dayKR}
      type="button"
      className={`${defaultStyle} ${
        checked
          ? "border-primary bg-primary-lightest border-4"
          : "border-background-darken bg-white"
      } ${className}`}
      onClick={handleButtonClick}
      {...props}
    />
  );
};

export default ToggleButton;
