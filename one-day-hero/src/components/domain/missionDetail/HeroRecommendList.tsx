import Container from "@/components/common/Container";
import HorizontalScroll from "@/components/common/HorizontalScroll";
import Image from "next/image";
import DefaultThumbnail from "/public/images/OneDayHero_logo_sm.svg";
import { BiSolidHeart } from "react-icons/bi";

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
      <ul className="flex gap-1">
        {heroDataList.map(({ thumbnail, nickname, heroScore }) => (
          <Container className="flex flex-col shrink-0 w-24 items-center relative select-none">
            <Image
              src={thumbnail || DefaultThumbnail}
              alt="썸네일"
              width={68}
              className="rounded-full pointer-events-none"
            />
            <h3 className="text-base font-semibold">{nickname}</h3>
            <p className="text-sm text-sub">{heroScore}점</p>
            <BiSolidHeart className="fill-yellow-300 absolute top-3 left-3" />
          </Container>
        ))}
      </ul>
    </HorizontalScroll>
  );
};

export default HeroRecommendList;
