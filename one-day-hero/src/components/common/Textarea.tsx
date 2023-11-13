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
      value = "",
      placeholder = "",
      readOnly,
      readOnlyValue,
      className,
      error
    }: TextareaProps,
    ref: ForwardedRef<HTMLTextAreaElement>
  ) => {
    const { changeValue, handleChange } = useForm((value as string) ?? "");

    const defaultStyle =
      "border-inactive focus:outline-primary h-[7.375rem] resize-none rounded-[0.625rem] placeholder:text-inactive border p-3";

    return (
      <>
        <textarea
          id={id}
          ref={ref}
          value={readOnly ? readOnlyValue?.toString() : changeValue}
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
