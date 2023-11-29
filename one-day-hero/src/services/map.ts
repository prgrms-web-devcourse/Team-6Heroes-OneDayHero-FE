import { MutableRefObject } from "react";

import { getClientToken } from "@/app/utils/cookie";
import { useInfiniteFetch } from "@/hooks/useInfiniteFetch";
import { MapResponse } from "@/types/response";

export const useGetMapMissionList = (
  token: string,
  observerRef: MutableRefObject<HTMLDivElement | null>
) => {
  return useInfiniteFetch<MapResponse>({
    pathname: `/missions/around`,
    size: 4,
    observerRef,
    options: {
      headers: { Authorization: `Bearer ${token}` },
      next: { tags: [`maps`] }
    }
  });
};
