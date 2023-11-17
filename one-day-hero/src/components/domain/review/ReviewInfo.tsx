import Image from "next/image";

import { formatDate } from "@/app/utils/formatDate";
import Container from "@/components/common/Container";
import KebabMenu from "@/components/common/KebabMenu";
import Label from "@/components/common/Label";
import { ReviewDetailResponse } from "@/types/response";
import test from "~/images/원데히로고 2.png";

import ReadStarRating from "./ReadStarRating";

type ReviewInfoProps = {
  data: ReviewDetailResponse["data"];
};

const ReviewInfo = ({ data }: ReviewInfoProps) => {
  const { missionCategory, starScore, content, createdAt, senderNickName } =
    data;

  return (
    <Container className="cs:flex cs:flex-col cs:w-full cs:gap-5 cs:p-5">
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
          <Label size="sm" className="cs:w-[67px]">
            {missionCategory.name}
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
    </Container>
  );
};

export default ReviewInfo;
