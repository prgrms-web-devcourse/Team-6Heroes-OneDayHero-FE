import BottomNav from "@/components/common/BottomNav";
import MissionListItem from "@/components/common/MissionListItem";

import Button from "@/components/common/Button";
import DayList from "@/components/common/Day/DayList";
import Label from "@/components/common/Label";
import HeroScore from "@/components/common/HeroScore";

const HomePage = () => {
  return (
    <>
      <div>HomePage</div>
      <div className="w-96 p-5">
        <MissionListItem />
        <HeroScore score={20} />
      </div>
      <DayList />
      <Button />
      <Label size="lg" />
      <BottomNav />
    </>
  );
};

export default HomePage;
