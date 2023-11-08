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

import ErrorMessage from "../domain/mission/create/ErrorMessage";
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

type CategoryProps = {
  isRoute?: boolean;
  error?: string;
  // eslint-disable-next-line no-unused-vars
  onSelect?: (idx: number) => void;
};

const Category = ({ isRoute = false, error, onSelect }: CategoryProps) => {
  const [categoryActiveState, setCategoryActiveState] = useState<boolean[]>(
    Array(categories.length).fill(false)
  );

  const containerStyle = "flex gap-3 py-1";

  const itemStyle =
    "flex-shrink-0 select-none flex justify-center items-center cursor-pointer bg-white w-16 h-16 rounded-3xl border border-inactive shadow";

  const handleClick = (index: number) => {
    if (!isRoute && onSelect) {
      const newActiveState = categoryActiveState.map(
        (active, idx) => idx === index && !active
      );

      setCategoryActiveState(newActiveState);

      const categoryId = newActiveState.findIndex((category) => category) + 1;

      onSelect(categoryId);
    } else {
      /** @note url 구조 따라 link 추가 예정 */
      console.log("link");
    }
  };

  return (
    <HorizontalScroll>
      <ul className={`${containerStyle}`}>
        {categories.map((category, index) => (
          <div
            key={index}
            className={`${itemStyle} ${
              categoryActiveState[index] && "cs:bg-primary"
            }`}
            onClick={() => handleClick(index)}>
            <IconGroup
              title={category.title}
              textSize="xs"
              className="cs:text-3xl">
              {category.icon}
            </IconGroup>
          </div>
        ))}
      </ul>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </HorizontalScroll>
  );
};

export default Category;
