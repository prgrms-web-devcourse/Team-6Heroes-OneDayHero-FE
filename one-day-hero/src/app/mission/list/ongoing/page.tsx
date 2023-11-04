import MissionListItem from "@/components/common/Info/MissionListItem";
import MissionProgressContainer from "@/components/common/MissionProgressContainer";
import { getOngoingMissionList } from "@/services/missions";
import { Mission } from "@/types/type";

const OngoingMissionPage = async () => {
  const { data } = await getOngoingMissionList();

  return (
    <div className="mt-20 w-full max-w-screen-sm space-y-4">
      {data.map((item: Mission) => (
        <div
          className="flex w-full max-w-screen-sm justify-center"
          key={item.id}>
          <MissionProgressContainer missionStatus={item.missionStatus}>
            <MissionListItem
              className="cs:p-4"
              categories={item.missionCategory.name}
              createAt={item.missionInfo.missionDate}
              location={item.region.gu + " " + item.region.dong}
              title={item.missionInfo.title}
              bookmarkCount={item.bookmarkCount}
            />
          </MissionProgressContainer>
        </div>
      ))}
    </div>
  );
};

export default OngoingMissionPage;
