import { UserResponse } from "@/types/response";

import { useFetch } from "./base";

export const useGetUserFetch = (userId: number) => {
  return useFetch<UserResponse>(`/users/${userId}`, {
    next: { tags: [`user${userId}`] }
  });
};
