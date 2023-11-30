import ErrorPage from "@/app/error";
import TitleBox from "@/components/common/TitleBox";
import ReviewInfo from "@/components/domain/review/ReviewInfo";
import { useGetReviewDetailFetch } from "@/services/review";
import { getServerToken } from "@/utils/auth";

const ReviewDetailPage = async ({ params }: { params: { slug: string } }) => {
  const reviewId = parseInt(params.slug);
  const token = getServerToken() ?? "";

  const { isError, response } = await useGetReviewDetailFetch(reviewId, token);

  if (isError || !response) return <ErrorPage />;

  const { data } = response;

  const {
    missionTitle,
    categoryName,
    content,
    starScore,
    createdAt,
    senderId,
    senderNickname,
    reviewImageResponses
  } = data;

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <TitleBox category={categoryName} title={missionTitle} />
      <ReviewInfo
        content={content}
        starScore={starScore}
        createdAt={createdAt}
        categoryName={categoryName}
        senderId={senderId}
        senderNickname={senderNickname}
        reviewImage={reviewImageResponses}
      />
    </div>
  );
};

export default ReviewDetailPage;
