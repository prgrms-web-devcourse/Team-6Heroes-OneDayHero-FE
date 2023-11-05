"use client";

import { ForwardedRef, forwardRef, useState } from "react";

import ErrorMessage from "./ErrorMessage";

interface InputProps extends React.ComponentProps<"input"> {
  className?: string;
  error?: string;
}

const Input = forwardRef(
  (
    { id, className, value, placeholder = "", readOnly, error }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [inputValue, setInputValue] = useState<string>("");

    const defaultStyle =
      "rounded-[10px] h-[34px] w-full border border-zinc-300 focus:outline-primary placeholder:text-inactive pl-3";

    return (
      <div className="flex grow flex-col">
        <input
          ref={ref}
          id={id}
          value={readOnly ? value?.toString() : inputValue}
          placeholder={placeholder}
          className={`${defaultStyle} ${className} ${
            error && "cs:border-red-500 border-2"
          }`}
          onChange={(e) => !readOnly && setInputValue(e.target.value)}
          readOnly={readOnly}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
