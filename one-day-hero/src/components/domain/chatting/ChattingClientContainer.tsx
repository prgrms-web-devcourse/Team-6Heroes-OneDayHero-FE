"use client";

import { PropsWithChildren } from "react";

import Container from "@/components/common/Container";
import MissionListItem from "@/components/common/Info/MissionListItem";
import { useUserId } from "@/contexts/UserIdProvider";
import useChatting from "@/hooks/useChatting";

import ChattingInputFooter from "./ChattingInputFooter";
import MessageContainer from "./MessageContainer";
import MissionProgressButtonBar from "./MissionProgressButtonBar";

type ChattingClientContainerProps = {
  roomId: string;
};

const ChattingClientContainer = ({
  roomId,
  children
}: PropsWithChildren<ChattingClientContainerProps>) => {
  const { userId } = useUserId();
  const isCitizen = true;

  const { messages, sendMessage, messageEndRef } = useChatting(roomId);

  return (
    <>
      <div className="fixed top-[7.5rem] z-40 flex w-full max-w-screen-sm justify-center">
        <Container className="cs:flex cs:w-11/12 cs:items-center">
          {isCitizen ? (
            <MissionProgressButtonBar missionStatus="MATCHING" />
          ) : (
            <MissionListItem
              categories="서빙"
              createAt="2023-11-17"
              location="마포구 동교동"
              title="심부름 해주실 분 찾습니다."
              className="p-2"
            />
          )}
        </Container>
      </div>
      <div className="h-32 w-full" />
      <MessageContainer messages={messages} messageEndRef={messageEndRef}>
        {children}
      </MessageContainer>

      <ChattingInputFooter sendMessage={sendMessage} roomId={roomId} />
    </>
  );
};

export default ChattingClientContainer;
