import { PropsWithChildren } from "react";

import MissionInfo from "@/components/common/Info/MissionInfo";
import { MissionItemResponse } from "@/types/response";

import MissionListItem from "./MissionListItem";

interface MissionFullInfoProps extends React.ComponentProps<"div"> {
  region: MissionItemResponse["region"];
  missionCategory: MissionItemResponse["missionCategory"];
  missionInfo: MissionItemResponse["missionInfo"];
  missionImagePath: string;
  bookmarkCount?: number;
  isBookmarked?: boolean;
  missionId?: number;
  refreshPage?: () => Promise<void>;
  className?: string;
}

const MissionFullInfo = ({
  bookmarkCount,
  region,
  missionCategory,
  missionInfo,
  missionImagePath,
  isBookmarked,
  missionId,
  refreshPage,
  className = "",
  ...props
}: PropsWithChildren<MissionFullInfoProps>) => {
  return (
    <div className={`${className}`} {...props}>
      <MissionListItem
        categories={missionCategory.name}
        missionDate={missionInfo.missionDate}
        location={`${region.si} ${region.gu} ${region.dong}`}
        title={missionInfo.title}
        bookmarkCount={bookmarkCount}
        isBookmarked={isBookmarked}
        missionId={missionId}
        imageSrc={missionImagePath}
        refreshPage={refreshPage}
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
