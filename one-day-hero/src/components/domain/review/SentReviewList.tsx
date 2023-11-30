"use client";

import Link from "next/link";
import { useRef } from "react";

import { useUserId } from "@/contexts/UserIdProvider";
import { useGetSendReviewFetch } from "@/services/review";
import { getClientToken } from "@/utils/cookie";

import ReviewInfo from "./ReviewInfo";

const SentReviewList = () => {
  const token = getClientToken() ?? "";
  const { userId } = useUserId();

  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data } = useGetSendReviewFetch(token, observerRef);

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
              senderId={userId}
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

export default SentReviewList;
