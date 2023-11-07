"use client";

import "react-calendar/dist/Calendar.css";

import { ForwardedRef, forwardRef, useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import { BiCalendar } from "react-icons/bi";

import Input from "./Input";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type CustomCalendarProps = {
  id: string;
  error?: string;
};

const CustomCalendar = forwardRef(
  ({ id, error }: CustomCalendarProps, ref: ForwardedRef<HTMLInputElement>) => {
    const [value, onChange] = useState<Value>(new Date());
    const [inputValue, setInputValue] = useState<string>("");
    const [openState, setOpenState] = useState<boolean>(false);
    const calendarRef = useRef<HTMLDivElement | null>(null);

    const handleChangeDate = (selectedDate: Value) => {
      onChange(selectedDate);
      const formatDate = new Date(selectedDate as Date).toLocaleDateString(
        "ko-KR",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
          weekday: "long"
        }
      );
      setInputValue(formatDate);
      setOpenState(false);
    };

    useEffect(() => {
      const handleOutsideClick = (event: MouseEvent) => {
        if (
          calendarRef.current &&
          !calendarRef.current.contains(event.target as Node)
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
