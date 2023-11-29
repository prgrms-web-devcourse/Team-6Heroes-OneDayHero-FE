"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type TabRoute = {
  name: string;
  path: string;
};

interface TabsProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  leftRoute: TabRoute;
  rightRoute: TabRoute;
}

const Tabs = ({ leftRoute, rightRoute, className = "" }: TabsProps) => {
  const pathName = usePathname();

  const tabContainerDefaultStyle =
    "flex z-50 w-8/12 bg-white justify-center items-center text-base text-center h-12 rounded-full";

  const tabDefaultStyle =
    "mx-1 flex h-10 w-24 flex-auto items-center justify-center rounded-full";

  return (
    <>
      <div className={`${tabContainerDefaultStyle} ${className}`}>
        <Link
          className={`${tabDefaultStyle} ${
            pathName === leftRoute.path ? "bg-primary " : ""
          }`}
          href={leftRoute.path}>
          {leftRoute.name}
        </Link>
        <Link
          className={`${tabDefaultStyle} ${
            pathName === rightRoute.path ? "bg-primary" : ""
          }`}
          href={rightRoute.path}>
          {rightRoute.name}
        </Link>
      </div>
    </>
  );
};

export default Tabs;
