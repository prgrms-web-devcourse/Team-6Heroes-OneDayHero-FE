import Image from "next/image";
import { BiMap, BiStar } from "react-icons/bi";

import Label from "@/components/common/Label";
import test from "~/images/test.png";

import IconGroup from "./IconGroup";

type MissionListItemProps = {
  src?: string;
  title: string;
  categories: string;
  createAt: string;
  location: string;
  className: string;
};

const MissionListItem = ({
  src,
  title,
  categories,
  createAt,
  location,
  className
}: MissionListItemProps) => {
  return (
    <div className={`mb-5 flex ${className}`}>
      <div className="flex grow gap-4">
        <div className="bg-inactive overflow-hidden rounded-[10px]">
          <Image
            src={src || test}
            alt="프로필 사진"
            width={60}
            height={60}
            objectFit="cover"
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label size="sm" className="w-16">
            {categories}
          </Label>
          <span className="text-md font-semibold">{title}</span>
          <div className="flex gap-2">
            <span className="text-xs">{createAt}</span>
            <IconGroup title={location} direction="row" size="sm">
              <BiMap />
            </IconGroup>
          </div>
        </div>
      </div>
      <div className="flex items-start">
        <IconGroup
          title="5"
          direction="row"
          size="lg"
          textSize="base"
          className="text-neutral-400 ">
          <BiStar />
        </IconGroup>
      </div>
    </div>
  );
};

export default MissionListItem;
