import { PropsWithChildren } from "react";

interface InputLabelProps extends React.ComponentProps<"label"> {
  className?: string;
  required?: boolean;
}

const InputLabel = ({
  htmlFor,
  className,
  required,
  children
}: PropsWithChildren<InputLabelProps>) => {
  const defaultStyle = "mb-1 text-sm font-semibold w-fit";

  return (
    <div className="flex">
      <label htmlFor={htmlFor} className={`${defaultStyle} ${className}`}>
        {children}
      </label>
      {required && <span className="text-xl leading-4 text-red-500">*</span>}
    </div>
  );
};

export default InputLabel;
