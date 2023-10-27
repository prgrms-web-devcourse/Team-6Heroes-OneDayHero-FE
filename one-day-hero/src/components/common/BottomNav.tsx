"use client";

import Link from "next/link";
import IconGroup from "./IconGroup";
import { BiMap, BiChat, BiHome, BiCalendarCheck, BiUser } from "react-icons/bi";

const BottomNav = () => {
  return (
    <nav className="bg-base flex justify-center items-center w-96 h-14 gap-10 shadow-[0px_-2px_5px_shadow-100]">
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
