"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { useUserId } from "@/contexts/UserIdProvider";
import { useGetReceiveReviewFetch } from "@/services/review";
import { getClientToken } from "@/utils/cookie";

import ReviewInfo from "./ReviewInfo";

type ReceivedReviewListProps = {
  userId: number;
};

const ReceivedReviewList = ({ userId }: ReceivedReviewListProps) => {
  const token = getClientToken() ?? "";
  const { userId: myUserId } = useUserId();
  const [isMe, setIsMe] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data } = useGetReceiveReviewFetch(userId, token, observerRef);

  /**@note hydration 경고 회피 용 */
  useEffect(() => {
    setIsMe(userId === myUserId);
  }, [myUserId, userId]);

  return (
    <div className={`w-full`}>
      {isMe && <div className="h-20" />}
      {data.map(
        ({
          reviewId,
          categoryName,
          missionTitle,
          starScore,
          createdAt,
          senderId,
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
              senderId={senderId ?? 0}
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
