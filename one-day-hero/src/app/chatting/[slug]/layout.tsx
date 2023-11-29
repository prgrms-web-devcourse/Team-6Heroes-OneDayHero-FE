import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

import { getServerToken } from "@/app/utils/auth";
import Container from "@/components/common/Container";
import Header from "@/components/common/Header";
import KebabMenu from "@/components/common/KebabMenu";
import { useGetChatRoomsFetch } from "@/services/chats";
import { KebabMenuDataType } from "@/types";

type LayoutProps = {
  params: { slug: string };
  children: React.ReactNode;
};

const ChattingLayout = async ({ params, children }: LayoutProps) => {
  const roomId = params.slug;
  const token = getServerToken();

  if (!token) redirect("/login?redirect=");

  const { response: chatRoomResponse } = await useGetChatRoomsFetch(token);

  const thisRoomData = chatRoomResponse?.data.find(
    ({ id }) => id.toString() === roomId
  );

  const chattingRoomOutMenuData: KebabMenuDataType = {
    name: "채팅방 나가기",
    description: "해당 채팅방에서 나갑니다.",
    apiPath: `/chat-rooms/${roomId}/exit`,
    method: "PATCH",
    redirectTo: "/chatting"
  };

  const cancelMatchingMenuData: KebabMenuDataType = {
    name: "매칭 취소",
    description: "매칭을 취소합니다.",
    apiPath: "/mission-matches/cancel",
    method: "PUT",
    requiredData: [{ name: "missionId", default: thisRoomData?.missionId }]
  };

  return (
    <>
      <Header
        left="back"
        right="info"
        rightNode={
          <KebabMenu
            menuList={[chattingRoomOutMenuData, cancelMatchingMenuData]}
          />
        }>
        {thisRoomData?.receiverNickname || "채팅방"}
      </Header>

      <Link
        href={`/mission/${thisRoomData?.id}`}
        className="fixed top-20 z-40 flex w-full max-w-screen-sm justify-center">
        <Container className="cs:flex cs:h-8 cs:w-11/12 cs:items-center cs:bg-primary-light">
          {thisRoomData?.title || "미션 제목"}
        </Container>
      </Link>

      {children}
    </>
  );
};

export default ChattingLayout;
