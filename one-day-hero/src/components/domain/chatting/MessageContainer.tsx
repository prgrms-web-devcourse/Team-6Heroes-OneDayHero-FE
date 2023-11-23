"use client";

type MessageContainerProps = {
  newMessages: string[];
};

const MessageContainer = ({ newMessages }: MessageContainerProps) => {
  return (
    <>
      {newMessages.map((message, idx) => {
        return <p key={idx}>{message}</p>;
      })}
    </>
  );
};

export default MessageContainer;
