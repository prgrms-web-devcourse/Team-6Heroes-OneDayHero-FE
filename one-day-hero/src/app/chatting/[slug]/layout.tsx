import React from "react";

import Container from "@/components/common/Container";
import Header from "@/components/common/Header";
import MissionListItem from "@/components/common/Info/MissionListItem";
import KebabMenu from "@/components/common/KebabMenu";
import ChattingInputFooter from "@/components/domain/chatting/ChattingInputFooter";
import MissionProgressButtonBar from "@/components/domain/chatting/MissionProgressButtonBar";
import { KebabMenuDataType } from "@/types";

type LayoutProps = {
  params: { slug: string };
  children: React.ReactNode;
};

const layout = ({ params, children }: LayoutProps) => {
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

  /**@note 데이터 구조가 정해지면 해당 로직 생성하겠습니다.*/
  const isCitizen = false;

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
        <Container className="cs:h-8 cs:w-11/12 cs:flex cs:items-center cs:bg-primary-light">
          제목이 들어갈 자리입니다.
        </Container>
      </div>

      <div className="fixed top-[7.5rem] z-40 flex w-full max-w-screen-sm justify-center">
        <Container className="cs:w-11/12 cs:flex cs:items-center">
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

      {children}

      <ChattingInputFooter />
    </>
  );
};

export default layout;
