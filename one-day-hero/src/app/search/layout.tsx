import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Tabs from "@/components/common/Tabs";

const SearchLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header left="back">검색</Header>
      <div className="bg-background fixed top-16 z-50 h-[15.2rem] w-full max-w-screen-sm" />
      <div
        className="fixed
z-50 flex w-full max-w-screen-sm justify-center">
        <Tabs leftText="미션" rightText="히어로" />
      </div>
      {children}
      <Footer />
    </>
  );
};

export default SearchLayout;
