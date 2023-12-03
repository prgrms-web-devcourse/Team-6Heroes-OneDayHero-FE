import { MutableRefObject } from "react";

import { useInfiniteFetch } from "@/hooks/useInfiniteFetch";
import { MapResponse } from "@/types/response";

export const useGetMapMissionList = (
  token: string,
  observerRef: MutableRefObject<HTMLDivElement | null>
) => {
  return useInfiniteFetch<MapResponse>({
    baseUrlType: "backend",
    pathname: `/missions/around`,
    size: 10,
    observerRef,
    options: {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 10 }
    }
  });
};
