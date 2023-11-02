import { PropsWithChildren } from "react";

import MissionInfo from "@/components/common/Info/MissionInfo";
import MissionListItem from "@/components/common/Info/MissionListItem";

type MissionFullInfoProps = {
  data: MissionListType;
  className: string;
};

const MissionFullInfo = ({
  className = "",
  data,
  ...props
}: PropsWithChildren<MissionFullInfoProps>) => {
  return (
    <div className={`${className}`}>
      <MissionListItem />
      <MissionInfo
        className="cs:ml-1"
        missionBounty="10/19 월요일"
        missionDay="14:00 ~ 18:00"
        missionTime="일급 80000원"
      />
    </div>
  );
};

export default MissionFullInfo;
