interface MissionProgressButtonBarProps extends React.ComponentProps<"div"> {
  missionStatus:
    | "MATCHING"
    | "MATCHING_COMPLETED"
    | "MISSION_COMPLETED"
    | "EXPIRED";
}

const MissionProgressButtonBar = ({
  missionStatus,
  className = "",
  ...props
}: MissionProgressButtonBarProps) => {
  const matchedState =
    missionStatus === "MATCHING_COMPLETED" ||
    missionStatus === "MISSION_COMPLETED"
      ? "active"
      : "inactive";

  const doneState =
    missionStatus === "MISSION_COMPLETED" ? "active" : "inactive";

  const defaultStyle = "flex w-full items-center justify-center";

  const buttonDefaultStyle = "shadow-moreDown h-14 w-14 rounded-full text-sm";

  const progressStyle = {
    active: "bg-primary hover:bg-primary-darken",
    inactive: "bg-inactive hover:bg-primary-darken"
  };

  return (
    <>
      <div className={`${defaultStyle} ${className}`} {...props}>
        <button className={` ${progressStyle["active"]} ${buttonDefaultStyle}`}>
          매칭중
        </button>
        <span className="h-0 w-2/12 border border-black " />
        <button
          className={`${progressStyle[matchedState]} ${buttonDefaultStyle}`}>
          매칭완료
        </button>
        <span className="h-0 w-2/12 border border-black " />
        <button className={`${progressStyle[doneState]} ${buttonDefaultStyle}`}>
          미션완료
        </button>
      </div>
    </>
  );
};

export default MissionProgressButtonBar;
