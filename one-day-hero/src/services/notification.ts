import { MutableRefObject } from "react";

import { useInfiniteFetch } from "@/hooks/useInfiniteFetch";
import { NotificationResponse } from "@/types/response";

export const useGetNotificationFetch = (
  token: string,
  observerRef: MutableRefObject<HTMLDivElement | null>
) => {
  return useInfiniteFetch<NotificationResponse>({
    baseUrlType: "backend",
    pathname: "/alarms",
    size: 10,
    observerRef,
    options: {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 10 }
    }
  });
};
