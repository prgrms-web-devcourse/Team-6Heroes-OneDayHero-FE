import React from "react";

import NotificationItem from "@/components/domain/notification/NotificationItem";

const NotificationPage = () => {
  return (
    <div className="flex w-full flex-col items-center">
      <NotificationItem
        title="제안받은 미션을 확인해 보세요."
        content="선량한 시민님이 보낸 '심부름 해주실 분' 미션을 확인해 보세요."
        createdAt="2023-11-07T00:55:00Z"
      />
    </div>
  );
};

export default NotificationPage;
