import Image from "next/image";
import { BiChevronRight } from "react-icons/bi";

import DefaultThumbnail from "/public/images/OneDayHero_logo_sm.svg";
import Button from "@/components/common/Button";
import HeroScore from "@/components/common/HeroScore";
import { getUser } from "@/services/users";

const CitizenProfilePage = async ({ params }: { params: { slug: string } }) => {
  const {
    data: { basicInfo }
  } = await getUser(parseInt(params.slug));

  return (
    <>
      <div className="flex w-full">
        <Image
          src={DefaultThumbnail}
          alt="썸네일"
          width={150}
          className="pointer-events-none mr-3 rounded-full bg-neutral-200"
        />
        <div className="flex grow flex-col justify-evenly text-base">
          <h3 className="font-semibold text-primary-darken">시민</h3>
          <h3 className="">{basicInfo.nickname}</h3>
          <h3 className="">{`${calculateAge(basicInfo.birth)}세 / ${parseGender(
            basicInfo.gender
          )}`}</h3>
        </div>
      </div>
      <div className="mb-12 w-full">
        <h2 className="mb-2 mt-5 text-xl font-semibold">히어로 지수</h2>
        <HeroScore score={70} />
      </div>
      <Button size="lg" className="cs:relative cs:mb-3 cs:w-full">
        <BiChevronRight size="24" className="absolute right-3 top-4" />
        리뷰
      </Button>
    </>
  );
};

const calculateAge = (birth: string) => {
  const diffms = Date.now() - new Date(birth).getTime();
  return Math.abs(new Date(diffms).getUTCFullYear() - 1970);
};

const parseGender = (gender: string) => {
  return gender === "MALE" ? "남" : "여";
};

export default CitizenProfilePage;
