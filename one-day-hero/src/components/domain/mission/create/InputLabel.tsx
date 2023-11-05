import { PropsWithChildren } from "react";

interface InputLabelProps extends React.ComponentProps<"label"> {
  className?: string;
}

const InputLabel = ({
  htmlFor,
  className,
  children
}: PropsWithChildren<InputLabelProps>) => {
  const defaultStyle = "mb-1 text-sm font-semibold w-fit";

  return (
    <label htmlFor={htmlFor} className={`${defaultStyle} ${className}`}>
      {children}
    </label>
  );
};

export default InputLabel;
