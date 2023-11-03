import React from "react";

import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";

type LayoutProps = {
  params: { slug: string };
  children: React.ReactNode;
};

const layout = ({ params, children }: LayoutProps) => {
  return (
    <>
      <Header>미션 상세</Header>
      {children}
      <Footer />
    </>
  );
};

export default layout;
