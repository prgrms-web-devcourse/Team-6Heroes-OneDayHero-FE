import React from "react";

import Footer from "@/components/common/Footer";
import HomeHeader from "@/components/common/HomeHeader";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <HomeHeader>역삼동</HomeHeader>
      {children}
      <Footer />
    </>
  );
};

export default layout;
