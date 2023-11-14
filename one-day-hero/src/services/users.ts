import { UserResponse } from "@/types/response";

import { useFetch, useMutationalFetch } from "./base";

export const useGetUserFetch = (userId: number) => {
  return useFetch<UserResponse>(`/users/${userId}`, {
    next: { tags: [`user${userId}`] }
  });
};

export const useChangeHeroFetch = (
  callback?: () => void,
  errorCallback?: () => void
) => {
  return useMutationalFetch<UserResponse>(
    "/me/change-hero",
    {
      method: "PATCH"
    },
    callback,
    errorCallback
  );
};

export const useChangeCitizenFetch = (
  callback?: () => void,
  errorCallback?: () => void
) => {
  return useMutationalFetch<UserResponse>(
    "/me/change-citizen",
    {
      method: "PATCH"
    },
    callback,
    errorCallback
  );
};
