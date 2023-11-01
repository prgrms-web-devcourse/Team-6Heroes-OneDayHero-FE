import React from "react";

import Footer from "@/components/common/Footer";
import HomeHeader from "@/components/common/HomeHeader";

import MissionCreateButton from "./components/MissionCreateButton";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <HomeHeader>역삼동</HomeHeader>
      {children}
      <div className="fixed bottom-0 h-0 w-full max-w-screen-sm">
        <MissionCreateButton />
      </div>
      <Footer />
    </>
  );
};

export default layout;
