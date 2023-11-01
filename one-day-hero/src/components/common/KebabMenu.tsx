import React from "react";

type MenuDataType = {
  name: string;
  handleClick: () => void;
};

interface KebabMenuProp extends React.ComponentProps<"div"> {
  MenuList: MenuDataType[];
}

const KebabMenu = ({ MenuList }: KebabMenuProp) => {};

export default KebabMenu;
