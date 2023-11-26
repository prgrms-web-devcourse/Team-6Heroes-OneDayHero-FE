"use client";

import { MutableRefObject, PropsWithChildren, useEffect } from "react";

import { formatHour } from "@/app/utils/formatTime";
import { useUserId } from "@/contexts/UserIdProvider";
import { MessageProps } from "@/hooks/useChatting";

import Message from "./Message";

type MessageContainerProps = {
  messages: MessageProps[];
  messageEndRef: MutableRefObject<HTMLDivElement | null>;
  myImagePath: string;
  receiverImagePath: string;
};

const MessageContainer = ({
  messages,
  messageEndRef,
  myImagePath,
  receiverImagePath,
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
      <div ref={messageEndRef} />
    </div>
  );
};

export default MessageContainer;
