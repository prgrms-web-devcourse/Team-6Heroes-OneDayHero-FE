import { revalidateTag } from "next/cache";
import Link from "next/link";

import { getServerToken } from "@/app/utils/auth";
import ReviewInfo from "@/components/domain/review/ReviewInfo";
import { useGetSendReviewFetch } from "@/services/review";

const user = {
  id: 1,
  name: "내이름"
};

const SendReviewPage = async () => {
  revalidateTag("sendReview");

  const token = getServerToken();

  const { data, hasNextPage, fetchNextPage } = await useGetSendReviewFetch(
    token ?? ""
  );

  console.log(data);
  return (
    <div className="w-full">
      {data &&
        data.map(
          ({ reviewId, categoryName, missionTitle, starScore, createdAt }) => (
            <Link
              key={reviewId}
              href={`/review/${user.id}/${reviewId}`}
              className="flex w-full justify-center">
              <ReviewInfo
                categoryName={categoryName}
                content={missionTitle}
                starScore={starScore}
                createdAt={createdAt}
                reviewId={reviewId}
                senderNickName={user.name}
              />
            </Link>
          )
        )}
    </div>
  );
};

export default SendReviewPage;
