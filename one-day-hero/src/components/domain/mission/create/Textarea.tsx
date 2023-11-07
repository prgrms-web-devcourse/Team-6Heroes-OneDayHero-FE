"use client";

import { ForwardedRef, forwardRef } from "react";

import useForm from "@/hooks/useForm";

import ErrorMessage from "./ErrorMessage";

interface TextareaProps extends React.ComponentProps<"textarea"> {
  className?: string;
  error?: string;
}

const Textarea = forwardRef(
  (
    { id, className, error }: TextareaProps,
    ref: ForwardedRef<HTMLTextAreaElement>
  ) => {
    const { value, handleChange } = useForm("");

    const defaultStyle =
      "border-inactive focus:outline-primary h-[118px] resize-none rounded-[10px] placeholder:text-inactive border p-3 text-sm";

    return (
      <>
        <textarea
          id={id}
          ref={ref}
          value={value}
          placeholder="미션에 대한 내용을 작성해주세요!"
          onChange={handleChange}
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
