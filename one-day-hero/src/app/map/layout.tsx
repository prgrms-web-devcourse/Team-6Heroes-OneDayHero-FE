import Header from "@/components/common/Header";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header>지도</Header>
      {children}
    </>
  );
};

export default layout;
