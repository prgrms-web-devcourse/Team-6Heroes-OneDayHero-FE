"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface TabsProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  leftText: string;
  rightText: string;
}

const route: { [key: string]: string } = {
  "진행중인 미션": "/mission/list/ongoing",
  "제안받은 미션": "/mission/list/suggested",
  미션: "/search/mission",
  히어로: "/search/hero",
  "받은 리뷰": "/review/get",
  "내가 쓴 리뷰": "/review/send"
};

const Tabs = ({ leftText = "", rightText = "", className = "" }: TabsProps) => {
  const pathName = usePathname();

  const leftRoute = route[leftText] || "/";
  const rightRoute = route[rightText] || "/";

  const tabContainerDefaultStyle =
    "flex z-50 w-8/12 bg-white justify-center items-center text-base text-center h-12 rounded-full";

  const tabDefaultStyle =
    "mx-1 flex h-10 w-24 flex-auto items-center justify-center rounded-full";

  return (
    <>
      <div className={`${tabContainerDefaultStyle} ${className}`}>
        <Link
          className={`${tabDefaultStyle} ${
            pathName === leftRoute ? "bg-primary " : ""
          }`}
          href={leftRoute}>
          {leftText}
        </Link>
        <Link
          className={`${tabDefaultStyle} ${
            pathName === rightRoute ? "bg-primary" : ""
          }`}
          href={rightRoute}>
          {rightText}
        </Link>
      </div>
    </>
  );
};

export default Tabs;
