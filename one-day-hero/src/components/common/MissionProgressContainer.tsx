import Container from "./Container";
import MissionProgressBar from "./MissionProgressBar";

const MissionProgressContainer = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <Container className="cs:w-10/12 px-0 pb-0">
      {children}
      <MissionProgressBar missionState="matched" />
    </Container>
  );
};

export default MissionProgressContainer;
