import { revalidateTag } from "next/cache";
import { MutableRefObject } from "react";

import { useInfiniteFetch } from "@/hooks/useInfiniteFetch";

import {
  CreateReviewResponse,
  ReviewDeleteResponse,
  ReviewDetailResponse,
  ReviewReceiveResponse,
  SendReviewResponse
} from "./../types/response";
import { CustomResponse, useFetch, useMutationalFetch } from "./base";

export const useCreateReviewFetch = () => {
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

export const useGetSendReviewFetch = (
  token: string,
  observerRef: MutableRefObject<HTMLDivElement | null>
) => {
  return useInfiniteFetch<SendReviewResponse>({
    pathname: `/me/reviews/send`,
    size: 5,
    options: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    },
    observerRef
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

export const useGetReceiveReviewFetch = (
  userId: number,
  token: string,
  observerRef: MutableRefObject<HTMLDivElement | null>
) => {
  return useInfiniteFetch<SendReviewResponse>({
    pathname: `/reviews/users/${userId}/receive`,
    size: 5,
    options: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    },
    observerRef
  });
};
