"use client";

import Link from "next/link";
import { useRef } from "react";

import { getClientToken } from "@/app/utils/cookie";
import { useGetSendReviewFetch } from "@/services/review";

import ReviewInfo from "./ReviewInfo";

const SentReviewList = () => {
  const token = getClientToken() ?? "";
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data } = useGetSendReviewFetch(token, observerRef);

  return (
    <div className="w-full">
      {data.map(
        ({
          reviewId,
          categoryName,
          missionTitle,
          starScore,
          createdAt,
          senderNickname
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
            />
          </Link>
        )
      )}
    </div>
  );
};

export default SentReviewList;
