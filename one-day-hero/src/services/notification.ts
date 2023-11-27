import { NotificationResponse } from "@/types/response";

import { useFetch } from "./base";

export const useGetNotificationFetch = (token: string) => {
  return useFetch<NotificationResponse>("/alarms", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
