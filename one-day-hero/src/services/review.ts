/* eslint-disable no-unused-vars */
import { MutableRefObject } from "react";

import { useInfiniteFetch } from "@/hooks/useInfiniteFetch";
import { useMutationalFetch } from "@/hooks/useMutationalFetch";

import {
  CreateReviewResponse,
  EmptyResponse,
  ReviewDetailResponse,
  ReviewListResponse
} from "./../types/response";
import { CustomResponse, safeFetch } from "./base";

export const useCreateReviewFetch = () => {
  return useMutationalFetch<CreateReviewResponse>("route", "/createReview") as {
    mutationalFetch: (
      fetchOptions: RequestInit,
      onSuccess?: (response?: Response) => void,
      onError?: () => void
    ) => Promise<CustomResponse<CreateReviewResponse>>;
    isLoading: boolean;
  };
};

export const safeCreateReviewFetch = (data: FormData, token: string) => {
  return safeFetch<CreateReviewResponse>("backend", "/reviews", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: data
  });
};

export const useEditReviewFetch = (reviewId: number) => {
  return useMutationalFetch<CreateReviewResponse>(
    "route",
    `/editReview/${reviewId}`
  ) as {
    mutationalFetch: (
      fetchOptions: RequestInit,
      onSuccess?: (response?: Response) => void,
      onError?: () => void
    ) => Promise<CustomResponse<CreateReviewResponse>>;
    isLoading: boolean;
  };
};

export const safeEditReviewFetch = (
  reviewId: number,
  data: FormData,
  token: string
) => {
  return safeFetch<CreateReviewResponse>("backend", `/reviews/${reviewId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: data
  });
};

export const useGetReviewDetailFetch = (reviewId: number, token: string) => {
  return safeFetch<ReviewDetailResponse>("backend", `/reviews/${reviewId}`, {
    method: "GET",
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
    baseUrlType: "backend",
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
  return useMutationalFetch<EmptyResponse>("backend", `/reviews/${reviewId}`, {
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
    baseUrlType: "backend",
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
  return useMutationalFetch<EmptyResponse>("backend") as {
    mutationalFetch: (
      pathname: string,
      fetchOptions: RequestInit,
      onSuccess?: (response?: Response) => void,
      onError?: () => void
    ) => Promise<CustomResponse<EmptyResponse>>;
    isLoading: boolean;
  };
};
