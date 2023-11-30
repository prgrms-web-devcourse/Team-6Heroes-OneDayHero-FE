/* eslint-disable no-unused-vars */
import { useMutationalFetch } from "@/hooks/useMutationalFetch";
import { UserResponse } from "@/types/response";

import { CustomResponse, safeFetch } from "./base";

export const safeGetProfileFetch = (
  userId: number,
  isHero: boolean,
  token: string
) => {
  return safeFetch<UserResponse>(
    "backend",
    `/users/${userId}/${isHero ? "hero-profile" : "citizen-profile"}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 0 }
    }
  );
};

export const safeGetUserFetch = (token: string) => {
  return safeFetch<UserResponse>("backend", `/me`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { tags: [`user`] }
  });
};

export const useChangeHeroFetch = (
  token: string,
  onSuccess?: (response?: Response) => void,
  onError?: () => void
) => {
  return useMutationalFetch<UserResponse>(
    "backend",
    "/me/change-hero",
    {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` }
    },
    onSuccess,
    onError
  );
};

export const useChangeCitizenFetch = (
  token: string,
  onSuccess?: (response?: Response) => void,
  onError?: () => void
) => {
  return useMutationalFetch<UserResponse>(
    "backend",
    "/me/change-citizen",
    {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` }
    },
    onSuccess,
    onError
  );
};

export const useEditProfileFetch = () => {
  return useMutationalFetch<UserResponse>("route", `/editProfile`) as {
    mutationalFetch: (
      fetchOptions: RequestInit,
      onSuccess?: (response?: Response) => void,
      onError?: () => void
    ) => Promise<CustomResponse<UserResponse>>;
    isLoading: boolean;
  };
};

export const safeEditProfileFetch = (data: FormData, token: string) => {
  return safeFetch<UserResponse>("backend", "/me", {
    method: "POST",
    body: data,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
