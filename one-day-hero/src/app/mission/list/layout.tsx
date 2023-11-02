import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Tabs from "@/components/common/Tabs";

const MissionListLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header left="back">미션 목록</Header>
      <div className="bg-background fixed top-16 z-50 h-28 w-full max-w-screen-sm" />
      <div
        className="fixed
z-50 flex w-full max-w-screen-sm justify-center">
        <Tabs leftText="진행중인 미션" rightText="제안받은 미션" />
      </div>
      {children}
      <Footer />
    </>
  );
};

export default MissionListLayout;
