import { UserResponse } from "@/types/response";

import { apiUrl } from "./base";

export const getUser = async (userId: number): Promise<UserResponse> => {
  const response = await fetch(apiUrl(`/users/${userId}`), {
    next: { tags: [`user${userId}`] }
  });
  return response.json();
};
