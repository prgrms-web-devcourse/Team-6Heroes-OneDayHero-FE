import MissionSearchFilter from "@/components/domain/search/MissionSearchFilter";

const MissionSearchPage = () => {
  return (
    <>
      <div
        className="fixed z-50 mt-[4.5rem] 
w-full max-w-screen-sm">
        <MissionSearchFilter />
      </div>
      <div className="mt-60 w-full max-w-screen-sm">
        <div>
          <div className="h-60 w-80 bg-emerald-200">임시</div>
          <div className="h-60 w-80 bg-emerald-200">임시</div>
          <div className="h-60 w-80 bg-emerald-200">임시</div>
          <div className="h-60 w-80 bg-emerald-200">임시</div>
        </div>
      </div>
    </>
  );
};

export default MissionSearchPage;
