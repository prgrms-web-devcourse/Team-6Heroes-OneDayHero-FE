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
    sm: "w-40",
    md: "w-72",
    lg: "w-80"
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-xl"
  };

  const defaultStyle = "font-semibold rounded-xl text-white h-14";

  return (
    <button
      className={` ${theme} ${sizes[size]} ${textSizes[textSize]} ${defaultStyle} ${className}`}
      {...props}>
      {children}
    </button>
  );
};

export default Button;
