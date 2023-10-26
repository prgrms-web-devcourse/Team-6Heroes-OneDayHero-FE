"use client";

import { PropsWithChildren } from "react";
import { useRouter } from "next/navigation";

const IconGroup = ({
  title,
  children,
  route,
  ...props
}: PropsWithChildren<{ title: string; route?: string }>) => {
  const router = useRouter();

  const defaultStyle =
    "flex flex-col items-center justify-center font-semibold text-xl cursor-pointer";

  const handleClick = () => {
    route && router.push(route);
  };

  return (
    <div className={`${defaultStyle}`} onClick={handleClick} {...props}>
      {children}
      <p className="text-xs">{title}</p>
    </div>
  );
};

export default IconGroup;
