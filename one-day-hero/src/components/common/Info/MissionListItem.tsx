import Image from "next/image";
import { BiMap, BiStar } from "react-icons/bi";

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
        <div className="h-[3.75rem] shrink-0 overflow-hidden rounded-[0.625rem] bg-inactive">
          <Image
            src={imageSrc || defaultProfileImage}
            alt="프로필 사진"
            width={60}
            height={60}
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label size="sm" className="w-[5.05rem]">
            {categories}
          </Label>
          <span className="text-md font-semibold">{title}</span>
          <div className="flex gap-2">
            <span className="text-xs">{missionDate}</span>
            <IconGroup title={location} direction="row" size="sm">
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
