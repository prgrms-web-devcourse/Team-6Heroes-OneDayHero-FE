import MissionProgressContainer from "@/components/common/MissionProgressContainer";

import MissionListItem from "../../../../components/common/MissionListItem";

const OngoingMissionPage = () => {
  return (
    <div className="mt-20 flex w-full max-w-screen-sm flex-col items-center justify-center space-y-4">
      <MissionProgressContainer>
        <MissionListItem className="cs: p-4" />
      </MissionProgressContainer>
      <MissionProgressContainer>
        <MissionListItem className="cs: p-4" />
      </MissionProgressContainer>
      <MissionProgressContainer>
        <MissionListItem className="cs: p-4" />
      </MissionProgressContainer>
      <MissionProgressContainer>
        <MissionListItem className="cs: p-4" />
      </MissionProgressContainer>
      <MissionProgressContainer>
        <MissionListItem className="cs: p-4" />
      </MissionProgressContainer>
      <MissionProgressContainer>
        <MissionListItem className="cs: p-4" />
      </MissionProgressContainer>
      <MissionProgressContainer>
        <MissionListItem className="cs: p-4" />
      </MissionProgressContainer>
      <MissionProgressContainer>
        <MissionListItem className="cs: p-4" />
      </MissionProgressContainer>
    </div>
  );
};

export default OngoingMissionPage;
