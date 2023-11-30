"use client";

import "react-calendar/dist/Calendar.css";

import { ForwardedRef, forwardRef, useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import { BiCalendar } from "react-icons/bi";

import Input from "@/components/common/Input";
import { formatTime } from "@/utils/formatTime";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type CustomCalendarProps = {
  id: string;
  defaultValue?: string;
  error?: string;
};

const CustomCalendar = forwardRef(
  (
    { id, error, defaultValue }: CustomCalendarProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [value, onChange] = useState<Value>(new Date());
    const [inputValue, setInputValue] = useState<string>(defaultValue ?? "");
    const [openState, setOpenState] = useState<boolean>(false);
    const calendarRef = useRef<HTMLDivElement | null>(null);

    const handleChangeDate = (selectedDate: Value) => {
      if (selectedDate === null) return;
      onChange(selectedDate);

      const formattedDate = formatTime(selectedDate.toString(), 10);

      setInputValue(formattedDate);
      setOpenState(false);
    };

    useEffect(() => {
      const handleOutsideClick = (e: MouseEvent) => {
        if (
          calendarRef.current &&
          !calendarRef.current.contains(e.target as Node)
        ) {
          setOpenState(false);
        }
      };

      if (openState) {
        document.addEventListener("mousedown", handleOutsideClick);
      } else {
        document.removeEventListener("mousedown", handleOutsideClick);
      }

      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }, [openState]);

    return (
      <div className="relative flex w-full">
        <Input
          ref={ref}
          id={id}
          readOnlyValue={inputValue}
          error={error}
          readOnly
          className={`${error && "border-2 border-red-500"}`}
        />
        {openState ? (
          <div ref={calendarRef}>
            <Calendar
              onChange={handleChangeDate}
              className="absolute right-0 top-0"
              value={value}
              formatDay={(_, date) =>
                new Date(date).toLocaleDateString("en-us", { day: "2-digit" })
              }
            />
          </div>
        ) : (
          <div className="w-3/12">
            <BiCalendar
              className="ml-2 text-3xl"
              onClick={() => setOpenState(true)}
            />
          </div>
        )}
      </div>
    );
  }
);

CustomCalendar.displayName = "CustomCalendar";

export default CustomCalendar;
