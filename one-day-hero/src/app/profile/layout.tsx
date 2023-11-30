import React from "react";

import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header right="edit">프로필</Header>
      {children}
      <Footer />
    </>
  );
};

export default layout;
