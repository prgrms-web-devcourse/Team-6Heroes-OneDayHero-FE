import Container from "@/components/common/Container";
import MissionListItem from "@/components/common/Info/MissionListItem";
import MissionProgressBar from "@/components/common/MissionProgressBar";
import { getCompletedMission } from "@/services/missions";

export type MissionResponse = {
  id: number;
  missionCategory: {
    id: number;
    code: string;
    name: string;
  };
  citizenId: number;
  region: {
    id: number;
    si: string;
    gu: string;
    dong: string;
  };
  location: {
    x: number;
    y: number;
  };
  missionInfo: {
    title: string;
    content: string;
    missionDate: string;
    startTime: string;
    endTime: string;
    deadlineTime: string;
    price: number;
  };
  bookmarkCount: number;
  missionStatus:
    | "MATCHING"
    | "MATCHING_COMPLETED"
    | "MISSION_COMPLETED"
    | "EXPIRED";
  missionImage: {
    originalName: string;
    path: string;
  };
};

const MissionRecordPage = async () => {
  const { data: missions } = await getCompletedMission();

  return (
    <div className="flex w-10/12 flex-col gap-3">
      {missions &&
        missions.map(
          (mission: MissionResponse) =>
            mission.missionStatus === "MISSION_COMPLETED" && (
              <Container key={mission.id} className="cs:w-full cs:p-0">
                <MissionListItem
                  categories={mission.missionCategory.name}
                  createAt={mission.missionInfo.missionDate}
                  location={mission.region.gu + " " + mission.region.dong}
                  title={mission.missionInfo.title}
                  className="cs:py-5 cs:mb-0"
                />
                <MissionProgressBar missionState="done" />
              </Container>
            )
        )}
    </div>
  );
};

export default MissionRecordPage;
