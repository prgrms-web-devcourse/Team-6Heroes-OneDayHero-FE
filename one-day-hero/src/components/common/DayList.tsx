import ToggleButton from "./ToggleButton";

const DayList = () => {
  const days = ["월", "화", "수", "목", "금", "토", "일"];

  return (
    <div className="flex gap-x-1.5">
      {days.map((day, index) => (
        <ToggleButton key={index}>{day}</ToggleButton>
      ))}
    </div>
  );
};

export default DayList;
