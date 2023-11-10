"use client";

import { ForwardedRef, forwardRef } from "react";

import useForm from "@/hooks/useForm";

import ErrorMessage from "./ErrorMessage";

interface TextareaProps extends React.ComponentProps<"textarea"> {
  readOnlyValue?: string;
  className?: string;
  error?: string;
}

const Textarea = forwardRef(
  (
    {
      id,
      placeholder = "",
      readOnly,
      readOnlyValue,
      className,
      error
    }: TextareaProps,
    ref: ForwardedRef<HTMLTextAreaElement>
  ) => {
    const { value, handleChange } = useForm("");

    const defaultStyle =
      "border-inactive focus:outline-primary h-[118px] resize-none rounded-[10px] placeholder:text-inactive border p-3";

    return (
      <>
        <textarea
          id={id}
          ref={ref}
          value={readOnly ? readOnlyValue?.toString() : value}
          placeholder={placeholder}
          onChange={!readOnly ? handleChange : undefined}
          readOnly={readOnly}
          className={`${defaultStyle} ${className} ${
            error && "border-2 border-red-500"
          }`}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
