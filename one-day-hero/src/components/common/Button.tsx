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
  const themes = {
    primary: "bg-primary text-white hover:bg-primary-lighten",
    active: "bg-active text-white hover:bg-active-lighten",
    cancel: "bg-cancel text-white hover:bg-cancel-lighten",
    inactive: "bg-inactive text-inactive-darken"
  };

  const sizes = {
    sm: "w-6/12",
    md: "w-10/12",
    lg: "w-11/12"
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-xl"
  };

  const defaultStyle = "font-semibold rounded-xl h-14";

  return (
    <button
      type="button"
      className={`${themes[theme]} ${sizes[size]} ${textSizes[textSize]} ${defaultStyle} ${className}`}
      {...props}>
      {children}
    </button>
  );
};

export default Button;
