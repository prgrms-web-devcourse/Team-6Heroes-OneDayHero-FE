/* eslint-disable no-unused-vars */
import { UserResponse } from "@/types/response";

import { CustomResponse, useFetch, useMutationalFetch } from "./base";

export const useGetProfileFetch = (userId: number, isHero: boolean) => {
  return useFetch<UserResponse>(
    `/users/${userId}/${isHero ? "hero-profile" : "citizen-profile"}`,
    {
      next: { tags: [`user${userId}`] }
    }
  );
};

export const useGetUserFetch = (userId: number) => {
  return useFetch<UserResponse>(`/me/${userId}`, {
    next: { tags: [`user${userId}`] }
  });
};

export const useChangeHeroFetch = (
  onSuccess?: () => void,
  onError?: () => void
) => {
  return useMutationalFetch<UserResponse>(
    "/me/change-hero",
    {
      method: "PATCH"
    },
    onSuccess,
    onError
  );
};

export const useChangeCitizenFetch = (
  onSuccess?: () => void,
  onError?: () => void
) => {
  return useMutationalFetch<UserResponse>(
    "/me/change-citizen",
    {
      method: "PATCH"
    },
    onSuccess,
    onError
  );
};

export const useEditProfileFetch = () => {
  return useMutationalFetch<UserResponse>("/me") as {
    mutationalFetch: (
      fetchOptions: RequestInit,
      onSuccess?: () => void,
      onError?: () => void
    ) => Promise<CustomResponse<UserResponse>>;
  };
};
