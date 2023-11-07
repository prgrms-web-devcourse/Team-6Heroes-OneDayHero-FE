import { BiCalendarWeek, BiDollarCircle, BiTime } from "react-icons/bi";

import IconGroup from "../IconGroup";

type MissionInfoProps = {
  missionDay: string;
  missionTime: string;
  missionBounty: number;
  className?: string;
};

const MissionInfo = ({
  missionDay,
  missionTime,
  missionBounty,
  className = ""
}: MissionInfoProps) => {
  return (
    <div
      className={`${className} ml-4 flex w-full flex-col items-start justify-center gap-2 font-semibold`}>
      <IconGroup title={missionDay} direction="row">
        <BiCalendarWeek />
      </IconGroup>
      <IconGroup title={missionTime} direction="row">
        <BiTime />
      </IconGroup>
      <IconGroup title={missionBounty + "원"} direction="row">
        <BiDollarCircle />
      </IconGroup>
    </div>
  );
};

export default MissionInfo;
