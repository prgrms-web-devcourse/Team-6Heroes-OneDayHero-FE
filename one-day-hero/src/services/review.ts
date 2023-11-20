import { revalidateTag } from "next/cache";

import {
  ReviewDeleteResponse,
  ReviewDetailResponse,
  SendReviewResponse
} from "./../types/response";
import { useFetch, useInfiniteFetch, useMutationalFetch } from "./base";

export const useGetReviewDetailFetch = (reviewId: number) => {
  return useFetch<ReviewDetailResponse>(`/reviews/${reviewId}`, {
    next: { tags: [`review${reviewId}`] }
  });
};

export const useGetSendReviewFetch = async () => {
  return useInfiniteFetch<SendReviewResponse>(`/me/reviews/send`, 1, {
    next: { tags: ["sendReview"] }
  });
};

export const useDeleteSendReviewFetch = (reviewId: number) => {
  return useMutationalFetch<ReviewDeleteResponse>(
    `/reviews/${reviewId}`,
    {
      method: "DELETE",
      body: JSON.stringify({
        reviewId
      })
    },
    () => revalidateTag("sendReview")
  );
};
