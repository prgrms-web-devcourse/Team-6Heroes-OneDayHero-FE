import { MutableRefObject } from "react";

import { useInfiniteFetch } from "@/hooks/useInfiniteFetch";
import { MissionSearchListResponse } from "@/types/response";
import { HeroNicknameSearchResponse } from "@/types/response";

export const useGetMissionSearchListFetch = (
  token: string,
  observerRef: MutableRefObject<HTMLDivElement | null>
) => {
  return useInfiniteFetch<MissionSearchListResponse>({
    baseUrlType: "backend",
    pathname: `/missions`,
    size: 10,
    observerRef,
    options: {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 10 }
    }
  });
};

export const useGetHeroNicknameDetailListFetch = (
  token: string,
  observerRef: MutableRefObject<HTMLDivElement | null>
) => {
  return useInfiniteFetch<HeroNicknameSearchResponse>({
    baseUrlType: "backend",
    pathname: `/users/hero-search`,
    size: 10,
    observerRef,
    options: {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 10 }
    }
  });
};
