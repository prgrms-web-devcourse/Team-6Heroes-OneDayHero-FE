interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  size?: "sm" | "md" | "lg";
}

const Label = ({
  size = "md",
  children,
  className = "",
  ...props
}: LabelProps) => {
  const sizes = {
    sm: "text-xs w-16 h-4 py-[0.05rem] rounded-3xl",
    md: "text-sm w-28 h-6 py-[0.2rem] px-1 rounded-3xl",
    lg: "text-lg min-w-[4.5rem] h-8 py-0.5 px-3 rounded-xl border border-1 border-zinc-300"
  };

  const defaultStyle = "my-auto bg-blue-200 text-center";

  return (
    <label className={`${defaultStyle} ${sizes[size]} ${className}`} {...props}>
      {children}
    </label>
  );
};

export default Label;
