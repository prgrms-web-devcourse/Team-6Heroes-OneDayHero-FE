"use client";

import Message from "./Message";

type MessageContainerProps = {
  newMessages: string[];
};

const MessageContainer = ({ newMessages }: MessageContainerProps) => {
  return (
    <>
      {newMessages.map((message, idx) => {
        return (
          <Message
            key={idx}
            imagePath=""
            message={message}
            ninkName="nick"
            sentAt="10:00pm"
            userId={1}
          />
        );
      })}
    </>
  );
};

export default MessageContainer;
