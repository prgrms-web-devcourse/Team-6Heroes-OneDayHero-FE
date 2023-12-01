"use client";

import Link from "next/link";
import { PropsWithChildren, useEffect, useState } from "react";

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
  receiverId: number;
  receiverImagePath: string;
  headCount: number;
};

const ChattingClientContainer = ({
  roomId,
  missionData,
  myImagePath,
  receiverId,
  receiverImagePath,
  headCount,
  children
}: PropsWithChildren<ChattingClientContainerProps>) => {
  const { userId } = useUserId();
  const [isCitizen, setIsCitizen] = useState(false);

  const { messages, sendMessage, messageEndRef } = useChatting(roomId);

  useEffect(() => {
    setIsCitizen(userId === missionData.citizenId);
  }, [missionData.citizenId, userId]);

  return (
    <>
      <div className="fixed top-[7.5rem] z-[45] flex w-full max-w-screen-sm justify-center">
        <Container className="cs:flex cs:w-11/12 cs:items-center">
          {isCitizen ? (
            <MissionProgressButtonBar
              missionStatus={missionData.missionStatus}
              missionId={missionData.id}
              receiverId={receiverId}
            />
          ) : (
            <Link href={`/mission/${missionData.id}`} className="w-full">
              <MissionListItem
                categories={missionData.missionCategory.name}
                missionDate={missionData.missionInfo.missionDate}
                location={`${missionData.region.gu} ${missionData.region.dong}`}
                title={missionData.missionInfo.title}
                imageSrc={missionData.missionImage?.[0]?.path}
                bookmarkCount={missionData.bookmarkCount}
                className="p-2"
              />
            </Link>
          )}
        </Container>
      </div>
      <div className="h-32 w-full" />
      <MessageContainer
        messages={messages}
        messageEndRef={messageEndRef}
        myImagePath={myImagePath}
        receiverImagePath={receiverImagePath}
        missionStatus={missionData.missionStatus}
        missionId={missionData.id}
        headCount={headCount}>
        {children}
      </MessageContainer>

      <ChattingInputFooter sendMessage={sendMessage} roomId={roomId} />
    </>
  );
};

export default ChattingClientContainer;
