"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiCalendarCheck, BiChat, BiHome, BiMap, BiUser } from "react-icons/bi";

import IconGroup from "./IconGroup";

const BottomNav = () => {
  const pathname = usePathname();

  const active = "text-primary";

  return (
    <nav className="bg-base shadow-upper flex h-14 w-96 items-center justify-center gap-12">
      <Link
        href="/chat"
        className={`${pathname.startsWith("/chat") && `${active}`}`}>
        <IconGroup title="채팅">
          <BiChat />
        </IconGroup>
      </Link>
      <Link
        href="/map"
        className={`${pathname.startsWith("/map") && `${active}`}`}>
        <IconGroup title="지도">
          <BiMap />
        </IconGroup>
      </Link>
      <Link href="/" className={`${pathname === "/" && `${active}`}`}>
        <IconGroup title="홈">
          <BiHome />
        </IconGroup>
      </Link>
      <Link
        href="/mission"
        className={`${pathname.startsWith("/mission") && `${active}`}`}>
        <IconGroup title="미션">
          <BiCalendarCheck />
        </IconGroup>
      </Link>
      <Link
        href="/profile"
        className={`${pathname.startsWith("/profile") && `${active}`}`}>
        <IconGroup title="프로필">
          <BiUser />
        </IconGroup>
      </Link>
    </nav>
  );
};

export default BottomNav;
