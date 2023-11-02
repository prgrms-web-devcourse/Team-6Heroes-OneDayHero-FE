import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import MenuBox from "./MenuBox";
import { KebabMenuDataType } from "@/types";

interface KebabMenuProps extends React.ComponentProps<"div"> {
  menuList: KebabMenuDataType[];
  size?: number;
}

const KebabMenu = ({ menuList, size, className }: KebabMenuProps) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <BsThreeDotsVertical size={size} />
      <MenuBox menuList={menuList} />
    </div>
  );
};

export default KebabMenu;
