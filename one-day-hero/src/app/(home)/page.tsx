import Button from "@/components/common/Button";
import DayList from "@/components/common/DayList";
import HeroScore from "@/components/common/HeroScore";
import Label from "@/components/common/Label";
import MissionInfo from "@/components/common/MissionInfo";
import MissionListItem from "@/components/common/MissionListItem";
import MissionProgressBar from "@/components/common/MissionProgressBar";

const HomePage = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="w-full rounded-[20px] bg-white p-5">
        <MissionListItem />
        <MissionInfo
          missionDay="10/19 목요일"
          missionTime="14:00 ~ 18:00"
          missionBounty="일급 80,000"
        />
        <HeroScore score={20} />
        <HeroScore size="sm" score={50} />
        <MissionProgressBar missionState="matched" />
      </div>
      <div className="w-full rounded-[20px] bg-white p-5">
        <MissionListItem />
        <MissionInfo
          missionDay="10/19 목요일"
          missionTime="14:00 ~ 18:00"
          missionBounty="일급 80,000"
        />
        <HeroScore score={20} />
        <HeroScore size="sm" score={50} />
        <MissionProgressBar missionState="matched" />
      </div>
      <div className="w-full rounded-[20px] bg-white p-5">
        <MissionListItem />
        <MissionInfo
          missionDay="10/19 목요일"
          missionTime="14:00 ~ 18:00"
          missionBounty="일급 80,000"
        />
        <HeroScore score={20} />
        <HeroScore size="sm" score={50} />
        <MissionProgressBar missionState="matched" />
      </div>
      <DayList />
      <Button />
      <Label size="lg" />
    </div>
  );
};

export default HomePage;
