import Image from "next/image";
import DefaultThumbnail from "/public/images/OneDayHero_logo_sm.svg";
import { getUser } from "@/services/users";
import HeroScore from "@/components/common/HeroScore";
import FavoriteDateList from "@/components/common/FavoriteDateList";
import Label from "@/components/common/Label";
import Button from "@/components/common/Button";
import { BiChevronRight } from "react-icons/bi";

const HeroProfilePage = async ({ params }: { params: { slug: string } }) => {
  const {
    data: { basicInfo, favoriteWorkingDay }
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
          <h3 className="text-sub font-semibold">히어로</h3>
          <h3 className="">{basicInfo.nickname}</h3>
          <h3 className="">{`${calculateAge(basicInfo.birth)}세 / ${parseGender(
            basicInfo.gender
          )}`}</h3>
        </div>
      </div>
      <div className="w-full">
        <h2 className="text-xl font-semibold mt-5 mb-2">히어로 지수</h2>
        <HeroScore score={70} />
      </div>
      <div className="w-full">
        <h2 className="text-xl font-semibold mt-5 mb-2">희망 근무일</h2>
        <FavoriteDateList favoriteDate={favoriteWorkingDay.favoriteDate} />
      </div>
      <div className="w-full">
        <h2 className="text-xl font-semibold mt-5 mb-2">희망 근무시간</h2>
        <div className="border bg-white border-background-darken rounded-lg p-2">
          {`${favoriteWorkingDay.favoriteStartTime} ~ ${favoriteWorkingDay.favoriteEndTime}`}
        </div>
      </div>
      <div className="w-full">
        <h2 className="text-xl font-semibold mt-5 mb-2">선호 지역</h2>
        <div className="border bg-white border-background-darken rounded-lg p-2">
          서울시 강남구 역삼동
        </div>
      </div>
      <div className="w-full mb-12">
        <h2 className="text-xl font-semibold mt-5 mb-2">소개</h2>
        <div className="border bg-white border-background-darken rounded-lg p-2">
          <div className="flex gap-2 mb-2">
            <Label size="lg">카페</Label>
            <Label size="lg">식당</Label>
            <Label size="lg">청소</Label>
          </div>
          <p>식당 알바 6개월 경력</p>
        </div>
      </div>
      <Button size="lg" className="cs:w-full cs:relative cs:mb-3">
        <BiChevronRight size="24" className="absolute top-4 right-3" />
        리뷰
      </Button>
      <Button size="lg" className="cs:w-full cs:relative">
        <BiChevronRight size="24" className="absolute top-4 right-3" />
        미션 기록
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

export default HeroProfilePage;
