import { PropsWithChildren } from "react";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  const defaultStyle = "text-red-500 text-sm mt-1";

  return <span className={`${defaultStyle}`}>{children}</span>;
};

export default ErrorMessage;
