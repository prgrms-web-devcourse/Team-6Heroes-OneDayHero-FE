import React from "react";

import FooterButton from "@/components/common/FooterButton";
import Header from "@/components/common/Header";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header>히어로</Header>
      {children}
      <FooterButton>미션 제안하기</FooterButton>
    </>
  );
};

export default layout;
