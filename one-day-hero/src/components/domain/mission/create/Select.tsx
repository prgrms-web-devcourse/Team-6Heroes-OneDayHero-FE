"use client";

import { ForwardedRef, forwardRef, PropsWithChildren } from "react";

import useForm from "@/hooks/useForm";

import ErrorMessage from "./ErrorMessage";

interface SelectProps extends React.ComponentProps<"select"> {
  className?: string;
  error?: string;
}

const Select = forwardRef(
  (
    { id, className, children, error }: PropsWithChildren<SelectProps>,
    ref: ForwardedRef<HTMLSelectElement>
  ) => {
    const { handleChange, errorState } = useForm("", error || "");

    const defaultStyle =
      "border-bg-inactive focus:outline-primary w-full h-[34px] rounded-[10px] border pl-2";

    return (
      <div className="flex w-full flex-col">
        <select
          id={id}
          ref={ref}
          onChange={handleChange}
          className={`${defaultStyle} ${className} ${
            error && errorState && "border-2 border-red-500"
          }`}>
          {children}
        </select>
        {error && errorState && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
