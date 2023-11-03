import Container from "@/components/common/Container";
import MissionFullInfo from "@/components/common/Info/MissionFullInfo";

const SuggestedMissionPage = () => {
  return (
    <div className="mt-20 flex w-full max-w-screen-sm flex-col items-center justify-center space-y-4">
      <Container>
        <MissionFullInfo />
      </Container>
      <Container>
        <MissionFullInfo />
      </Container>
      <Container>
        <MissionFullInfo />
      </Container>
      <Container>
        <MissionFullInfo />
      </Container>
      <Container>
        <MissionFullInfo />
      </Container>
      <Container>
        <MissionFullInfo />
      </Container>
    </div>
  );
};

export default SuggestedMissionPage;
