/* eslint-disable no-unused-vars */
import { UserResponse } from "@/types/response";

import { CustomResponse, useFetch, useMutationalFetch } from "./base";

export const useGetProfileFetch = (
  userId: number,
  isHero: boolean,
  token: string
) => {
  return useFetch<UserResponse>(
    `/users/${userId}/${isHero ? "hero-profile" : "citizen-profile"}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      next: { tags: [`user${userId}`] }
    }
  );
};

export const useGetUserFetch = (token: string) => {
  return useFetch<UserResponse>(`/me`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { tags: [`user`] }
  });
};

export const useChangeHeroFetch = (
  onSuccess?: (response?: Response) => void,
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
  onSuccess?: (response?: Response) => void,
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
      onSuccess?: (response?: Response) => void,
      onError?: () => void
    ) => Promise<CustomResponse<UserResponse>>;
  };
};
