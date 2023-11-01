"use client";

import useModal from "@/hooks/useModal";
import { MenuDataType } from ".";
import Modal from "../Modal";

interface MenuBoxProp extends React.ComponentProps<"div"> {
  menuList: MenuDataType[];
}

const MenuBox = ({ menuList }: MenuBoxProp) => {
  const { isOpen, onOpen, onClose } = useModal();

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full cursor-pointer hover:bg-black hover:bg-opacity-10" />
      <div>
        {menuList.map((menuData, index) => {
          const dividerStyle =
            index > 0 ? "border-b border-background-darken" : "";

          const positionStyle = "";

          return (
            <div key={menuData.name}>
              <div
                className={`absolute text-lg w-40 ${dividerStyle}`}
                onClick={onOpen}>
                {menuData.name}
              </div>
              <Modal isOpen={isOpen} onClose={onClose}>
                {menuData.name}
              </Modal>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MenuBox;
