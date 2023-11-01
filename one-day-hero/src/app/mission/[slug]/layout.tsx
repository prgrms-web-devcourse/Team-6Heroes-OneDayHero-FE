import React from "react";

import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";

interface LayoutProp {
  params: { slug: string };
  children: React.ReactNode;
}

const layout = ({ params, children }: LayoutProp) => {
  return (
    <>
      <Header>미션 상세</Header>
      {children}
      <Footer />
    </>
  );
};

export default layout;
