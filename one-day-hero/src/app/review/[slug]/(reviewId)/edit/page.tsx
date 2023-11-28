import ErrorPage from "@/app/error";
import { getServerToken } from "@/app/utils/auth";
import Button from "@/components/common/Button";
import TitleBox from "@/components/common/TitleBox";
import ReviewForm from "@/components/domain/review/ReviewForm";
import { useGetReviewDetailFetch } from "@/services/review";

const ReviewEditPage = async ({ params }: { params: { slug: string } }) => {
  const reviewId = parseInt(params.slug);
  const token = getServerToken() ?? "";

  const { isError, response } = await useGetReviewDetailFetch(reviewId, token);

  if (isError || !response) return <ErrorPage />;

  const { content, starScore, reviewImageResponses, receiverNickname } =
    response.data;

  return (
    <div className="flex w-full flex-col items-center gap-5">
      <TitleBox category="서빙" title="미션 타이틀" />
      <ReviewForm
        receiverNickname={receiverNickname}
        editDefaultData={{ content, starScore }}
      />
      <Button form="editReview" type="submit" className="cs:mt-3">
        제출하기
      </Button>
    </div>
  );
};

export default ReviewEditPage;
