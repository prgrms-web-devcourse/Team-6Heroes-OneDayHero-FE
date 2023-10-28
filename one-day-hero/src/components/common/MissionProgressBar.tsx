import React from "react";

interface MissionProgressBarProps extends React.ComponentProps<"div"> {
  missionState: "matching" | "matched" | "done";
}

const MissionProgressBar = ({
  missionState,
  className = "",
  ...props
}: MissionProgressBarProps) => {
  const matchedState =
    missionState === "matched" || missionState === "done"
      ? "active"
      : "inactive";
  const doneState = missionState === "done" ? "active" : "inactive";

  const defaultStyle =
    "items-center flex-row-reverse py-2 text-sm rounded-b-[1.25rem]";

  const progressStyle = {
    active: "bg-primary border-primary-darken",
    inactive: "bg-inactive border-inactive-darken"
  };

  const textColor = {
    active: "",
    inactive: "text-inactive-darken"
  };

  return (
    <div className={`${className} relative`} {...props}>
      <div
        className={`${defaultStyle} ${progressStyle[doneState]} flex w-full`}>
        <p className={`${textColor[doneState]} w-1/3 text-center`}>미션완료</p>
      </div>
      <div
        className={`${defaultStyle} ${progressStyle[matchedState]} absolute top-0 left-0 flex border-r rounded-tr-[1.25rem] w-2/3`}>
        <p className={`${textColor[matchedState]} w-1/2 text-center`}>
          매칭완료
        </p>
      </div>
      <div
        className={`${defaultStyle} ${progressStyle["active"]} absolute top-0 left-0 flex border-r rounded-tr-[1.25rem] w-1/3`}>
        <p className="w-full text-center">매칭 중</p>
      </div>
    </div>
  );
};

export default MissionProgressBar;
