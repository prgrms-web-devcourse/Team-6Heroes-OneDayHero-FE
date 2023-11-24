import { ChatRoomsResponse } from "@/types/response";

import { useFetch } from "./base";

export const useGetChatRoomsFetch = (token: string) => {
  return useFetch<ChatRoomsResponse>(`/chat-rooms/users`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 0 }
  });
};
