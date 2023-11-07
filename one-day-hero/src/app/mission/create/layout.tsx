import React from "react";

import FooterButton from "@/components/common/FooterButton";
import Header from "@/components/common/Header";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header>미션 생성</Header>
      {children}
      <FooterButton formId="missionCreateForm">생성하기</FooterButton>
    </>
  );
};

export default layout;
