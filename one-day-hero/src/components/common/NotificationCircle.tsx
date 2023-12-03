"use client";

import { useEffect, useState } from "react";

import { getLocalStorage } from "@/utils/storage";

const NotificationCircle = () => {
  const [alarmStatus, setAlarmStatus] = useState<boolean>(false);

  useEffect(() => {
    setAlarmStatus(getLocalStorage("sse", false));
  }, []);

  return (
    <>
      {alarmStatus ? (
        <div className="animate-ping absolute right-0 top-0 h-2.5 w-2.5 rounded-full bg-active" />
      ) : null}
    </>
  );
};

export default NotificationCircle;
