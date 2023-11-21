import { revalidateTag } from "next/cache";
import Link from "next/link";

import ReviewInfo from "@/components/domain/review/ReviewInfo";
import { useGetReceiveReviewFetch } from "@/services/review";

const ReviewReceivePage = async () => {
  revalidateTag("receiveReview");

  const { data, hasNextPage, fetchNextPage } = await useGetReceiveReviewFetch();

  return (
    <div className="w-full">
      {data &&
        data.map(
          ({
            reviewId,
            categoryName,
            missionTitle,
            starScore,
            createdAt,
            senderNickname
          }) => (
            <Link
              key={reviewId}
              href={`/review/1/${reviewId}`}
              className="flex w-full justify-center">
              <ReviewInfo
                categoryName={categoryName}
                content={missionTitle}
                starScore={starScore}
                createdAt={createdAt}
                reviewId={reviewId}
                senderNickName={senderNickname}
              />
            </Link>
          )
        )}
    </div>
  );
};

export default ReviewReceivePage;
