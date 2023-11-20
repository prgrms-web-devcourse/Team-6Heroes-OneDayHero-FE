import { PropsWithChildren } from "react";

import MissionInfo from "@/components/common/Info/MissionInfo";
import { MissionItemResponse } from "@/types/response";

import MissionListItem from "./MissionListItem";

interface MissionFullInfoProps extends React.ComponentProps<"div"> {
  bookmarkCount: number;
  createdAt: string;
  region: MissionItemResponse["region"];
  missionCategory: MissionItemResponse["missionCategory"];
  missionInfo: MissionItemResponse["missionInfo"];
  className?: string;
}

const MissionFullInfo = ({
  bookmarkCount,
  createdAt,
  region,
  missionCategory,
  missionInfo,
  className = "",
  ...props
}: PropsWithChildren<MissionFullInfoProps>) => {
  return (
    <div className={`${className}`} {...props}>
      <MissionListItem
        categories={missionCategory.name}
        createAt={createdAt}
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
