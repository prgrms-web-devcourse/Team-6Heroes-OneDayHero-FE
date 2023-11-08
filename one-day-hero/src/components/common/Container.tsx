import { HTMLProps, PropsWithChildren } from "react";

interface ContainerProps extends HTMLProps<HTMLDivElement> {
  missionStatus?: string;
}

const Container = ({
  className = "",
  children,
  missionStatus,
  ...props
}: PropsWithChildren<ContainerProps>) => {
  const defaultStyle = `w-10/12 p-3 bg-white rounded-[1.25rem] shadow-down m-2 relative`;

  return (
    <div className={`${defaultStyle} ${className}`} {...props}>
      {missionStatus === "EXPIRED" && (
        <div className="absolute inset-0 flex items-center justify-center rounded-[1.25rem] bg-neutral-700 bg-opacity-50 text-2xl font-semibold text-white">
          마감 된 미션입니다.
        </div>
      )}
      {children}
    </div>
  );
};

export default Container;
