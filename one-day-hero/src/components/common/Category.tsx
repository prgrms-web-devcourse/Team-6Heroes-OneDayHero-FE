"use client";

import { useRef } from "react";
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

const Category = () => {
  const dragStateRef = useRef<boolean>(false);
  const containerStyle = "flex gap-3";
  const itemStyle =
    "flex-shrink-0 flex justify-center items-center cursor-pointer bg-white w-1/4 h-16 rounded-3xl shadow";

  const handleDragStart = () => {
    dragStateRef.current = true;
  };

  const handleDragEnd = () => {
    setTimeout(() => {
      dragStateRef.current = false;
    }, 0);
  };

  return (
    <HorizontalScroll dragStart={handleDragStart} dragEnd={handleDragEnd}>
      <ul className={`${containerStyle}`}>
        {categories.map((category, index) => (
          <div key={index} className={`${itemStyle}`}>
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
