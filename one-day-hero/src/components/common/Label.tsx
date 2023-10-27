import { PropsWithChildren } from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  size?: "sm" | "md" | "lg";
}

const Label = ({
  size = "md",
  children,
  className = "",
  ...props
}: PropsWithChildren<LabelProps>) => {
  const sizes = {
    sm: "text-xs min-w-16 h-4 px-4 rounded-3xl",
    md: "text-sm min-w-28 h-6 px-3 rounded-3xl",
    lg: "text-lg min-w-[4.5rem] h-8 px-4 rounded-[0.625rem] border border-1 border-zinc-300"
  };

  const defaultStyle =
    "bg-blue-200 text-center inline-flex justify-center items-center";

  return (
    <label className={`${defaultStyle} ${sizes[size]} ${className}`} {...props}>
      {children}
    </label>
  );
};

export default Label;
