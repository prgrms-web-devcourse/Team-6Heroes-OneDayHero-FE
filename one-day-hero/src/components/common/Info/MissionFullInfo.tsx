import { PropsWithChildren } from "react";

import MissionInfo from "@/components/common/Info/MissionInfo";

import MissionListItem from "./MissionListItem";

type MissionFullInfoProps = {
  // data: MissionListType;
  className?: string;
};

const MissionFullInfo = ({
  className = "",
  // data,
  ...props
}: PropsWithChildren<MissionFullInfoProps>) => {
  return (
    <div className={`${className}`} {...props}>
      <MissionListItem
        categories="서빙"
        createAt="2023-10-19"
        location="강남구 역삼동"
        title="미션 타이틀"
      />
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
