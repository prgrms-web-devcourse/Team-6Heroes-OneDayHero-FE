import { UserResponse } from "@/types/response";

import { apiUrl } from "./urls";

export const getUser = async (userId: number): Promise<UserResponse> => {
  const response = await fetch(apiUrl(`/users/${userId}`), {
    next: { tags: [`user${userId}`] }
  });
  return response.json();
};
