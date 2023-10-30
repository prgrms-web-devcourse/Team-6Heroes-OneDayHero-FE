import BottomNav from "@/components/common/BottomNav";
import Button from "@/components/common/Button";
<<<<<<< HEAD
import DayList from "@/components/common/Day/DayList";
import HomeHeader from "@/components/common/HomeHeader";
import Label from "@/components/common/Label";
=======
import DayList from "@/components/common/DayList";
import Label from "@/components/common/Label";
import HeroScore from "@/components/common/HeroScore";
import MissionInfo from "@/components/common/MissionInfo";
>>>>>>> develop
import MissionListItem from "@/components/common/MissionListItem";

const HomePage = () => {
  return (
    <>
      <HomeHeader>동교동</HomeHeader>
      <div>HomePage</div>
      <div className="w-96 rounded-[20px] bg-white p-5">
        <MissionListItem />
        <HeroScore score={20} />
        <HeroScore size="sm" score={50} />
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
