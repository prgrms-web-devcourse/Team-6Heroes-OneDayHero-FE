import Header from "@/components/common/Header";

const SurveyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header left="back">프로필 작성</Header>
      {children}
    </>
  );
};

export default SurveyLayout;
