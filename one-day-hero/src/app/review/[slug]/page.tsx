import { revalidateTag } from "next/cache";

import ErrorPage from "@/app/error";
import TitleBox from "@/components/common/TitleBox";
import ReviewInfo from "@/components/domain/review/ReviewInfo";
import { useGetReviewDetailFetch } from "@/services/review";

const ReviewDetailPage = async ({ params }: { params: { slug: string } }) => {
  revalidateTag(`review${params.slug}`);

  const { isError, response } = await useGetReviewDetailFetch(
    parseInt(params.slug)
  );

  if (isError || !response) return <ErrorPage />;

  const { data } = response;

  const { missionTitle, missionCategory } = data;

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <TitleBox category={missionCategory.name} title={missionTitle} />
      <ReviewInfo data={data} />
    </div>
  );
};

export default ReviewDetailPage;
