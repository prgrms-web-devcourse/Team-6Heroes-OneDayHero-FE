import React from "react";

import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import KebabMenu from "@/components/common/KebabMenu";
import { KebabMenuDataType } from "@/types";

type LayoutProps = {
  params: { slug: string };
  children: React.ReactNode;
};

const layout = ({ params, children }: LayoutProps) => {
  const missionId = params.slug;

  const missionDeleteMenuData: KebabMenuDataType = {
    name: "미션 삭제",
    description: "해당 미션을 삭제합니다",
    apiPath: `/missions/${missionId}`,
    method: "DELETE",
    redirectTo: "/mission/list/ongoing"
  };

  return (
    <>
      <Header
        right="info"
        rightNode={<KebabMenu menuList={[missionDeleteMenuData]} />}>
        미션 상세
      </Header>
      {children}
      <Footer />
    </>
  );
};

export default layout;
