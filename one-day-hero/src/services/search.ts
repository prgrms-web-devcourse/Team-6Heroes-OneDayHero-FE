import { MissionSearchListResponse } from "@/types/response";

import { useInfiniteFetch } from "./base";

/** @note ?missionCategoryCodes=MC_00${categoryId}&regionIds=${dongId}  */
export const useGetMissionSearchListFetch = (
  categoryId: string,
  dongId: string
) => {
  return useInfiniteFetch<MissionSearchListResponse>(`/missions`, 3, {
    next: { tags: [`missionSearch${categoryId}${dongId}`] }
  });
};
