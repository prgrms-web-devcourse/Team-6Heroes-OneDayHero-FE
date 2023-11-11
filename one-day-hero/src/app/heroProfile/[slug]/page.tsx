import Image from "next/image";
import { BiChevronRight } from "react-icons/bi";

import DefaultThumbnail from "/public/images/OneDayHero_logo_sm.svg";
import ErrorPage from "@/app/error";
import Button from "@/components/common/Button";
import FavoriteDateList from "@/components/common/FavoriteDateList";
import HeroScore from "@/components/common/HeroScore";
import Label from "@/components/common/Label";
import { useGetUserFetch } from "@/services/users";

const HeroProfilePage = async ({ params }: { params: { slug: string } }) => {
  const { isError, response } = await useGetUserFetch(parseInt(params.slug));

  if (isError || !response) return <ErrorPage />;

  const {
    data: { basicInfo, favoriteWorkingDay }
  } = response;

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
          <h3 className="font-semibold text-sub">히어로</h3>
          <h3 className="">{basicInfo.nickname}</h3>
          <h3 className="">{`${calculateAge(basicInfo.birth)}세 / ${parseGender(
            basicInfo.gender
          )}`}</h3>
        </div>
      </div>
      <div className="w-full">
        <h2 className="mb-2 mt-5 text-xl font-semibold">히어로 지수</h2>
        <HeroScore score={70} />
      </div>
      <div className="w-full">
        <h2 className="mb-2 mt-5 text-xl font-semibold">희망 근무일</h2>
        <FavoriteDateList favoriteDate={favoriteWorkingDay.favoriteDate} />
      </div>
      <div className="w-full">
        <h2 className="mb-2 mt-5 text-xl font-semibold">희망 근무시간</h2>
        <div className="rounded-lg border border-background-darken bg-white p-2">
          {`${favoriteWorkingDay.favoriteStartTime} ~ ${favoriteWorkingDay.favoriteEndTime}`}
        </div>
      </div>
      <div className="w-full">
        <h2 className="mb-2 mt-5 text-xl font-semibold">선호 지역</h2>
        <div className="rounded-lg border border-background-darken bg-white p-2">
          서울시 강남구 역삼동
        </div>
      </div>
      <div className="mb-12 w-full">
        <h2 className="mb-2 mt-5 text-xl font-semibold">소개</h2>
        <div className="rounded-lg border border-background-darken bg-white p-2">
          <div className="mb-2 flex gap-2">
            <Label size="lg">카페</Label>
            <Label size="lg">식당</Label>
            <Label size="lg">청소</Label>
          </div>
          <p>식당 알바 6개월 경력</p>
        </div>
      </div>
      <Button size="lg" className="cs:relative cs:mb-3 cs:w-full">
        <BiChevronRight size="24" className="absolute right-3 top-4" />
        리뷰
      </Button>
      <Button size="lg" className="cs:relative cs:w-full">
        <BiChevronRight size="24" className="absolute right-3 top-4" />
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
