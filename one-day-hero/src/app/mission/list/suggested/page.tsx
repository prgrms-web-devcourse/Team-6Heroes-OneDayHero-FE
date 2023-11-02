import Container from "@/components/common/Container";
import MissionFullInfo from "@/components/common/Info/MissionFullInfo";

const SuggestedMissionPage = () => {
  return (
    <div className="mt-20 flex w-full max-w-screen-sm flex-col items-center justify-center space-y-4">
      <Container className="cs:p-4 cs:w-11/12">
        <MissionFullInfo />
      </Container>
      <Container className="cs:p-4 cs:w-11/12">
        <MissionFullInfo />
      </Container>
      <Container className="cs:p-4 cs:w-11/12">
        <MissionFullInfo />
      </Container>
      <Container className="cs:p-4 cs:w-11/12">
        <MissionFullInfo />
      </Container>
      <Container className="cs:p-4 cs:w-11/12">
        <MissionFullInfo />
      </Container>
      <Container className="cs:p-4 cs:w-11/12">
        <MissionFullInfo />
      </Container>
    </div>
  );
};

export default SuggestedMissionPage;
