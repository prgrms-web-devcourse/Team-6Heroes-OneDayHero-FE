"use client";

import { useEffect, useState } from "react";
import { BiDish, BiGift, BiStar } from "react-icons/bi";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import {
  MdOutlineCleaningServices,
  MdOutlineDeliveryDining,
  MdOutlineEventAvailable,
  MdOutlineLocalCafe
} from "react-icons/md";

import IconGroup from "@/components/common/IconGroup";

import ErrorMessage from "./ErrorMessage";
import HorizontalScroll from "./HorizontalScroll";

export const CATEGORY_LIST = [
  { id: 1, icon: <BiDish />, title: "서빙" },
  { id: 2, icon: <CgSmartHomeRefrigerator />, title: "주방" },
  { id: 3, icon: <MdOutlineDeliveryDining />, title: "배달·운전" },
  { id: 4, icon: <MdOutlineLocalCafe />, title: "카페" },
  { id: 5, icon: <MdOutlineCleaningServices />, title: "청소" },
  { id: 6, icon: <MdOutlineEventAvailable />, title: "행사" },
  { id: 7, icon: <BiGift />, title: "포장·물류" },
  { id: 8, icon: <BiStar />, title: "기타" }
];

type CategoryProps = {
  value?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  routeState?: boolean;
  error?: string;
  // eslint-disable-next-line no-unused-vars
  onSelect?: (idx: number) => void;
  size?: "sm" | "lg";
  className?: string;
};

const initialCategoryState = Array(CATEGORY_LIST.length).fill(false);

const Category = ({
  value,
  routeState = false,
  error,
  onSelect,
  size = "sm",
  className
}: CategoryProps) => {
  const [categoryActiveState, setCategoryActiveState] = useState<boolean[]>(
    !value
      ? initialCategoryState
      : CATEGORY_LIST.map((category) => category.id === value)
  );

  const containerStyle = "flex py-1";

  const itemStyle = `flex-shrink-0 select-none flex justify-center items-center cursor-pointer bg-white ${
    size === "sm" ? "w-16 h-16" : "w-[4.5rem] h-[4.5rem]"
  } rounded-[25px] m-1 shadow`;

  const handleClick = (id: number) => {
    if (!routeState) {
      const newActiveState = categoryActiveState.map(
        (active, idx) => idx + 1 === id && !active
      );
      setCategoryActiveState(newActiveState);
    } else {
      /** @note url 구조 따라 link 추가 예정 */
      console.log("link");
    }
  };

  useEffect(() => {
    if (onSelect) {
      const categoryId = categoryActiveState.findIndex((active) => active) + 1;

      onSelect && onSelect(categoryId);
    }
  }, [categoryActiveState, onSelect]);

  return (
    <div className="flex flex-col">
      <HorizontalScroll>
        <ul className={`${containerStyle} ${className}`}>
          {CATEGORY_LIST.map((category) => (
            <div
              key={category.id}
              className={`${itemStyle} ${
                categoryActiveState[category.id - 1] && "cs:bg-primary"
              }`}
              onClick={() => handleClick(category.id)}>
              <IconGroup
                title={category.title}
                textSize="xs"
                className="cs:text-3xl">
                {category.icon}
              </IconGroup>
            </div>
          ))}
        </ul>
      </HorizontalScroll>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default Category;
