"use client";

import { MessageProps } from "@/hooks/useChatting";

import Message from "./Message";

type MessageContainerProps = {
  messages: MessageProps[];
};

const MessageContainer = ({ messages }: MessageContainerProps) => {
  return (
    <>
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
    </>
  );
};

export default MessageContainer;
