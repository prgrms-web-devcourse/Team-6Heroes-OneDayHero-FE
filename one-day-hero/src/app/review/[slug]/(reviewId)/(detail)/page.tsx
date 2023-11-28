import { revalidateTag } from "next/cache";

import ErrorPage from "@/app/error";
import { getServerToken } from "@/app/utils/auth";
import TitleBox from "@/components/common/TitleBox";
import ReviewInfo from "@/components/domain/review/ReviewInfo";
import { useGetReviewDetailFetch } from "@/services/review";

const ReviewDetailPage = async ({
  params
}: {
  params: { userId: string; reviewId: string };
}) => {
  revalidateTag(`review${params.reviewId}`);

  const token = getServerToken();

  const { isError, response } = await useGetReviewDetailFetch(
    parseInt(params.reviewId),
    token ?? ""
  );

  if (isError || !response) return <ErrorPage />;

  const { data } = response;

  const {
    missionTitle,
    categoryName,
    content,
    starScore,
    createdAt,
    senderNickname,
    reviewImageResponses
  } = data;

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <TitleBox category={categoryName} title={missionTitle} />
      <ReviewInfo
        categoryName={categoryName}
        content={content}
        starScore={starScore}
        createdAt={createdAt}
        senderNickname={senderNickname}
        reviewImage={reviewImageResponses}
      />
    </div>
  );
};

export default ReviewDetailPage;
