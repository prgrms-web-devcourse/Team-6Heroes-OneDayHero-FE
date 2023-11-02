import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";
/** @Note import { FiChevronUp } from 'react-icons/fi'; */
/** @Note import {BsSunFill } from "react-icons/bs"; */
import { BsBell, BsMoonFill, BsSearch } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";

type HomeHeaderProps = {
  onClick?: () => void;
};

const HomeHeader = ({ children }: PropsWithChildren<HomeHeaderProps>) => {
  const headerDefaultStyle =
    "border-b border-background-darken flex h-16 w-full items-center justify-between space-x-4 bg-background p-3 fixed max-w-screen-sm z-40 top-0";

  const iconDefaultStyle = "w-5 h-5";

  return (
    <header className={headerDefaultStyle}>
      <div className="flex items-center space-x-2">
        <Image
          src="/images/원데히로고 2.png"
          width={45}
          height={45}
          alt="logo"
        />
        <div className="top-1 flex space-x-1">
          <h1 className="text-lg font-bold">{children}</h1>
          <FiChevronDown className="h-6 w-6" />
        </div>
      </div>
      <div className="flex space-x-4">
        <BsMoonFill className={iconDefaultStyle} />
        <Link href="/">
          <BsSearch className={iconDefaultStyle} />
        </Link>
        <Link href="/">
          <BsBell className={iconDefaultStyle} />
        </Link>
      </div>
    </header>
  );
};

export default HomeHeader;
