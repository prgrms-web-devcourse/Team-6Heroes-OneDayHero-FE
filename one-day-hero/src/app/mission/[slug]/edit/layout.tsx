import FooterButton from "@/components/common/FooterButton";
import Header from "@/components/common/Header";

const MissionEditLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header>미션 수정</Header>
      {children}
      <FooterButton formId="missionEditForm">수정하기</FooterButton>
    </>
  );
};

export default MissionEditLayout;
