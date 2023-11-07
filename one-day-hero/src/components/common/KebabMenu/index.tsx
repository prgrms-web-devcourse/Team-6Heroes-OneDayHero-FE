import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

import { KebabMenuDataType } from "@/types";

import MenuBox from "./MenuBox";

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
