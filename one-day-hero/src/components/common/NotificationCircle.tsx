"use client";

import { useNotification } from "@/contexts/NotificationProvider";

const NotificationCircle = () => {
  const { alarmStatus } = useNotification();

  return (
    <>
      {alarmStatus ? (
        <div className="bg-active absolute right-0 top-0 h-2.5 w-2.5 animate-ping rounded-full" />
      ) : null}
    </>
  );
};

export default NotificationCircle;
