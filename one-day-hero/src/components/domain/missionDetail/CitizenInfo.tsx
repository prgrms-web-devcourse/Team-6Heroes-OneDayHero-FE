import Image from "next/image";
import { BiChevronRight } from "react-icons/bi";

import DefaultThumbnail from "/public/images/OneDayHero_logo_sm.svg";
import Container from "@/components/common/Container";
import HeroScore from "@/components/common/HeroScore";
import { getUser } from "@/services/users";

interface CitizenInfoProps extends React.ComponentProps<"div"> {
  citizenId: number;
}

const CitizenInfo = async ({ citizenId, className }: CitizenInfoProps) => {
  const {
    data: { basicInfo }
  } = await getUser(citizenId);

  return (
    <Container className={`cs:w-full ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">시민 정보</h2>
        <BiChevronRight size="20" />
      </div>
      <div className="mt-2 flex pr-2">
        <Image
          src={DefaultThumbnail}
          alt="썸네일"
          width={60}
          className="pointer-events-none mr-2 rounded-full"
        />
        <div className="grow">
          <h3 className="text-base font-semibold">{basicInfo.nickname}</h3>
          <HeroScore score={70} size="sm" />
        </div>
      </div>
    </Container>
  );
};

export default CitizenInfo;
