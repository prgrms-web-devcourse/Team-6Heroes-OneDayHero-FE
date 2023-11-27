import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";
/** @Note import { FiChevronUp } from 'react-icons/fi'; */
/** @Note import {BsSunFill } from "react-icons/bs"; */
import { FiBell } from "react-icons/fi";
import { IoSearchSharp } from "react-icons/io5";
import { TbMoon } from "react-icons/tb";

import HomeLocation from "../domain/home/HomeLocation";
import NotificationCircle from "./NotificationCircle";

const HomeHeader = () => {
  const headerDefaultStyle =
    "border-b border-background-darken flex h-16 w-full items-center justify-between space-x-4 bg-background p-3 fixed max-w-screen-sm z-40 top-0";

  const iconDefaultStyle = "w-5 h-5 hover:text-red-500  ";

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
          <HomeLocation />
        </div>
      </div>
      <div className="flex space-x-4">
        <TbMoon className={iconDefaultStyle} />
        <Link href="/">
          <IoSearchSharp className={iconDefaultStyle} />
        </Link>
        <Link href="/" className="relative">
          <FiBell className={iconDefaultStyle} />
          <NotificationCircle />
        </Link>
      </div>
    </header>
  );
};

export default HomeHeader;
