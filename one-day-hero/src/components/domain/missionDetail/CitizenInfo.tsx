import Container from "@/components/common/Container";
import { getUser } from "@/services/users";
import Image from "next/image";
import { BiChevronRight } from "react-icons/bi";
import DefaultThumbnail from "/public/images/OneDayHero_logo_sm.svg";
import HeroScore from "@/components/common/HeroScore";

interface CitizenInfoProps extends React.ComponentProps<"div"> {
  citizenId: number;
}

const CitizenInfo = async ({ citizenId, className }: CitizenInfoProps) => {
  const {
    data: { basicInfo }
  } = await getUser(citizenId);

  return (
    <Container className={`cs:w-full ${className}`}>
      <div className="flex justify-between items-center">
        <h2 className="text-base font-semibold">시민 정보</h2>
        <BiChevronRight size="20" />
      </div>
      <div className="flex mt-2 pr-2">
        <Image
          src={DefaultThumbnail}
          alt="썸네일"
          width={60}
          className="rounded-full pointer-events-none mr-2"
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
