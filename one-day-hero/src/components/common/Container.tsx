import { HTMLProps, PropsWithChildren } from "react";

interface ContainerProps extends HTMLProps<HTMLDivElement> {
  width?: string;
}

const Container = ({
  className = "",
  children,
  ...props
}: PropsWithChildren<ContainerProps>) => {
  const defaultStyle = `w-10/12 p-3 bg-white rounded-[1.25rem] shadow-down m-2`;

  return (
    <div className={`${defaultStyle} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Container;
