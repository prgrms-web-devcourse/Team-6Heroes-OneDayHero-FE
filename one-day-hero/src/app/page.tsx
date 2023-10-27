import BottomNav from "@/components/common/BottomNav";
import Button from "@/components/common/Button";
import DayList from "@/components/common/Day/DayList";
import Label from "@/components/common/Label";

const HomePage = () => {
  return (
    <>
      <div>HomePage</div>
      <DayList />
      <Button />
      <Label size="lg" />
      <BottomNav />
    </>
  );
};

export default HomePage;
