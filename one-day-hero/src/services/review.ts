import { MutableRefObject } from "react";

import { useInfiniteFetch } from "@/hooks/useInfiniteFetch";
import { useMutationalFetch } from "@/hooks/useMutationalFetch";

import {
  CreateReviewResponse,
  EmptyResponse,
  ReviewDetailResponse,
  ReviewListResponse
} from "./../types/response";
import { CustomResponse, safeMutationalFetch, useFetch } from "./base";

export const safeCreateReviewFetch = () => {
  return safeMutationalFetch<CreateReviewResponse>("/reviews") as {
    mutationalFetch: (
      fetchOptions: RequestInit,
      onSuccess?: (response?: Response) => void,
      onError?: () => void
    ) => Promise<CustomResponse<CreateReviewResponse>>;
  };
};

export const safeEditReviewFetch = (reviewId: number) => {
  return safeMutationalFetch<CreateReviewResponse>(`/reviews/${reviewId}`) as {
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
    },
    next: { tags: [`review${reviewId}`] }
  });
};

export const useGetSendReviewFetch = (
  token: string,
  observerRef: MutableRefObject<HTMLDivElement | null>
) => {
  return useInfiniteFetch<ReviewListResponse>({
    pathname: `/me/reviews/send`,
    size: 10,
    options: {
      headers: {
        Authorization: `Bearer ${token}`
      },
      next: { tags: ["reviews"] }
    },
    observerRef
  });
};

export const useDeleteSendReviewFetch = (reviewId: number) => {
  return useMutationalFetch<EmptyResponse>(`/reviews/${reviewId}`, {
    method: "DELETE",
    body: JSON.stringify({
      reviewId
    })
  });
};

export const useGetReceiveReviewFetch = (
  userId: number,
  token: string,
  observerRef: MutableRefObject<HTMLDivElement | null>
) => {
  return useInfiniteFetch<ReviewListResponse>({
    pathname: `/reviews/users/${userId}/receive`,
    size: 10,
    options: {
      headers: {
        Authorization: `Bearer ${token}`
      },
      next: { revalidate: 0 }
    },
    observerRef
  });
};

export const useDeleteReviewImageFetch = () => {
  return useMutationalFetch<EmptyResponse>() as {
    mutationalFetch: (
      pathname: string,
      fetchOptions: RequestInit,
      onSuccess?: (response?: Response) => void,
      onError?: () => void
    ) => Promise<CustomResponse<EmptyResponse>>;
  };
};
