import { revalidateTag } from "next/cache";
import Link from "next/link";

import { getServerToken } from "@/app/utils/auth";
import ReviewInfo from "@/components/domain/review/ReviewInfo";
import { useGetReceiveReviewFetch } from "@/services/review";

const ReviewReceivePage = async () => {
  revalidateTag("receiveReview");

  const token = getServerToken();

  const { data, hasNextPage, fetchNextPage } = await useGetReceiveReviewFetch(
    token ?? ""
  );

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
            profileImage,
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
                senderNickname={senderNickname}
                profileImage={profileImage[0] ?? null}
              />
            </Link>
          )
        )}
    </div>
  );
};

export default ReviewReceivePage;
