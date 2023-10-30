import { HTMLProps, PropsWithChildren } from "react";

interface ContainerProps extends HTMLProps<HTMLDivElement> {
  width?: string;
  children?: React.ReactNode;
}

const Container = ({
  width = "10/12",
  className = "",
  children,
  ...props
}: PropsWithChildren<ContainerProps>) => {
  const defaultStyle = `w-${width} bg-white rounded-2xl shadow-boxShadow-down m-2`;

  return (
    <div className={`${defaultStyle} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Container;
