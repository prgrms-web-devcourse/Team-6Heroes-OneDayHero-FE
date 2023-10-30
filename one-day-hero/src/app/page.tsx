import Button from "@/components/common/Button";
import DayList from "@/components/common/DayList";
import Footer from "@/components/common/Footer";
import HeroScore from "@/components/common/HeroScore";
import Label from "@/components/common/Label";
import MissionInfo from "@/components/common/MissionInfo";
import MissionListItem from "@/components/common/MissionListItem";
import MissionProgressBar from "@/components/common/MissionProgressBar";

const HomePage = () => {
  return (
    <>
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
        <MissionProgressBar missionState="matched" />
      </div>
      <DayList />
      <Button />
      <Label size="lg" />
      <Footer />
    </>
  );
};

export default HomePage;
