import { MutableRefObject } from "react";

import { useInfiniteFetch } from "@/hooks/useInfiniteFetch";
import { HeroNicknameSearchResponse } from "@/types/response";

export const useGetHeroNicknameDetailListFetch = (
  token: string,
  observerRef: MutableRefObject<HTMLDivElement | null>
) => {
  return useInfiniteFetch<HeroNicknameSearchResponse>({
    pathname: `/users/hero-search`,
    size: 3,
    observerRef,
    options: {
      headers: { Authorization: `Bearer ${token}` },
      next: { tags: [`searchHeroNickname`] }
    }
  });
};
