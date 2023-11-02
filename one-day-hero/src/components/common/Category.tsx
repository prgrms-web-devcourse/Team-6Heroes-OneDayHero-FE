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
  const [activeState, setActiveState] = useState<boolean[]>(
    Array(categories.length).fill(false)
  );

  const containerStyle = "flex gap-3";
  const itemStyle =
    "flex-shrink-0 select-none flex justify-center items-center cursor-pointer bg-white w-16 h-16 rounded-3xl shadow";

  const handleClick = (index: number) => {
    if (!isRoute) {
      setActiveState(
        activeState.map((active, idx) => idx === index && !active)
      );
    } else {
      // url 구조 따라 link 추가 예정
      console.log("link");
    }
  };

  return (
    <HorizontalScroll>
      <ul className={`${containerStyle}`}>
        {categories.map((category, index) => (
          <div
            key={index}
            className={`${itemStyle} ${activeState[index] && "cs:bg-primary"}`}
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
