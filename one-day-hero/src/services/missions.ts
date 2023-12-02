/* eslint-disable no-unused-vars */
import { MutableRefObject } from "react";

import { useInfiniteFetch } from "@/hooks/useInfiniteFetch";
import { useMutationalFetch } from "@/hooks/useMutationalFetch";
import {
  BookmarkResponse,
  EditMissionResponse,
  EmptyResponse,
  MatchResponse,
  MissionResponse,
  ProgressMissionListResponse,
  ProposalResponse,
  SuggestedMissionListResponse,
  SuggestingMissionListResponse
} from "@/types/response";

import { CustomResponse, safeFetch } from "./base";

export const safeGetMissionFetch = (missionId: string, token: string) => {
  return safeFetch<MissionResponse>("backend", `/missions/${missionId}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 0 }
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

export const useEditMissionFetch = (missionId: number) => {
  return useMutationalFetch<EditMissionResponse>(
    "route",
    `/editMission/${missionId}`
  ) as {
    mutationalFetch: (
      fetchOptions: RequestInit,
      onSuccess?: (response: Response) => void,
      onError?: () => void
    ) => Promise<CustomResponse<EditMissionResponse>>;
    isLoading: boolean;
  };
};

export const safeEditMissionFetch = (
  missionId: number,
  data: FormData,
  token: string
) => {
  return safeFetch<EditMissionResponse>("backend", `/missions/${missionId}`, {
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
    isLoading: boolean;
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
    isLoading: boolean;
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
    isLoading: boolean;
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

export const useGetSuggestingMissionListFetch = (
  token: string,
  heroId: number
) => {
  return useMutationalFetch<SuggestingMissionListResponse>(
    "backend",
    `/missions/matching?heroId=${heroId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      next: { tags: [`matching`] }
    }
  );
};

export const useDeleteMissionFetch = () => {
  return useMutationalFetch<EmptyResponse>("backend") as {
    mutationalFetch: (
      pathname: string,
      fetchOptions: RequestInit,
      onSuccess?: (response?: Response) => void,
      onError?: () => void
    ) => Promise<CustomResponse<EmptyResponse>>;
    isLoading: boolean;
  };
};
