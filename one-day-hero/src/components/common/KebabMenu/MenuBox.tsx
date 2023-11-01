"use client";

import useModal from "@/hooks/useModal";
import { KebabMenuProp } from ".";
import Modal from "../Modal";

const MenuBox = ({ menuList }: KebabMenuProp) => {
  const { isOpen, onOpen, onClose } = useModal();

  return (
    <div>
      {menuList.map((menuData, index) => {
        return (
          <div key={menuData.name}>
            <div
              className={`text-lg w-20 ${
                index > 0 ? "border-b border-background-darken" : ""
              }`}
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
  );
};

export default MenuBox;
