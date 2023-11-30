"use client";

import { EventSourcePolyfill } from "event-source-polyfill";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect
} from "react";

import { apiUrl } from "@/services/base";
import { getClientToken } from "@/utils/cookie";
import { getLocalStorage, setLocalStorage } from "@/utils/storage";

import { useToast } from "./ToastProvider";

type NotificationContextType = {
  alarmStatus: boolean;
  setAlarmStatus: Dispatch<SetStateAction<boolean>>;
};

const NotificationContext = createContext<NotificationContextType | null>(null);

const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const { showToast } = useToast();

  useEffect(() => {
    const token = getClientToken();

    if (token) {
      const eventSource = new EventSourcePolyfill(apiUrl("/sse/subscribe"), {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      eventSource.onmessage = (event) => {
        const res = event.data;

        if (res === "sse") {
          return;
        }

        showToast("새로운 알림이 도착했어요!", "success");

        setLocalStorage("sse", true);
      };

      return () => {
        if (eventSource) {
          eventSource.close();
        }
      };
    }
  }, [showToast]);

  return (
    <NotificationContext.Provider value={getLocalStorage("sse")}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (context === null) {
    throw new Error("알람에 대한 Context를 확인해 주세요.");
  }

  return context;
};

export default NotificationProvider;
