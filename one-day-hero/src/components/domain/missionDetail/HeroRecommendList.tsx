import Image from "next/image";
import { BiSolidHeart } from "react-icons/bi";

import DefaultThumbnail from "/public/images/OneDayHero_logo_sm.svg";
import Container from "@/components/common/Container";
import HorizontalScroll from "@/components/common/HorizontalScroll";

// 임시 지정
type HeroData = {
  thumbnail?: string;
  nickname: string;
  heroScore: number;
};

interface HeroRecommendListProps extends React.ComponentProps<"div"> {
  heroDataList: HeroData[];
}

const HeroRecommendList = ({
  heroDataList,
  className
}: HeroRecommendListProps) => {
  return (
    <HorizontalScroll className={className}>
      <ul className="flex">
        {heroDataList.map(({ thumbnail, nickname, heroScore }) => (
          <Container
            className="cs:m-1 cs:shadow relative flex w-24 shrink-0 select-none flex-col items-center"
            key={nickname}>
            {/** @note TODO: key를 unique한 걸로 수정해야함 */}
            <Image
              src={thumbnail || DefaultThumbnail}
              alt="썸네일"
              width={68}
              className="pointer-events-none rounded-full"
            />
            <h3 className="text-base font-semibold">{nickname}</h3>
            <p className="text-sub text-sm">{heroScore}점</p>
            <BiSolidHeart className="absolute left-3 top-3 fill-yellow-300" />
          </Container>
        ))}
      </ul>
    </HorizontalScroll>
  );
};

export default HeroRecommendList;
