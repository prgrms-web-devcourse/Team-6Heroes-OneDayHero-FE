import React from "react";

import { getServerToken, getServerUserId } from "@/app/utils/auth";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import KebabMenu from "@/components/common/KebabMenu";
import { useGetMissionFetch } from "@/services/missions";
import { KebabMenuDataType } from "@/types";

type MissionDetailLayoutProps = {
  params: { slug: string };
  children: React.ReactNode;
};

const MissionDetailLayout = async ({
  params,
  children
}: MissionDetailLayoutProps) => {
  const missionId = params.slug;
  const token = getServerToken() ?? "";

  const missionDeleteMenuData: KebabMenuDataType = {
    name: "미션 삭제",
    description: "해당 미션을 삭제합니다",
    apiPath: `/missions/${missionId}`,
    method: "DELETE",
    redirectTo: "/mission/list/ongoing"
  };

  const { isError, response } = await useGetMissionFetch(missionId, token);

  const userId = parseInt(getServerUserId() ?? "-1");
  const isOwner = userId === response?.data.citizenId;

  return (
    <>
      <Header
        right={isOwner ? "info" : "none"}
        rightNode={<KebabMenu menuList={[missionDeleteMenuData]} />}>
        미션 상세
      </Header>
      {children}
      <Footer />
    </>
  );
};

export default MissionDetailLayout;
