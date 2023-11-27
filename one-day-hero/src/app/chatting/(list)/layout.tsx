import React from "react";

import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";

const ChattingListLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header>채팅 목록</Header>
      {children}
      <Footer />
    </>
  );
};

export default ChattingListLayout;
