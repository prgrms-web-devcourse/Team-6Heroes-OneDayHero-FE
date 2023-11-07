"use client";

import useModal from "@/hooks/useModal";

import { MouseEventHandler, useState } from "react";
import KebabModal from "./KebabModal";
import { KebabMenuDataType } from "@/types";

const MENU_ITEM_HEIGHT = 40;

interface MenuBoxProps extends React.ComponentProps<"div"> {
  menuList: KebabMenuDataType[];
}

const MenuBox = ({ menuList }: MenuBoxProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedMenuData, setSelectedMenuData] =
    useState<KebabMenuDataType | null>(null);
  const [enoughBottomSpace, setEnoughBottomSpace] = useState(true);

  const { isOpen, onOpen, onClose } = useModal();

  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    const boxHeight = menuList.length * MENU_ITEM_HEIGHT;

    setEnoughBottomSpace(e.clientY + boxHeight <= window.innerHeight);
    setShowMenu((prev) => !prev);
  };

  const positionStyle = enoughBottomSpace ? "top-1/2" : "bottom-1/2";

  return (
    <>
      <div
        className={`absolute top-0 left-0 w-full h-full cursor-pointer rounded-md hover:bg-background-darken hover:bg-opacity-30`}
        onClick={handleClick}
      />
      <div
        className={`z-20 fixed top-0 left-0 w-full h-full bg-transparent ${
          showMenu ? "" : "hidden"
        }`}
        onClick={() => {
          setShowMenu(false);
        }}
      />
      <div
        className={`absolute right-1/2 bg-white rounded-md shadow-down z-20 ${positionStyle} ${
          showMenu ? "" : "hidden"
        }`}
        onClick={(e) => {
          e.stopPropagation();
        }}>
        {menuList.map((menuData, index) => {
          const handleMenuClick = () => {
            onOpen();
            setSelectedMenuData(menuData);
          };

          const dividerStyle =
            index > 0 ? "border-t border-background-darken" : "";

          return (
            <div key={menuData.name}>
              <div
                className={`text-base max-w-[15rem] w-[80vw] h-10 flex justify-center items-center hover:bg-background-darken hover:bg-opacity-30 ${dividerStyle}`}
                // WARN: h-10 수정 시 MENU_ITEM_HEIGHT 같이 수정 해야함
                onClick={handleMenuClick}>
                {menuData.name}
              </div>
            </div>
          );
        })}
      </div>
      <KebabModal
        isOpen={isOpen}
        onClose={onClose}
        menuData={selectedMenuData}
      />
    </>
  );
};

export default MenuBox;
