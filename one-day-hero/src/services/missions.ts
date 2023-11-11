import { revalidatePath } from "next/cache";

import {
  BookmarkResponse,
  MissionResponse,
  OngoingMissionListResponse,
  SuggestedMissionListResponse
} from "@/types/response";

import { useFetch, useMutationalFetch } from "./base";

export const useGetMissionFetch = (missionId: string) => {
  return useFetch<MissionResponse>(`/missions/${missionId}`, {
    next: { tags: [`mission${missionId}`] }
  });
};

export const useGetCompletedMissionFetch = () => {
  return useFetch<SuggestedMissionListResponse>(`/missions/record`, {
    next: { tags: ["record"] }
  });
};

export const usePostBookmarkFetch = (missionId: number, userId: number) => {
  return useMutationalFetch<BookmarkResponse>(
    "/bookmarks",
    {
      method: "POST",
      body: JSON.stringify({
        missionId,
        userId
      })
    },
    () => revalidatePath("/mission/[slug]", "page")
  );
};

export const useDeleteBookmarkFetch = (missionId: number, userId: number) => {
  return useMutationalFetch<BookmarkResponse>(
    "/bookmarks",
    {
      method: "DELETE",
      body: JSON.stringify({
        missionId,
        userId
      })
    },
    () => revalidatePath("/mission/[slug]", "page")
  );
};

export const useGetOngoingMissionListFetch = () => {
  return useFetch<OngoingMissionListResponse>(`/missions/list/ongoing`, {
    next: { tags: [`ongoing`] }
  });
};

export const useGetSuggestedMissionListFetch = () => {
  return useFetch<SuggestedMissionListResponse>(`/missions/list/suggested`, {
    next: { tags: [`suggested`] }
  });
};
