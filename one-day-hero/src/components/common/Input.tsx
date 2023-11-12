"use client";

import { ForwardedRef, forwardRef } from "react";

import useForm from "@/hooks/useForm";

import ErrorMessage from "./ErrorMessage";

interface InputProps extends React.ComponentProps<"input"> {
  readOnlyValue?: string;
  className?: string;
  error?: string;
}

const Input = forwardRef(
  (
    {
      id,
      value = "",
      placeholder = "",
      readOnly,
      readOnlyValue,
      className,
      error
    }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const { changeValue, handleChange } = useForm((value as string) ?? "");

    const defaultStyle =
      "rounded-[10px] h-[34px] w-full border border-inactive focus:outline-primary placeholder:text-inactive pl-3";

    return (
      <div className="flex grow flex-col">
        <input
          id={id}
          ref={ref}
          value={readOnly ? readOnlyValue?.toString() : changeValue}
          placeholder={placeholder}
          onChange={!readOnly ? handleChange : undefined}
          readOnly={readOnly}
          className={`${defaultStyle} ${className} ${
            error && "cs:border-red-500 border-2"
          }`}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
