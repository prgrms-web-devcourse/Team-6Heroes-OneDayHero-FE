import { PropsWithChildren } from "react";

import MissionInfo from "@/components/common/Info/MissionInfo";
import { Mission } from "@/types/type";

import MissionListItem from "./MissionListItem";

type MissionFullInfoProps = {
  data: Mission;
  className?: string;
};

const MissionFullInfo = ({
  className = "",
  data,
  ...props
}: PropsWithChildren<MissionFullInfoProps>) => {
  return (
    <div className={`${className}`} {...props}>
      <MissionListItem
        categories={data.missionCategory.name}
        createAt={data.missionInfo.missionDate}
        location={data.region.gu + " " + data.region.dong}
        title={data.missionInfo.title}
        bookmarkCount={data.bookmarkCount}
      />
      <MissionInfo
        className="cs:ml-2 cs:my-4"
        missionBounty="10/19 월요일"
        missionDay="14:00 ~ 18:00"
        missionTime="일급 80000원"
      />
    </div>
  );
};

export default MissionFullInfo;
