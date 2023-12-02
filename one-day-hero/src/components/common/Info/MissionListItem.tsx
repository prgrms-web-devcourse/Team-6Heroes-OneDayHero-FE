import Image from "next/image";
import { BiMap } from "react-icons/bi";

import Label from "@/components/common/Label";
import defaultProfileImage from "~/images/OneDayHero_logo_sm.svg";

import BookmarkButton from "../BookmarkButton";
import IconGroup from "../IconGroup";

type MissionListItemProps = {
  imageSrc?: string;
  title: string;
  categories: string;
  missionDate: string;
  location: string;
  bookmarkCount?: number;
  isBookmarked?: boolean;
  className?: string;
  missionId?: number;
  refreshPage?: () => Promise<void>;
};

const MissionListItem = ({
  imageSrc,
  title,
  categories,
  missionDate,
  location,
  bookmarkCount,
  isBookmarked,
  missionId,
  refreshPage,
  className
}: MissionListItemProps) => {
  return (
    <div className={`flex w-full ${className}`}>
      <div className="flex grow gap-4">
        <div className="bg-inactive relative h-[5.3rem] w-[5.3rem] shrink-0 overflow-hidden rounded-[0.625rem]">
          <Image src={imageSrc || defaultProfileImage} alt="프로필 사진" fill />
        </div>
        <div className="flex flex-col gap-1">
          <Label size="sm" className="w-[5.05rem]">
            {categories}
          </Label>
          <span className="text-md w-[9rem] truncate font-semibold">
            {title}
          </span>

          <div className="flex flex-col gap-2">
            <span className="text-xs">미션 날짜 / {missionDate}</span>
            <IconGroup
              title={location}
              direction="row"
              size="sm"
              className="cs:justify-start">
              <BiMap />
            </IconGroup>
          </div>
        </div>
      </div>
      <div className="flex items-start">
        {missionId && (
          <BookmarkButton
            size="sm"
            isBookmarked={isBookmarked ?? false}
            bookmarkCount={bookmarkCount ?? 0}
            missionId={missionId}
            refreshPage={refreshPage}
          />
        )}
      </div>
    </div>
  );
};

export default MissionListItem;
