interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  size?: "sm" | "md" | "lg";
}

const Label = ({ size = "md", children, className, ...props }: LabelProps) => {
  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-lg"
  };

  const widthSizes = {
    sm: "w-16",
    md: "w-28",
    lg: "w-20"
  };

  const defaultStyle = "rounded-3xl p-2 bg-red-200";

  return (
    <label
      className={`${defaultStyle} ${textSizes[size]} ${widthSizes[size]} ${className}`}
      {...props}>
      {children}
    </label>
  );
};

export default Label;
