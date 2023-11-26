"use client";

import { MutableRefObject, PropsWithChildren } from "react";

import { MessageProps } from "@/hooks/useChatting";

import Message from "./Message";

type MessageContainerProps = {
  messages: MessageProps[];
  messageEndRef: MutableRefObject<HTMLDivElement | null>;
};

const MessageContainer = ({
  messages,
  messageEndRef,
  children
}: PropsWithChildren<MessageContainerProps>) => {
  return (
    <div className="relative w-full">
      {children}
      {messages.map(({ senderNickName, message, senderId }, idx) => {
        return (
          <Message
            key={idx}
            imagePath=""
            message={message}
            ninkName={senderNickName}
            sentAt="10:00pm"
            userId={senderId}
          />
        );
      })}
      <div ref={messageEndRef} />
    </div>
  );
};

export default MessageContainer;
