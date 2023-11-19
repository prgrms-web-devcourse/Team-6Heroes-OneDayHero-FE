import { ReviewDetailResponse } from "./../types/response";
import { useFetch } from "./base";

export const useGetReviewDetailFetch = (userId: number, reviewId: number) => {
  return useFetch<ReviewDetailResponse>(`/review/${userId}/${reviewId}`, {
    next: { tags: [`review${reviewId}`] }
  });
};
