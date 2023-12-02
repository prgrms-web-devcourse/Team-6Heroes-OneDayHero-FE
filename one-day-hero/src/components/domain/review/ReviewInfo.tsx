"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";

import Container from "@/components/common/Container";
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
};

const ReviewInfo = ({
  starScore,
  createdAt,
  content,
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
          className="relative h-[3.75rem] w-[3.75rem] rounded-full bg-inactive"
          onClick={handleProfileClick}>
          <ProfileImage
            src={profileImage || ""}
            alt="프로필 이미지"
            height={60}
            width={60}
          />
        </div>
        <div className="flex grow flex-col gap-[0.188rem]">
          <Label size="sm" className="whitespace-nowrap cs:w-[4.188rem]">
            {categoryName}
          </Label>
          <div className="flex gap-2">
            <ReadStarRating value={starScore} />
            <span className="text-xs text-inactive" suppressHydrationWarning>
              {formatDate(createdAt)}
            </span>
          </div>
          <span className="text-sm font-bold">{senderNickname}</span>
        </div>
      </div>
      {reviewImage &&
        reviewImage.map((image) => (
          <div key={image.id} className="relative h-32 w-32">
            <Image
              src={image.path || ""}
              alt="리뷰 이미지"
              fill
              className="object-cover"
            />
          </div>
        ))}
      <span className="text-sm font-bold">{content}</span>
    </Container>
  );
};

export default ReviewInfo;
