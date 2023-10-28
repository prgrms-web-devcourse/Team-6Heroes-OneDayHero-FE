"use client";

import Link from "next/link";
import { BiCalendarCheck, BiChat, BiHome, BiMap, BiUser } from "react-icons/bi";

import IconGroup from "./IconGroup";

const BottomNav = () => {
  return (
    <nav className="flex h-14 w-96 items-center justify-center gap-10 bg-stone-200 shadow-[0px_-2px_5px_rgba(0,0,0,0.07)]">
      <Link href="/chat">
        <IconGroup title="채팅">
          <BiChat />
        </IconGroup>
      </Link>
      <Link href="/map">
        <IconGroup title="지도">
          <BiMap />
        </IconGroup>
      </Link>
      <Link href="/">
        <IconGroup title="홈">
          <BiHome />
        </IconGroup>
      </Link>
      <Link href="/mission">
        <IconGroup title="미션">
          <BiCalendarCheck />
        </IconGroup>
      </Link>
      <Link href="/profile">
        <IconGroup title="프로필">
          <BiUser />
        </IconGroup>
      </Link>
    </nav>
  );
};

export default BottomNav;
