import MissionInfo from "@/components/common/Info/MissionInfo";
import MissionListItem from "@/components/common/Info/MissionListItem";

const MissionFullInfo = () => {
  return (
    <div>
      <MissionInfo missionBounty="" missionDay="" missionTime="" />
      <MissionListItem />
    </div>
  );
};

export default MissionFullInfo;
