import BottomNav from "@/components/common/BottomNav";
import Button from "@/components/common/Button";
import DayList from "@/components/common/Day/DayList";
import HomeHeader from "@/components/common/HomeHeader";
import Label from "@/components/common/Label";
import MissionListItem from "@/components/common/MissionListItem";

const HomePage = () => {
  return (
    <>
      <HomeHeader>동교동</HomeHeader>
      <div>HomePage</div>
      <div className="w-96 p-5">
        <MissionListItem />
      </div>
      <DayList />
      <Button />
      <Label size="lg" />
      <BottomNav />
    </>
  );
};

export default HomePage;
