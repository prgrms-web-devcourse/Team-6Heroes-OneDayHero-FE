"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";

import Container from "@/components/common/Container";
import HorizontalScroll from "@/components/common/HorizontalScroll";
import Label from "@/components/common/Label";
import ProfileImage from "@/components/common/ProfileImage";
import { formatDate } from "@/utils/formatDate";

import ReadStarRating from "./ReadStarRating";

type ReviewInfoProps = {
  starScore: 1 | 2 | 3 | 4 | 5;
  createdAt: string;
  content: string;
  categoryName: string;
  senderId: number;
  senderNickname: string;
  profileImage?: string | null;
  reviewImage?:
    | {
        id: number | null;
        originalName?: string | null;
        uniqueName?: string | null;
        path: string | null;
      }[]
    | null;
  reviewId?: number;
};

const ReviewInfo = ({
  starScore,
  createdAt,
  content,
  reviewId,
  categoryName,
  senderId,
  senderNickname,
  profileImage,
  reviewImage
}: ReviewInfoProps) => {
  const router = useRouter();

  const handleProfileClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();

    router.push(`/citizenProfile/${senderId}`);
  };

  return (
    <Container className="cs:flex cs:w-full cs:flex-col cs:gap-5 cs:p-4">
      <div className="flex gap-3">
        <div
          className="bg-inactive relative h-[3.75rem] w-[3.75rem] rounded-full"
          onClick={handleProfileClick}>
          <ProfileImage src={profileImage || ""} alt="프로필 이미지" fill />
        </div>
        <div className="flex grow flex-col gap-[0.188rem]">
          <Label size="sm" className="cs:w-[4.188rem] whitespace-nowrap">
            {categoryName}
          </Label>
          <div className="flex gap-2">
            <ReadStarRating value={starScore} />
            <span className="text-inactive text-xs" suppressHydrationWarning>
              {formatDate(createdAt)}
            </span>
          </div>
          <span className="text-sm font-bold">{senderNickname}</span>
        </div>
      </div>
      <HorizontalScroll>
        {reviewImage &&
          reviewImage.map((image) => (
            <div
              key={image.id}
              className="relative h-[10rem] w-[10rem] shrink-0">
              <Image
                src={image.path || ""}
                alt="미션 사진"
                className="cs:rounded-2xl cs:pr-2"
                fill
              />
            </div>
          ))}
      </HorizontalScroll>
      {reviewId && (
        <div className="mt-2 gap-1">
          <h2 className="mb-2 ml-1 text-base font-semibold">리뷰 내용</h2>
          <p className="ml-1 text-[0.9rem]">{content}</p>
        </div>
      )}
    </Container>
  );
};

export default ReviewInfo;
