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

    const eventSource = new EventSourcePolyfill(
      `${process.env.NEXT_PUBLIC_BE_URL}:8082/api/v1/sse/subscribe`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    eventSource.onopen = (e) => {
      console.log("SSE 연결 성공!!");
    };

    eventSource.onerror = (e) => {
      console.log(e.target, "오류 메세지는 뭘까!");
    };

    return () => {
      if (eventSource) {
        setAlarmStatus(false);
        eventSource.close();
      }
    };
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
