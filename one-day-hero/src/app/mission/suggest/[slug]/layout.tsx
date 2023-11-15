import React from "react";

import Header from "@/components/common/Header";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header>미션 목록</Header>
      {children}
    </>
  );
};

export default layout;
