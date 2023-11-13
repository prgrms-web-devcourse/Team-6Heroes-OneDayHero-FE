import Header from "@/components/common/Header";

const UserInfoLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header left="back">프로필 작성</Header>
      {children}
    </>
  );
};

export default UserInfoLayout;
