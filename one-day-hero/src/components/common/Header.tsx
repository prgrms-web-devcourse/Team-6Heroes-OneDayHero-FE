"use client";

import Link from "next/link";
import { PropsWithChildren } from "react";
import { FiEdit3 } from "react-icons/fi";

import BackButton from "./BackButton";

type HeaderProps = {
  left?: "back" | "none";
  right?: "edit" | "info" | "none";
  rightNode?: React.ReactNode;
  children: React.ReactNode;
};

const Header = ({
  left = "back",
  right = "none",
  rightNode,
  children
}: PropsWithChildren<HeaderProps>) => {
  const leftArea = {
    back: <BackButton />,
    none: <div className="w-5" />
  };

  const rightArea = {
    edit: (
      <Link
        href={{
          pathname: "/survey/mandatory",
          query: {
            edit: "profile"
          }
        }}>
        <FiEdit3 />
      </Link>
    ),
    info: rightNode,
    none: <div className="w-6" />
  };

  const defaultStyle =
    "border-b border-background-darken flex items-center w-full fixed top-0 max-w-screen-sm px-4 bg-background justify-between space-x-4 h-16 z-50";

  return (
    <header className={defaultStyle}>
      <div className="text-xl">{leftArea[left]}</div>
      <div className="mx-auto px-0 text-center text-xl font-semibold">
        {children}
      </div>
      <div className="text-2xl">{rightArea[right]}</div>
    </header>
  );
};

export default Header;
