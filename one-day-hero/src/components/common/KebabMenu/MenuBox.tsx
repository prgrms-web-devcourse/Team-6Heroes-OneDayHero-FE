"use client";

import { useRouter } from "next/navigation";
import { MouseEventHandler, useState } from "react";

import useModal from "@/hooks/useModal";
import { KebabMenuDataType } from "@/types";

import KebabModal from "./KebabModal";

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

  const router = useRouter();

  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    const boxHeight = menuList.length * MENU_ITEM_HEIGHT;

    setEnoughBottomSpace(e.clientY + boxHeight <= window.innerHeight);
    setShowMenu((prev) => !prev);
  };

  const positionStyle = enoughBottomSpace ? "top-1/2" : "bottom-1/2";

  return (
    <>
      <div
        className={`absolute left-0 top-0 h-full w-full cursor-pointer rounded-md hover:bg-background-darken hover:bg-opacity-30`}
        onClick={handleClick}
      />
      <div
        className={`fixed left-0 top-0 z-20 h-full w-full bg-transparent ${
          showMenu ? "" : "hidden"
        }`}
        onClick={() => {
          setShowMenu(false);
        }}
      />
      <div
        className={`absolute right-1/2 z-20 rounded-md bg-white shadow-down ${positionStyle} ${
          showMenu ? "" : "hidden"
        }`}
        onClick={(e) => {
          e.stopPropagation();
        }}>
        {menuList.map((menuData, index) => {
          const handleMenuClick = () => {
            if (!menuData?.apiPath) {
              router.push(menuData.redirectTo ?? "/");
              return;
            }

            onOpen();
            setSelectedMenuData(menuData);
          };

          const dividerStyle =
            index > 0 ? "border-t border-background-darken" : "";

          return (
            <div key={menuData.name}>
              <div
                className={`flex h-10 w-[80vw] max-w-[15rem] items-center justify-center text-base hover:bg-background-darken hover:bg-opacity-30 ${dividerStyle}`}
                /**@note TODO: h-10 수정 시 MENU_ITEM_HEIGHT 같이 수정 해야함 */
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
