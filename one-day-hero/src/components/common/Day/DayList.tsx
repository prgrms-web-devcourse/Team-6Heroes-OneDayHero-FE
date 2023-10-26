import DayButton from "./DayButton";

const DayList = () => {
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  return (
    <div className="flex gap-x-1.5">
      {days.map((day, index) => (
        <DayButton key={index}>{day}</DayButton>
      ))}
    </div>
  );
};

export default DayList;
