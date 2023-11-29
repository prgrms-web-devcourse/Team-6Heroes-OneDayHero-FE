import ErrorPage from "@/app/error";
import { getServerToken } from "@/app/utils/auth";
import TitleBox from "@/components/common/TitleBox";
import ReviewForm from "@/components/domain/review/ReviewForm";
import { useGetReviewDetailFetch } from "@/services/review";

const ReviewEditPage = async ({ params }: { params: { slug: string } }) => {
  const reviewId = parseInt(params.slug);
  const token = getServerToken() ?? "";

  const { isError, response } = await useGetReviewDetailFetch(reviewId, token);

  if (isError || !response) return <ErrorPage />;

  const {
    missionTitle,
    categoryName,
    content,
    starScore,
    reviewImageResponses,
    receiverNickname
  } = response.data;

  return (
    <div className="flex w-full flex-col items-center gap-5">
      <TitleBox category={categoryName} title={missionTitle} />
      <ReviewForm
        receiverNickname={receiverNickname}
        editDefaultData={{
          content,
          starScore,
          imageDatas: reviewImageResponses,
          reviewId
        }}
      />
    </div>
  );
};

export default ReviewEditPage;
