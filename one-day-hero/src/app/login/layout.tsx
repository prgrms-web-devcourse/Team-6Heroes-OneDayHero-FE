import Header from "@/components/common/Header";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header>로그인</Header>
      {children};
    </>
  );
};

export default layout;
