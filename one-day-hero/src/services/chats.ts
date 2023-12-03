/* eslint-disable no-unused-vars */
import { useMutationalFetch } from "@/hooks/useMutationalFetch";
import {
  ChatRecordResponse,
  ChatRoomsResponse,
  ChatRoomSummaryResponse,
  MatchResponse
} from "@/types/response";

import { CustomResponse, safeFetch } from "./base";

export const safeGetChatRoomsFetch = (token: string) => {
  return safeFetch<ChatRoomsResponse>("backend", `/chat-rooms/me`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 0 }
  });
};

export const safeGetChatRecordFetch = (roomId: string, token: string) => {
  return safeFetch<ChatRecordResponse>("backend", `/chat-rooms/${roomId}`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 0 }
  });
};

export const useCreateMatchFetch = (
  missionId: number,
  heroId: number,
  token: string
) => {
  return useMutationalFetch<MatchResponse>("backend", "/mission-matches", {
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
    isLoading: boolean;
  };
};

export const useCompleteMissionFetch = (missionId: number, token: string) => {
  return useMutationalFetch<MatchResponse>(
    "backend",
    `/missions/${missionId}/complete`,
    {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` }
    }
  ) as {
    mutationalFetch: (
      onSuccess?: (response?: Response) => void,
      onError?: () => void
    ) => Promise<CustomResponse<MatchResponse>>;
    isLoading: boolean;
  };
};

export const useCreateChatRoomFetch = (
  missionId: number,
  heroId: number,
  citizenId: number,
  token: string
) => {
  return useMutationalFetch<ChatRoomSummaryResponse>("backend", "/chat-rooms", {
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
    isLoading: boolean;
  };
};
