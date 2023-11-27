"use client";

import { MutableRefObject, PropsWithChildren, useEffect } from "react";

import { formatHour } from "@/app/utils/formatTime";
import LinkButton from "@/components/common/LinkButton";
import { useUserId } from "@/contexts/UserIdProvider";
import { MessageProps } from "@/hooks/useChatting";

import Message from "./Message";

type MessageContainerProps = {
  messages: MessageProps[];
  messageEndRef: MutableRefObject<HTMLDivElement | null>;
  myImagePath: string;
  receiverImagePath: string;
  missionStatus:
    | "MATCHING"
    | "MATCHING_COMPLETED"
    | "MISSION_COMPLETED"
    | "EXPIRED";
};

const MessageContainer = ({
  messages,
  messageEndRef,
  myImagePath,
  receiverImagePath,
  missionStatus,
  children
}: PropsWithChildren<MessageContainerProps>) => {
  const { userId } = useUserId();

  useEffect(() => {
    if (!messageEndRef.current) return;

    window.scrollTo({
      behavior: "instant",
      top:
        window.scrollY +
        messageEndRef.current.getBoundingClientRect().top -
        window.innerHeight +
        150
    });
  }, []);

  return (
    <div className="relative w-full">
      {children}
      {messages.map(({ senderNickName, message, senderId }, idx) => {
        const isMine = userId === senderId;
        return (
          <Message
            key={idx}
            imagePath={isMine ? myImagePath : receiverImagePath}
            message={message}
            ninkName={senderNickName}
            sentAt={formatHour()}
            isMine={senderId === userId}
          />
        );
      })}
      {missionStatus === "MISSION_COMPLETED" && (
        <>
          <p className="my-10 text-center text-sm text-neutral-400">
            완료된 미션의 채팅방입니다
          </p>
          <LinkButton
            href={`/review/create`}
            showChevron
            className="cs:h-12 cs:w-full cs:rounded-full">
            리뷰 작성하기
          </LinkButton>
        </>
      )}
      {missionStatus === "EXPIRED" && (
        <p className="my-10 text-center text-sm text-neutral-400">
          만기된 미션의 채팅방입니다
        </p>
      )}
      <div ref={messageEndRef} />
    </div>
  );
};

export default MessageContainer;
