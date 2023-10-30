import { PropsWithChildren } from "react";

interface IconGroupProps {
  title: string;
  size?: "sm" | "md" | "lg";
  textSize?: "xs" | "sm" | "base";
  className?: string;
  direction?: string;
}

const IconGroup = ({
  title,
  size = "lg",
  textSize = "xs",
  className = "",
  direction = "col",
  children,
  ...props
}: PropsWithChildren<IconGroupProps>) => {
  const sizes = {
    sm: "text-sm font-light text-gray-400",
    md: "text-md font-semibold",
    lg: "text-xl font-semibold cursor-pointer"
  };

  const textSizes = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base"
  };

  const defaultStyle = `flex flex-${direction} justify-center items-center gap-1`;

  return (
    <div className={`${defaultStyle} ${sizes[size]} ${className}`} {...props}>
      {children}
      <p className={`${textSizes[textSize]} text-inherit`}>{title}</p>
    </div>
  );
};

export default IconGroup;
