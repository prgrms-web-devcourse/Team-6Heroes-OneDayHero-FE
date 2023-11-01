import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import MenuBox from "./MenuBox";

type MenuDataType = {
  name: string;
  apiPath: string;
  requiredData: (string | { name: string; default?: any; options?: any[] })[];
  description?: string;
  redirectTo?: string;
};

export interface KebabMenuProp extends React.ComponentProps<"div"> {
  menuList: MenuDataType[];
}

const KebabMenu = ({ menuList }: KebabMenuProp) => {
  return (
    <div>
      <BsThreeDotsVertical />
      <MenuBox menuList={menuList} />
    </div>
  );
};

export default KebabMenu;
