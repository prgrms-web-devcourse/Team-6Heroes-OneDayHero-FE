import Image from "next/image";
import Smile from "~/smiling-face.png";
import Label from "@/components/common/Label";
import { BiMap, BiStar } from "react-icons/bi";
import IconGroup from "./IconGroup";

const MissionListItem = () => {
  return (
    <div className="mb-5 flex">
      <div className="flex grow gap-4">
        <div>
          <Image src={Smile} alt="프로필 사진" width={60} height={60} />
        </div>
        <div className="flex flex-col gap-1">
          <Label size="sm" className="w-16">
            서빙
          </Label>
          <span className="text-md font-semibold">미션 타이틀</span>
          <div className="flex gap-2">
            <span className="text-xs">2023-10-19</span>
            <IconGroup title="강남구 역삼동" direction="row" size="sm">
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
