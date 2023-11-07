import React from "react";

import Header from "@/components/common/Header";
import Button from "@/components/common/Button";

const layout = ({ children }: { children: React.ReactNode }) => {
  const defaultStyle =
    "bg-background shadow-upper flex h-14 max-w-screen-sm w-full items-center justify-center fixed bottom-0";

  return (
    <>
      <Header>히어로</Header>
      {children}
      <div className={`${defaultStyle}`}>
        <Button className="cs:h-11" type="submit">
          미션 제안하기
        </Button>
      </div>
    </>
  );
};

export default layout;
