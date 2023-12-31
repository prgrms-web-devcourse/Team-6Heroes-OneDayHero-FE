import { PropsWithChildren } from "react";

import Container from "./Container";
import MissionProgressBar from "./MissionProgressBar";

type MissionProgressContainer = {
  missionStatus:
    | "MATCHING"
    | "MATCHING_COMPLETED"
    | "MISSION_COMPLETED"
    | "EXPIRED";
};

const MissionProgressContainer = ({
  children,
  missionStatus,
  ...props
}: PropsWithChildren<MissionProgressContainer>) => {
  return (
    <Container className="cs:w-full cs:p-0">
      {children}
      <MissionProgressBar missionStatus={missionStatus} {...props} />
    </Container>
  );
};

export default MissionProgressContainer;
