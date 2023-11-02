"use client";

import { useState } from "react";
import { BiDish, BiGift, BiStar } from "react-icons/bi";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import {
  MdOutlineCleaningServices,
  MdOutlineDeliveryDining,
  MdOutlineEventAvailable,
  MdOutlineLocalCafe
} from "react-icons/md";

import IconGroup from "@/components/common/IconGroup";

import HorizontalScroll from "./HorizontalScroll";

const categories = [
  { icon: <BiDish />, title: "서빙" },
  { icon: <CgSmartHomeRefrigerator />, title: "주방" },
  { icon: <MdOutlineDeliveryDining />, title: "배달·운전" },
  { icon: <MdOutlineLocalCafe />, title: "카페" },
  { icon: <MdOutlineCleaningServices />, title: "청소" },
  { icon: <MdOutlineEventAvailable />, title: "행사" },
  { icon: <BiGift />, title: "포장·물류" },
  { icon: <BiStar />, title: "기타" }
];

interface CategoryProps extends React.ComponentProps<"div"> {
  isRoute?: boolean;
}

const Category = ({ isRoute = false }: CategoryProps) => {
  const [active, setActive] = useState<number[] | null>(null);

  const containerStyle = "flex gap-3";
  const itemStyle =
    "flex-shrink-0 select-none flex justify-center items-center cursor-pointer bg-white w-16 h-16 rounded-3xl shadow";

  const handleClick = (index: number) => {
    if (!isRoute) {
      if (active?.includes(index)) {
        setActive(active.filter((item) => item !== index));
      } else {
        setActive((prev) => (prev ? [...prev, index] : [index]));
      }
    }
  };

  return (
    <HorizontalScroll>
      <ul className={`${containerStyle}`}>
        {categories.map((category, index) => (
          <div
            key={index}
            className={`${itemStyle} ${
              active?.includes(index) && "cs:bg-primary"
            }`}
            onClick={() => handleClick(index)}>
            <IconGroup title={category.title} textSize="sm">
              {category.icon}
            </IconGroup>
          </div>
        ))}
      </ul>
    </HorizontalScroll>
  );
};

export default Category;
