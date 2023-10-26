import { PropsWithChildren } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: "primary" | "active" | "cancel" | "inactive";
  size?: "sm" | "md" | "lg";
  textSize?: "sm" | "md" | "lg";
}

const Button = ({
  theme = "primary",
  size = "lg",
  textSize = "lg",
  children,
  className,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  const sizes = {
    sm: "w-4/12 h-14",
    md: "w-6/12 h-14",
    lg: "w-10/12 h-14"
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-xl"
  };

  const defaultStyle = "font-semibold rounded-xl text-white";

  return (
    <button
      className={`${sizes[size]} ${textSizes[textSize]} ${defaultStyle} ${className}`}
      {...props}>
      {children}
    </button>
  );
};

export default Button;
