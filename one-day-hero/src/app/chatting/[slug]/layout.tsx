import React from "react";

import Container from "@/components/common/Container";
import Header from "@/components/common/Header";
import KebabMenu from "@/components/common/KebabMenu";
import { KebabMenuDataType } from "@/types";

type LayoutProps = {
  params: { slug: string };
  children: React.ReactNode;
};

const ChattingLayout = ({ params, children }: LayoutProps) => {
  const chattingRoomOutMenuData: KebabMenuDataType = {
    name: "채팅방 나가기",
    description: "해당 채팅방에서 나갑니다.",
    apiPath: "/chatting/123",
    requiredData: [{ name: "missionId", default: params.slug }],
    redirectTo: "/mission/list/ongoing"
  };

  const cancelMatchingMenuData: KebabMenuDataType = {
    name: "매칭 취소",
    description: "매칭을 취소합니다.",
    apiPath: "/chatting/123",
    requiredData: [{ name: "missionId", default: params.slug }]
  };

  const reportMenuData: KebabMenuDataType = {
    name: "신고하기",
    description: "상대방을 신고합니다.",
    apiPath: "/chatting/123",
    requiredData: [{ name: "missionId", default: params.slug }]
  };

  return (
    <>
      <Header
        left="back"
        right="info"
        rightNode={
          <KebabMenu
            menuList={[
              chattingRoomOutMenuData,
              cancelMatchingMenuData,
              reportMenuData
            ]}
          />
        }>
        슈퍼 히어로 토끼
      </Header>

      <div className="fixed top-20 z-40 flex w-full max-w-screen-sm justify-center">
        <Container className="cs:flex cs:h-8 cs:w-11/12 cs:items-center cs:bg-primary-light">
          제목이 들어갈 자리입니다.
        </Container>
      </div>

      {children}
    </>
  );
};

export default ChattingLayout;
