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
    id,
    missionTitle,
    categoryName,
    content,
    starScore,
    createdAt,
    senderId,
    senderNickname,
    senderProfileImage,
    reviewImageResponses
  } = data;

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <TitleBox category={categoryName} title={missionTitle} />
      <ReviewInfo
        reviewId={id}
        content={content}
        starScore={starScore}
        createdAt={createdAt}
        categoryName={categoryName}
        profileImage={senderProfileImage?.[0]}
        senderId={senderId}
        senderNickname={senderNickname}
        reviewImage={reviewImageResponses}
      />
    </div>
  );
};

export default ReviewDetailPage;
