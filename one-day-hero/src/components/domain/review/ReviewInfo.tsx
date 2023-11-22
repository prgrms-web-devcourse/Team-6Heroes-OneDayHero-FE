"use client";

import Image from "next/image";

import { formatDate } from "@/app/utils/formatDate";
import Container from "@/components/common/Container";
import Label from "@/components/common/Label";
import test from "~/images/원데히로고 2.png";

import ReadStarRating from "./ReadStarRating";

type ReviewInfoProps = {
  categoryName: string;
  starScore: 1 | 2 | 3 | 4 | 5;
  createdAt: string;
  content: string;
  senderNickname: string;
  profileImage?: string | null;
  reviewImage?:
    | {
        id: number;
        originalName: string;
        uniqueName: string;
        path: string;
      }[]
    | null;
};

const ReviewInfo = ({
  categoryName,
  starScore,
  createdAt,
  content,
  senderNickname,
  profileImage,
  reviewImage
}: ReviewInfoProps) => {
  return (
    <Container className="cs:flex cs:flex-col cs:w-full cs:gap-5 cs:p-4">
      <div className="flex gap-3">
        <div className="bg-inactive relative h-[60px] w-[60px] rounded-full">
          <Image
            src={profileImage ? profileImage : test}
            alt="프로필 이미지"
            fill
            className=" bg-cover"
          />
        </div>
        <div className="flex grow flex-col gap-[3px]">
          <Label size="sm" className="cs:w-[67px] whitespace-nowrap">
            {categoryName}
          </Label>
          <div className="flex gap-2">
            <ReadStarRating value={starScore} />
            <span className="text-inactive text-xs">
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
              src={image.path}
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
