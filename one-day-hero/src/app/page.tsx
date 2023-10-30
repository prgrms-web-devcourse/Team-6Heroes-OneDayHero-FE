import BottomNav from "@/components/common/BottomNav";
import Button from "@/components/common/Button";
import DayList from "@/components/common/Day/DayList";
import Label from "@/components/common/Label";
import MissionInfo from "@/components/common/MissionInfo";
import MissionListItem from "@/components/common/MissionListItem";

const HomePage = () => {
  return (
    <>
      <div>HomePage</div>
      <div className="w-96 rounded-[20px] bg-white p-5">
        <MissionListItem />
        <MissionInfo
          missionDay="10/19 목요일"
          missionTime="14:00 ~ 18:00"
          missionBounty="일급 80,000"
        />
      </div>
      <DayList />
      <Button />
      <Label size="lg" />
      <BottomNav />
    </>
  );
};

export default HomePage;
