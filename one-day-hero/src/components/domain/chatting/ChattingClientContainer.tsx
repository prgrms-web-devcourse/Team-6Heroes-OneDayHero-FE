"use client";

import { PropsWithChildren } from "react";

import Container from "@/components/common/Container";
import MissionListItem from "@/components/common/Info/MissionListItem";
import { useUserId } from "@/contexts/UserIdProvider";
import useChatting from "@/hooks/useChatting";
import { MissionResponse } from "@/types/response";

import ChattingInputFooter from "./ChattingInputFooter";
import MessageContainer from "./MessageContainer";
import MissionProgressButtonBar from "./MissionProgressButtonBar";

type ChattingClientContainerProps = {
  roomId: string;
  missionData: MissionResponse["data"];
  myImagePath: string;
  receiverImagePath: string;
};

const ChattingClientContainer = ({
  roomId,
  missionData,
  myImagePath,
  receiverImagePath,
  children
}: PropsWithChildren<ChattingClientContainerProps>) => {
  const { userId } = useUserId();
  const isCitizen = userId === missionData.citizenId;

  const { messages, sendMessage, messageEndRef } = useChatting(roomId);

  return (
    <>
      <div className="fixed top-[7.5rem] z-40 flex w-full max-w-screen-sm justify-center">
        <Container className="cs:flex cs:w-11/12 cs:items-center">
          {isCitizen ? (
            <MissionProgressButtonBar
              missionStatus={missionData.missionStatus}
            />
          ) : (
            <MissionListItem
              categories={missionData.missionCategory.name}
              createAt={missionData.missionInfo.missionDate}
              location={`${missionData.region.gu} ${missionData.region.dong}`}
              title={missionData.missionInfo.title}
              imageSrc={missionData.missionImage?.path}
              className="p-2"
            />
          )}
        </Container>
      </div>
      <div className="h-32 w-full" />
      <MessageContainer
        messages={messages}
        messageEndRef={messageEndRef}
        myImagePath={myImagePath}
        receiverImagePath={receiverImagePath}>
        {children}
      </MessageContainer>

      <ChattingInputFooter sendMessage={sendMessage} roomId={roomId} />
    </>
  );
};

export default ChattingClientContainer;
