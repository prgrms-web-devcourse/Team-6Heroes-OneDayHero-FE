import React from "react";

import Footer from "@/components/common/Footer";
import HomeHeader from "@/components/domain/home/HomeHeader";
import MissionCreateButton from "@/components/domain/home/MissionCreateButton";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <HomeHeader />
      {children}
      <div className="fixed bottom-0 h-0 w-full max-w-screen-sm">
        <MissionCreateButton />
      </div>
      <Footer />
    </>
  );
};

export default layout;
