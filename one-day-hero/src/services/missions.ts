import { MutableRefObject } from "react";

import { useInfiniteFetch } from "@/hooks/useInfiniteFetch";
import { useMutationalFetch } from "@/hooks/useMutationalFetch";
import {
  BookmarkResponse,
  MatchResponse,
  MissionResponse,
  ProgressMissionListResponse,
  ProposalResponse,
  SuggestedMissionListResponse,
  SuggestingMissionListResponse
} from "@/types/response";

import { CustomResponse, safeFetch } from "./base";

export const useGetMissionFetch = (missionId: string, token: string) => {
  return safeFetch<MissionResponse>("backend", `/missions/${missionId}`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { tags: [`mission${missionId}`] }
  });
};

export const useCreateMissionFetch = () => {
  return useMutationalFetch<MissionResponse>("route", `/createMission`) as {
    mutationalFetch: (
      fetchOptions: RequestInit,
      onSuccess?: (response?: Response) => void,
      onError?: () => void
    ) => Promise<CustomResponse<MissionResponse>>;
    isLoading: boolean;
  };
};

export const safeCreateMissionFetch = (data: FormData, token: string) => {
  return safeFetch<MissionResponse>("backend", "/missions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: data
  });
};

export const useProposeMissionFetch = () => {
  return useMutationalFetch<ProposalResponse>(
    "backend",
    "/mission-proposals"
  ) as {
    mutationalFetch: (
      fetchOptions: RequestInit,
      onSuccess?: () => void,
      onError?: () => void
    ) => Promise<CustomResponse<ProposalResponse>>;
  };
};

export const useRejectProposalFetch = (proposalId: number, token: string) => {
  return useMutationalFetch<MatchResponse>(
    "backend",
    `/mission-proposals/${proposalId}/reject`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  ) as {
    mutationalFetch: (
      onSuccess?: () => void,
      onError?: () => void
    ) => Promise<CustomResponse<MatchResponse>>;
  };
};

export const useApproveProposalFetch = (proposalId: number, token: string) => {
  return useMutationalFetch<MatchResponse>(
    "backend",
    `/mission-proposals/${proposalId}/approve`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  ) as {
    mutationalFetch: (
      onSuccess?: () => void,
      onError?: () => void
    ) => Promise<CustomResponse<MatchResponse>>;
  };
};

export const usePostBookmarkFetch = (missionId: number, token: string) => {
  return useMutationalFetch<BookmarkResponse>("backend", "/bookmarks", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      missionId
    })
  });
};

export const useDeleteBookmarkFetch = (missionId: number, token: string) => {
  return useMutationalFetch<BookmarkResponse>("backend", "/bookmarks", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      missionId
    })
  });
};

export const useGetSuggestedMissionListFetch = (
  token: string,
  observerRef: MutableRefObject<HTMLDivElement | null>
) => {
  return useInfiniteFetch<SuggestedMissionListResponse>({
    baseUrlType: "backend",
    pathname: `/mission-proposals`,
    size: 10,
    observerRef,
    options: {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 0 }
    }
  });
};

export const useGetProgressMissionListFetch = (
  token: string,
  observerRef: MutableRefObject<HTMLDivElement | null>
) => {
  return useInfiniteFetch<ProgressMissionListResponse>({
    baseUrlType: "backend",
    pathname: `/missions/progress`,
    size: 10,
    observerRef,
    options: {
      headers: { Authorization: `Bearer ${token}` },
      next: { tags: [`progress`] }
    }
  });
};

export const useGetCompleteMissionListFetch = (
  token: string,
  observerRef: MutableRefObject<HTMLDivElement | null>
) => {
  return useInfiniteFetch<ProgressMissionListResponse>({
    baseUrlType: "backend",
    pathname: `/missions/completed`,
    size: 10,
    observerRef,
    options: {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 0 }
    }
  });
};

export const useGetSuggestingMissionListFetch = (token: string) => {
  return useMutationalFetch<SuggestingMissionListResponse>(
    "backend",
    `/missions/matching`,
    {
      headers: { Authorization: `Bearer ${token}` },
      next: { tags: [`matching`] }
    }
  );
};
