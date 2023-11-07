"use client";

import { useState } from "react";
import { BiSolidStar } from "react-icons/bi";

import Button from "@/components/common/Button";
import { deleteBookmark, postBookmark } from "@/services/missions";

import IconGroup from "./IconGroup";

type BookmarkButtonProps = {
  missionId: number;
  bookmarkList: number[];
  size?: "sm" | "lg";
  className?: string;
};

const BookmarkButton = ({
  missionId,
  bookmarkList,
  size = "sm",
  className
}: BookmarkButtonProps) => {
  const userId = 123;

  const [optimisticBookmarkList, setOptimisticBookmarkList] =
    useState(bookmarkList);

  const isBookmarked = optimisticBookmarkList.includes(userId);

  const handleClick = async () => {
    const currentBookmarkList = optimisticBookmarkList;
    setOptimisticBookmarkList(
      isBookmarked
        ? optimisticBookmarkList.filter((id) => id !== userId)
        : [userId, ...optimisticBookmarkList]
    );

    try {
      await (isBookmarked
        ? deleteBookmark(missionId, userId)
        : postBookmark(missionId, userId));
    } catch (err) {
      console.error(err);
      setOptimisticBookmarkList(currentBookmarkList);
    }
  };

  const starColor = isBookmarked
    ? "text-orange-300 fill-orange-300"
    : "text-neutral-400 fill-transparent stroke-2";

  return size === "sm" ? (
    <div onClick={handleClick}>
      <IconGroup
        title="5"
        direction="row"
        size="lg"
        textSize="base"
        className={`${starColor} ${className}`}>
        <BiSolidStar className={starColor} />
      </IconGroup>
    </div>
  ) : (
    <Button
      size="sm"
      className={`cs:bg-white cs:text-black cs:hover:bg-inactive-lighten ${className}`}
      onClick={handleClick}>
      <div>
        <BiSolidStar className={`mb-1 mr-2 inline ${starColor}`} size="24" />
        {isBookmarked ? "찜했어요" : "찜하기"}
      </div>
    </Button>
  );
};

export default BookmarkButton;
