import React from "react";

import FooterButton from "@/components/common/FooterButton";
import Header from "@/components/common/Header";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header>미션 목록</Header>
      {children}
      <FooterButton formId="suggest">미션 제안하기</FooterButton>
    </>
  );
};

export default layout;
