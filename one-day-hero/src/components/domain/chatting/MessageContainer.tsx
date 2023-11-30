"use client";

import { MutableRefObject, PropsWithChildren, useEffect } from "react";

import LinkButton from "@/components/common/LinkButton";
import { useUserId } from "@/contexts/UserIdProvider";
import { MessageProps } from "@/hooks/useChatting";
import { formatHour } from "@/utils/formatTime";

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
  missionId: number;
  headCount: number;
};

const MessageContainer = ({
  messages,
  messageEndRef,
  myImagePath,
  receiverImagePath,
  missionStatus,
  missionId,
  headCount,
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
            href={`/mission/${missionId}/review`}
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
      {headCount < 2 && (
        <p className="my-10 text-center text-sm text-neutral-400">
          상대방이 채팅방을 나갔습니다
        </p>
      )}
      <div ref={messageEndRef} />
    </div>
  );
};

export default MessageContainer;
