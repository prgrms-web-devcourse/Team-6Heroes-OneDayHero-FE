import { revalidateTag } from "next/cache";
import Link from "next/link";

import ReviewInfo from "@/components/domain/review/ReviewInfo";
import { useGetSendReviewFetch } from "@/services/review";

const SendReviewPage = async () => {
  revalidateTag("sendReview");

  const { data, hasNextPage, fetchNextPage } = await useGetSendReviewFetch();

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
            senderNickName
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
                senderNickName={senderNickName}
                reviewId={reviewId}
              />
            </Link>
          )
        )}
    </div>
  );
};

export default SendReviewPage;
