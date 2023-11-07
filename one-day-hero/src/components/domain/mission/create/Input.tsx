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
      className,
      readOnlyValue,
      placeholder = "",
      readOnly,
      error
    }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const { value, handleChange } = useForm("");

    const defaultStyle =
      "rounded-[10px] h-[34px] w-full border border-zinc-300 focus:outline-primary placeholder:text-inactive pl-3";

    return (
      <div className="flex grow flex-col">
        <input
          id={id}
          ref={ref}
          value={readOnly ? readOnlyValue?.toString() : value}
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
