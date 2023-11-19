import { forwardRef, PropsWithChildren } from "react";
import {
  FieldValues,
  UseFormGetValues,
  UseFormSetValue
} from "react-hook-form";

import ToggleButton from "./ToggleButton";

type DayListProps = {
  getValues: UseFormGetValues<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  className?: "";
};

const DayList = forwardRef(
  (
    {
      className,
      getValues,
      setValue,
      ...props
    }: PropsWithChildren<DayListProps>,
    ref
  ) => {
    const days = ["MON", "THU", "WED", "THU", "FRI", "SAT", "SUN"];

    return (
      <div className={`${className} flex flex-wrap gap-x-1.5`} {...props}>
        {days.map((day, index) => (
          <ToggleButton
            setValue={setValue}
            getValues={getValues}
            key={index}
            selectedDate={day}
          />
        ))}
      </div>
    );
  }
);

DayList.displayName = "DayList";

export default DayList;
