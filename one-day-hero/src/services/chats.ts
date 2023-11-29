import {
  ChatRecordResponse,
  ChatRoomsResponse,
  ChatRoomSummaryResponse,
  MatchResponse
} from "@/types/response";

import { CustomResponse, useFetch, useMutationalFetch } from "./base";

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

export const useCreateMatchFetch = (
  missionId: number,
  heroId: number,
  token: string
) => {
  return useMutationalFetch<MatchResponse>("/mission-matches", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      missionId,
      heroId
    })
  }) as {
    mutationalFetch: (
      onSuccess?: (response?: Response) => void,
      onError?: () => void
    ) => Promise<CustomResponse<MatchResponse>>;
  };
};

export const useCompleteMissionFetch = (missionId: number, token: string) => {
  return useMutationalFetch<MatchResponse>(`/missions/${missionId}/complete`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` }
  }) as {
    mutationalFetch: (
      onSuccess?: (response?: Response) => void,
      onError?: () => void
    ) => Promise<CustomResponse<MatchResponse>>;
  };
};

export const useCreateChatRoomFetch = (
  missionId: number,
  heroId: number,
  citizenId: number,
  token: string
) => {
  return useMutationalFetch<ChatRoomSummaryResponse>("/chat-rooms", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      missionId,
      userIds: [heroId, citizenId]
    })
  }) as {
    mutationalFetch: (
      onSuccess?: (response?: Response) => void,
      onError?: () => void
    ) => Promise<CustomResponse<ChatRoomSummaryResponse>>;
  };
};
