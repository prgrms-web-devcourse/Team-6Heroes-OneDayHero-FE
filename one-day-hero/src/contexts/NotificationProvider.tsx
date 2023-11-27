"use client";

import { EventSourcePolyfill } from "event-source-polyfill";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from "react";

import { getClientToken } from "@/app/utils/cookie";
import { apiUrl } from "@/services/base";

type NotificationContextType = {
  alarmStatus: boolean;
  setAlarmStatus: Dispatch<SetStateAction<boolean>>;
};

const NotificationContext = createContext<NotificationContextType | null>(null);

const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [alarmStatus, setAlarmStatus] = useState<boolean>(false);

  useEffect(() => {
    const token = getClientToken();

    if (token) {
      const eventSource = new EventSourcePolyfill(apiUrl("/sse/subscribe"), {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      eventSource.onmessage = async (event) => {
        const res = event.data;
        console.log(res);

        setAlarmStatus(true);
      };

      eventSource.onerror = (e) => {
        setAlarmStatus(false);
        throw new Error("알림 구독에서 에러가 발생했습니다.");
      };

      return () => {
        if (eventSource) {
          setAlarmStatus(false);
          eventSource.close();
        }
      };
    }
  }, []);

  return (
    <NotificationContext.Provider value={{ alarmStatus, setAlarmStatus }}>
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
