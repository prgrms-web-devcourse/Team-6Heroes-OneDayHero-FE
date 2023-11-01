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

interface KebabMenuProp extends React.ComponentProps<"div"> {
  menuList: MenuDataType[];
  size?: number;
}

const KebabMenu = ({ menuList, size }: KebabMenuProp) => {
  return (
    <div className="relative">
      <BsThreeDotsVertical size={size} />
      <MenuBox menuList={menuList} />
    </div>
  );
};

export default KebabMenu;
