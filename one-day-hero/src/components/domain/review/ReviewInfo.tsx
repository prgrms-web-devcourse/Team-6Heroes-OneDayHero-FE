"use client";

import Image from "next/image";

import { formatDate } from "@/app/utils/formatDate";
import Container from "@/components/common/Container";
import KebabMenu from "@/components/common/KebabMenu";
import Label from "@/components/common/Label";
import { useDeleteSendReviewFetch } from "@/services/review";
import test from "~/images/원데히로고 2.png";

import ReadStarRating from "./ReadStarRating";

type ReviewInfoProps = {
  categoryName: string;
  starScore: 1 | 2 | 3 | 4 | 5;
  createdAt: string;
  content: string;
  senderNickName: string;
  reviewId: number;
};

const ReviewInfo = ({
  categoryName,
  starScore,
  createdAt,
  content,
  senderNickName,
  reviewId
}: ReviewInfoProps) => {
  const { mutationalFetch: deleteReview } = useDeleteSendReviewFetch(reviewId);

  const handleDelete = async () => {
    await deleteReview();
  };

  return (
    <Container className="cs:flex cs:flex-col cs:w-full cs:gap-5 cs:p-4">
      <div className="flex gap-3">
        <div className="bg-inactive h-[60px] w-[60px] rounded-full">
          <Image
            src={test}
            alt="프로필 이미지"
            width={60}
            height={60}
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
          <span className="text-sm font-bold">{senderNickName}</span>
        </div>
        <KebabMenu
          menuList={[
            {
              name: "수정하기",
              apiPath: "/test",
              requiredData: ["slug"]
            },
            { name: "삭제하기", apiPath: "/test", requiredData: ["slug"] }
          ]}
          size={24}
        />
      </div>
      <span className="text-sm font-bold">{content}</span>
      <button onClick={handleDelete}>테스트</button>
    </Container>
  );
};

export default ReviewInfo;
