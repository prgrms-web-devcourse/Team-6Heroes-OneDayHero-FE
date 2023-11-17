import { ReviewDetailResponse } from "./../types/response";
import { useFetch } from "./base";

export const useGetReviewDetailFetch = (reviewId: number) => {
  return useFetch<ReviewDetailResponse>(`/review/${reviewId}`, {
    next: { tags: [`review${reviewId}`] }
  });
};
