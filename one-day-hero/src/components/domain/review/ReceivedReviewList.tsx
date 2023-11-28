"use client";

import Link from "next/link";
import { useRef } from "react";

import { getClientToken } from "@/app/utils/cookie";
import { useGetReceiveReviewFetch } from "@/services/review";

import ReviewInfo from "./ReviewInfo";

type ReceivedReviewListProps = {
  userId: number;
};

const ReceivedReviewList = ({ userId }: ReceivedReviewListProps) => {
  const token = getClientToken() ?? "";
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data } = useGetReceiveReviewFetch(userId, token, observerRef);

  return (
    <div className="mt-20 w-full">
      {data.map(
        ({
          reviewId,
          categoryName,
          missionTitle,
          starScore,
          createdAt,
          senderNickname,
          profileImage
        }) => (
          <Link
            key={reviewId}
            href={`/review/${reviewId}`}
            className="flex w-full justify-center">
            <ReviewInfo
              categoryName={categoryName}
              content={missionTitle}
              starScore={starScore}
              createdAt={createdAt}
              senderNickname={senderNickname}
              profileImage={profileImage[0]}
            />
          </Link>
        )
      )}
      <div ref={observerRef} />
    </div>
  );
};

export default ReceivedReviewList;
