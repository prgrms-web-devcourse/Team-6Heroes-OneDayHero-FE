import Image from "next/image";
import { redirect } from "next/navigation";

import DefaultThumbnail from "/public/images/OneDayHero_logo_sm.svg";
import ErrorPage from "@/app/error";
import { getServerToken } from "@/app/utils/auth";
import { calculateAge, parseGender } from "@/app/utils/formatProfile";
import HeroScore from "@/components/common/HeroScore";
import LinkButton from "@/components/common/LinkButton";
import FavoriteDateList from "@/components/domain/profile/FavoriteDateList";
import HelpCircle from "@/components/domain/profile/HelpCircle";
import { HELP_MESSAGES } from "@/constants/helpMessage";
import { useGetProfileFetch } from "@/services/users";

const HeroProfilePage = async ({ params }: { params: { slug: string } }) => {
  const token = getServerToken();

  if (!token) redirect("/login?redirect=");

  const { isError, response } = await useGetProfileFetch(
    parseInt(params.slug),
    true,
    token
  );

  if (isError || !response) return <ErrorPage />;

  const {
    data: { basicInfo, image, favoriteWorkingDay, favoriteRegions, heroScore }
  } = response;

  return (
    <>
      <div className="flex w-full">
        <Image
          src={image?.path || DefaultThumbnail}
          alt="썸네일"
          width={150}
          className="pointer-events-none mr-3 rounded-full bg-neutral-200"
          priority
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
        <div className="mb-2 mt-5 flex items-center">
          <h2 className="text-xl font-semibold">히어로 지수</h2>
          <HelpCircle className="cs:ml-2">
            {HELP_MESSAGES.HERO_SCORE.split("\n").map((line) => (
              <p key={line[0]}>{line}</p>
            ))}
          </HelpCircle>
        </div>
        <HeroScore score={heroScore} />
      </div>
      <div className="w-full">
        <div className="mb-2 mt-5 flex items-center">
          <h2 className="text-xl font-semibold">희망 근무일</h2>
          <HelpCircle className="cs:ml-2">
            {HELP_MESSAGES.FAVORITE_WORK_TIME}
          </HelpCircle>
        </div>
        <FavoriteDateList
          favoriteDate={favoriteWorkingDay.favoriteDate || []}
        />
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
          {favoriteRegions?.map(({ id, si, gu, dong }) => (
            <p key={id}>{`${si} ${gu} ${dong}`}</p>
          ))}
        </div>
      </div>
      <div className="mb-12 w-full">
        <h2 className="mb-2 mt-5 text-xl font-semibold">소개</h2>
        <div className="rounded-lg border border-background-darken bg-white p-2">
          {/* <div className="mb-2 flex gap-2">
            <Label size="lg">카페</Label>
            <Label size="lg">식당</Label>
            <Label size="lg">청소</Label>
          </div> */}
          <p>{basicInfo.introduce}</p>
        </div>
      </div>
      <LinkButton href="/mission/record" className="cs:mb-3 cs:w-full">
        리뷰
      </LinkButton>
      <LinkButton href="/mission/record" className="cs:mb-3 cs:w-full">
        미션 기록
      </LinkButton>
    </>
  );
};

export default HeroProfilePage;
