import { ChatRecordResponse, ChatRoomsResponse } from "@/types/response";

import { useFetch } from "./base";

export const useGetChatRoomsFetch = (token: string) => {
  return useFetch<ChatRoomsResponse>(`/chat-rooms/me`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 10 }
  });
};

export const useGetChatRecordFetch = (roomId: string, token: string) => {
  return useFetch<ChatRecordResponse>(`/chat-rooms/${roomId}`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 0 }
  });
};
