import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";
/** @Note import { FiChevronUp } from 'react-icons/fi'; */
/** @Note import {BsSunFill } from "react-icons/bs"; */
import { BsBell, BsMoonFill, BsSearch } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";

type HomeHeaderProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

const HomeHeader = ({ children }: PropsWithChildren<HomeHeaderProps>) => {
  const headerDefaultStyle =
    "flex h-[4.375rem] w-96 items-center justify-between space-x-4 bg-base p-3";

  const iconDefaultStyle = "w-6 h-6";

  return (
    <header className={headerDefaultStyle}>
      <div className="flex items-center space-x-2">
        <Image
          src="/images/원데히로고 2.png"
          width={55}
          height={55}
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
