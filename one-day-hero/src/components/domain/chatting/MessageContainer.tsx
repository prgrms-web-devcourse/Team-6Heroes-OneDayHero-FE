"use client";

import { MutableRefObject } from "react";

import { MessageProps } from "@/hooks/useChatting";

import Message from "./Message";

type MessageContainerProps = {
  messages: MessageProps[];
  messageEndRef: MutableRefObject<HTMLDivElement | null>;
};

const MessageContainer = ({
  messages,
  messageEndRef
}: MessageContainerProps) => {
  return (
    <div className="relative w-full">
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
