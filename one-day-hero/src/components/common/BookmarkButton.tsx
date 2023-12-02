"use client";

import { useRouter } from "next/navigation";
import { MouseEventHandler, useState, useTransition } from "react";
import { BiSolidStar } from "react-icons/bi";

import Button from "@/components/common/Button";
import {
  useDeleteBookmarkFetch,
  usePostBookmarkFetch
} from "@/services/missions";
import { getClientToken } from "@/utils/cookie";

import IconGroup from "./IconGroup";

type BookmarkButtonProps = {
  missionId: number;
  bookmarkCount: number;
  isBookmarked: boolean;
  size?: "sm" | "lg";
  refreshPage?: () => Promise<void>;
  className?: string;
};

const BookmarkButton = ({
  missionId,
  bookmarkCount,
  isBookmarked,
  size = "sm",
  refreshPage,
  className
}: BookmarkButtonProps) => {
  const token = getClientToken() ?? "";
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [optimisticBookmarkState, setOptimisticBookmarkState] = useState({
    bookmarkCount,
    isBookmarked
  });

  const { mutationalFetch: postBookmark, isLoading: postLoading } =
    usePostBookmarkFetch(missionId, token);
  const { mutationalFetch: deleteBookmark, isLoading: deleteLoading } =
    useDeleteBookmarkFetch(missionId, token);

  const handleClick: MouseEventHandler<
    HTMLButtonElement | HTMLDivElement
  > = async (e) => {
    e.preventDefault();
    if (postLoading || deleteLoading || isPending) return;

    const currentBookmarkState = optimisticBookmarkState;

    setOptimisticBookmarkState({
      bookmarkCount: isBookmarked ? bookmarkCount - 1 : bookmarkCount + 1,
      isBookmarked: !isBookmarked
    });

    const { isError } = await (isBookmarked
      ? deleteBookmark()
      : postBookmark());

    if (isError) {
      setOptimisticBookmarkState(currentBookmarkState);
      return;
    }

    startTransition(() => {
      refreshPage ? refreshPage() : router.refresh();
    });
  };

  const starColor = optimisticBookmarkState.isBookmarked
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
        {optimisticBookmarkState.isBookmarked ? "찜했어요" : "찜하기"}
      </div>
    </Button>
  );
};

export default BookmarkButton;
