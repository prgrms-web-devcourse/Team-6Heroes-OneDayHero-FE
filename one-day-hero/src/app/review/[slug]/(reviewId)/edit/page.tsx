import ErrorPage from "@/app/error";
import { getServerToken } from "@/app/utils/auth";
import { imageUrlToFile } from "@/app/utils/imageUrlToFile";
import TitleBox from "@/components/common/TitleBox";
import ReviewForm from "@/components/domain/review/ReviewForm";
import { useGetReviewDetailFetch } from "@/services/review";
import { ImageFileType } from "@/types";

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

  const images: ImageFileType[] = await Promise.all(
    reviewImageResponses.map(async ({ id, uniqueName, path }) => {
      return {
        id: id.toString(),
        file: await imageUrlToFile(path, uniqueName)
      };
    })
  );

  return (
    <div className="flex w-full flex-col items-center gap-5">
      <TitleBox category={categoryName} title={missionTitle} />
      <ReviewForm
        receiverNickname={receiverNickname}
        editDefaultData={{ content, starScore, images }}
      />
    </div>
  );
};

export default ReviewEditPage;
