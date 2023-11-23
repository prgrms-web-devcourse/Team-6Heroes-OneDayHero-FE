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

const days = [
  ["월", "MON"],
  ["화", "TUE"],
  ["수", "WED"],
  ["목", "THU"],
  ["금", "FRI"],
  ["토", "SAT"],
  ["일", "SUN"]
];

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
    return (
      <div className={`${className} flex flex-wrap gap-x-1.5`} {...props}>
        {days.map(([dayKR, dayEN]) => (
          <ToggleButton
            setValue={setValue}
            getValues={getValues}
            key={dayEN}
            selectedDate={dayEN}>
            {dayKR}
          </ToggleButton>
        ))}
      </div>
    );
  }
);

DayList.displayName = "DayList";

export default DayList;
