import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import DayList from "@/components/common/DayList";
import HeroScore from "@/components/common/HeroScore";
import Label from "@/components/common/Label";
import MissionInfo from "@/components/common/MissionInfo";
import MissionListItem from "@/components/common/MissionListItem";
import MissionProgressBar from "@/components/common/MissionProgressBar";

const HomePage = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Container>
        <MissionListItem />
        <MissionInfo
          missionDay="10/19 목요일"
          missionTime="14:00 ~ 18:00"
          missionBounty="일급 80,000"
        />
        <HeroScore score={20} />
        <HeroScore size="sm" score={50} />
        <MissionProgressBar missionState="matched" />
      </Container>
      <Container>
        <Button />
        <Label size="lg" />
      </Container>
      <DayList />
    </div>
  );
};

export default HomePage;
