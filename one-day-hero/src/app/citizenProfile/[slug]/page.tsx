import Image from "next/image";
import DefaultThumbnail from "/public/images/OneDayHero_logo_sm.svg";
import { getUser } from "@/services/users";
import HeroScore from "@/components/common/HeroScore";
import Button from "@/components/common/Button";
import { BiChevronRight } from "react-icons/bi";

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
          className="rounded-full pointer-events-none bg-neutral-200 mr-3"
        />
        <div className="flex grow flex-col justify-evenly text-base">
          <h3 className="text-primary-darken font-semibold">시민</h3>
          <h3 className="">{basicInfo.nickname}</h3>
          <h3 className="">{`${calculateAge(basicInfo.birth)}세 / ${parseGender(
            basicInfo.gender
          )}`}</h3>
        </div>
      </div>
      <div className="w-full mb-12">
        <h2 className="text-xl font-semibold mt-5 mb-2">히어로 지수</h2>
        <HeroScore score={70} />
      </div>
      <Button size="lg" className="cs:w-full cs:relative cs:mb-3">
        <BiChevronRight size="24" className="absolute top-4 right-3" />
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
