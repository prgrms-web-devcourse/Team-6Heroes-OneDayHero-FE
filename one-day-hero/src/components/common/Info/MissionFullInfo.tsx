import { PropsWithChildren } from "react";

import MissionInfo from "@/components/common/Info/MissionInfo";
import { MissionResponse } from "@/types/response";

import MissionListItem from "./MissionListItem";

type MissionFullInfoProps = {
  data: MissionResponse["data"];
  className?: string;
};

const MissionFullInfo = ({
  className = "",
  data: { missionCategory, missionInfo, region, bookmarkCount },
  ...props
}: PropsWithChildren<MissionFullInfoProps>) => {
  return (
    <div className={`${className}`} {...props}>
      <MissionListItem
        categories={missionCategory.name}
        createAt={missionInfo.missionDate}
        location={region.gu + " " + region.dong}
        title={missionInfo.title}
        bookmarkCount={bookmarkCount}
        className="p-2"
      />
      <MissionInfo
        className="cs:my-4 cs:ml-2 cs:text-sm"
        missionTime={missionInfo.startTime + "~" + missionInfo.endTime}
        missionDay={missionInfo.missionDate}
        missionBounty={missionInfo.price}
      />
    </div>
  );
};

export default MissionFullInfo;
