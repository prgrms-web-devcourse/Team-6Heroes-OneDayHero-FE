import { revalidateTag } from "next/cache";

import {
  CreateReviewResponse,
  ReviewDeleteResponse,
  ReviewDetailResponse,
  ReviewReceiveResponse,
  SendReviewResponse
} from "./../types/response";
import {
  CustomResponse,
  useFetch,
  useInfiniteFetch,
  useMutationalFetch
} from "./base";

export const usePostCreateReviewFetch = () => {
  return useMutationalFetch<CreateReviewResponse>("/reviews") as {
    mutationalFetch: (
      fetchOptions: RequestInit,
      onSuccess?: (response?: Response) => void,
      onError?: () => void
    ) => Promise<CustomResponse<CreateReviewResponse>>;
  };
};

export const useGetReviewDetailFetch = (reviewId: number, token: string) => {
  return useFetch<ReviewDetailResponse>(`/reviews/${reviewId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const useGetSendReviewFetch = async (token: string) => {
  return useInfiniteFetch<SendReviewResponse>(`/me/reviews/send`, 5, {
    headers: {
      Authorization: `Bearer ${token}`
    }
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

export const useGetReceiveReviewFetch = (token: string) => {
  return useInfiniteFetch<ReviewReceiveResponse>("/me/reviews/receive", 5, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
