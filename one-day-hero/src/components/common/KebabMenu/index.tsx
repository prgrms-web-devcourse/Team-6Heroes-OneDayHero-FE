import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import MenuBox from "./MenuBox";

export type MenuDataType = {
  name: string;
  apiPath: string;
  requiredData: (string | { name: string; default?: any; options?: any[] })[];
  description?: string;
  redirectTo?: string;
};

interface KebabMenuProps extends React.ComponentProps<"div"> {
  menuList: MenuDataType[];
  size?: number;
}

const KebabMenu = ({ menuList, size }: KebabMenuProps) => {
  return (
    <div className="relative inline-block">
      <BsThreeDotsVertical size={size} />
      <MenuBox menuList={menuList} />
    </div>
  );
};

export default KebabMenu;
