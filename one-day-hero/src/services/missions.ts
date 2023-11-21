import { revalidatePath } from "next/cache";

import {
  BookmarkResponse,
  MissionResponse,
  ProgressMissionListResponse,
  SuggestedMissionListResponse
} from "@/types/response";

import {
  CustomResponse,
  useFetch,
  useInfiniteFetch,
  useMutationalFetch
} from "./base";

export const useGetMissionFetch = (missionId: string) => {
  return useFetch<MissionResponse>(`/missions/${missionId}`, {
    next: { tags: [`mission${missionId}`] }
  });
};

export const useCreateMissionFetch = () => {
  return useMutationalFetch<MissionResponse>("/missions") as {
    mutationalFetch: (
      fetchOptions: RequestInit,
      onSuccess?: (response?: Response) => void,
      onError?: () => void
    ) => Promise<CustomResponse<MissionResponse>>;
  };
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

export const useGetSuggestedMissionListFetch = (heroId: string) => {
  return useInfiniteFetch<SuggestedMissionListResponse>(
    `/mission-proposals?heroId=${heroId}`,
    3,
    {
      next: { tags: [`suggested${heroId}`] }
    }
  );
};

export const useGetProgressMissionListFetch = (userId: string) => {
  return useInfiniteFetch<ProgressMissionListResponse>(
    `/missions/progress/${userId}`,
    3,
    {
      next: { tags: [`progress${userId}`] }
    }
  );
};

export const useGetCompleteMissionListFetch = (userId: string) => {
  return useInfiniteFetch<ProgressMissionListResponse>(
    `/missions/complete/${userId}`,
    3,
    {
      next: { tags: [`complete${userId}`] }
    }
  );
};
