import BottomNav from "@/components/common/BottomNav";
import MissionListItem from "@/components/common/MissionListItem";

const HomePage = () => {
  return (
    <>
      <div>HomePage</div>
      <div className="w-96 p-5">
        <MissionListItem />
      </div>
      <BottomNav />
    </>
  );
};

export default HomePage;
