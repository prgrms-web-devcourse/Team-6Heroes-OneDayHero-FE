import React from "react";

import FooterButton from "@/components/common/FooterButton";
import Header from "@/components/common/Header";

const HeroProfileLayout = ({
  children,
  params
}: {
  children: React.ReactNode;
  params: { slug: string };
}) => {
  return (
    <>
      <Header>히어로</Header>
      {children}
      <FooterButton href={`/mission/suggest?heroId=${params.slug}`}>
        미션 제안하기
      </FooterButton>
    </>
  );
};

export default HeroProfileLayout;
