"use client";

import { useRef } from "react";
import { BsFillCircleFill } from "react-icons/bs";

import { getClientToken } from "@/app/utils/cookie";
import { formatDate } from "@/app/utils/formatDate";
import { setLocalStorage } from "@/app/utils/storage";
import Container from "@/components/common/Container";
import { useGetNotificationFetch } from "@/services/notification";

const NotificationItem = () => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  setLocalStorage("sse", false);

  const token = getClientToken();

  const { data } = useGetNotificationFetch(token ?? "", observerRef);

  return (
    <>
      {data.length
        ? data.map((list) => (
            <Container key={list.id} className="cs:w-full cs:p-4 flex">
              <div className="flex w-full flex-col gap-2">
                <h1 className="text-base font-semibold">{list.title}</h1>
                <p className="text-sm">{list.content}</p>
                <p className="text-inactive text-xs">
                  {formatDate(list.createdAt)}
                </p>
              </div>
              <BsFillCircleFill size="11" className="text-inactive" />
            </Container>
          ))
        : null}
      <div ref={observerRef} />
    </>
  );
};

export default NotificationItem;
