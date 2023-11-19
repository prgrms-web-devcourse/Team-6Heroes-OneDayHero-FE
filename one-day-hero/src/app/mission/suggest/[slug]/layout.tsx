import React from "react";

import Header from "@/components/common/Header";

const SuggestLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header>미션 목록</Header>
      {children}
    </>
  );
};

export default SuggestLayout;
