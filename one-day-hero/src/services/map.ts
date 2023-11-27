import { MutableRefObject } from "react";

import { useInfiniteFetch } from "@/hooks/useInfiniteFetch";
import { MapResponse } from "@/types/response";

export const useGetMapMissionList = (
  token: string,
  lat: number,
  lng: number,
  observerRef: MutableRefObject<HTMLDivElement | null>
) => {
  return useInfiniteFetch<MapResponse>({
    pathname: `/missions/around`,
    size: 10,
    observerRef,
    options: {
      headers: { Authorization: `$Bearer ${token}` },
      next: { tags: [`maps`] }
    }
  });
};
