"use client";

import { ForwardedRef, forwardRef, PropsWithChildren } from "react";

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
    const defaultStyle =
      "border-bg-inactive focus:outline-primary w-full h-[34px] rounded-[10px] border pl-2";

    return (
      <div className="flex w-full flex-col">
        <select
          ref={ref}
          id={id}
          className={`${defaultStyle} ${className} ${
            error && "border-2 border-red-500"
          }`}>
          {children}
        </select>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
