import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Tabs from "@/components/common/Tabs";

const MissionSearchLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header left="back">검색</Header>
      <div className="fixed top-16 z-50 h-[11rem] w-full max-w-screen-sm bg-background" />
      <div
        className="fixed
z-50 flex w-full max-w-screen-sm justify-center">
        <Tabs
          leftRoute={{ name: "미션", path: "/search/mission" }}
          rightRoute={{ name: "히어로", path: "/search/hero" }}
        />
      </div>
      {children}
      <Footer />
    </>
  );
};

export default MissionSearchLayout;
