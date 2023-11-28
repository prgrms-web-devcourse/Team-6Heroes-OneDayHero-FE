"use client";

import Image from "next/image";
import Link from "next/link";

import { formatDate } from "@/app/utils/formatDate";
import Container from "@/components/common/Container";
import ProfileImage from "@/components/common/ProfileImage";

import ReadStarRating from "./ReadStarRating";

type ReviewInfoProps = {
  starScore: 1 | 2 | 3 | 4 | 5;
  createdAt: string;
  content: string;
  senderId: number;
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
  starScore,
  createdAt,
  content,
  senderId,
  senderNickname,
  profileImage,
  reviewImage
}: ReviewInfoProps) => {
  return (
    <Container className="cs:flex cs:w-full cs:flex-col cs:gap-5 cs:p-4">
      <div className="flex gap-3">
        <Link
          href={`/citizenProfile/${senderId}`}
          className="relative h-[60px] w-[60px] rounded-full bg-inactive">
          <ProfileImage
            src={profileImage || ""}
            alt="프로필 이미지"
            height={60}
          />
        </Link>
        <div className="flex grow flex-col gap-[3px]">
          <div className="flex gap-2">
            <ReadStarRating value={starScore} />
            <span className="text-xs text-inactive">
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
