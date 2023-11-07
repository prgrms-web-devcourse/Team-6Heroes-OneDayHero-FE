import Container from "@/components/common/Container";
import MissionListItem from "@/components/common/Info/MissionListItem";
import MissionProgressBar from "@/components/common/MissionProgressBar";
import { getCompletedMission } from "@/services/missions";
import { MissionResponse } from "@/types/response";

const MissionRecordPage = async () => {
  const { data: missions } = await getCompletedMission();

  return (
    <div className="flex w-full flex-col items-center gap-3">
      {missions &&
        missions.map(
          ({
            data: { missionStatus, id, missionCategory, missionInfo, region }
          }: MissionResponse) =>
            missionStatus === "MISSION_COMPLETED" && (
              <Container key={id} className="cs:w-full cs:p-0">
                <MissionListItem
                  categories={missionCategory.name}
                  createAt={missionInfo.missionDate}
                  location={region.gu + " " + region.dong}
                  title={missionInfo.title}
                  className="cs:mb-0 cs:py-5"
                />
                <MissionProgressBar missionStatus="MISSION_COMPLETED" />
              </Container>
            )
        )}
    </div>
  );
};

export default MissionRecordPage;
