"use client";

import { ForwardedRef, forwardRef, PropsWithChildren } from "react";
import { FieldValues, UseFormSetValue } from "react-hook-form";

import useForm from "@/hooks/useForm";

import ErrorMessage from "./ErrorMessage";

interface SelectProps extends React.ComponentProps<"select"> {
  className?: string;
  error?: string;
  setValue?: UseFormSetValue<FieldValues>;
}

const Select = forwardRef(
  (
    {
      id,
      className,
      setValue,
      children,
      error,
      ...props
    }: PropsWithChildren<SelectProps>,
    ref: ForwardedRef<HTMLSelectElement>
  ) => {
    const { handleChange } = useForm("");

    const defaultStyle =
      "border-inactive focus:outline-primary w-full h-[34px] rounded-[10px] border pl-2";

    return (
      <div className="flex w-full flex-col">
        <select
          id={id}
          ref={ref}
          onChange={handleChange}
          className={`${defaultStyle} ${className} ${
            error && "border-2 border-red-500"
          }`}
          {...props}>
          <option value="">선택</option>
          {children}
        </select>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
