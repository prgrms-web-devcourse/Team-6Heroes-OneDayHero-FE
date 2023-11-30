import { redirect } from "next/navigation";

import ErrorPage from "@/app/error";
import { calculateAge, parseGender } from "@/app/utils/formatProfile";
import HeroScore from "@/components/common/HeroScore";
import LinkButton from "@/components/common/LinkButton";
import ProfileImage from "@/components/common/ProfileImage";
import FavoriteDateList from "@/components/domain/profile/FavoriteDateList";
import HelpCircle from "@/components/domain/profile/HelpCircle";
import HeroSwitch from "@/components/domain/profile/HeroSwitch";
import { HELP_MESSAGES } from "@/constants/helpMessage";
import { useGetUserFetch } from "@/services/users";

import { getServerToken, getServerUserId } from "../utils/auth";

const ProfilePage = async () => {
  const token = getServerToken();

  if (!token) redirect("/login?redirect=");

  const { isError, response } = await useGetUserFetch(token ?? "");

  if (isError || !response) return <ErrorPage />;

  const userId = getServerUserId() ?? "-1";

  const {
    data: {
      basicInfo,
      image,
      favoriteWorkingDay,
      favoriteRegions,
      heroScore,
      isHeroMode
    }
  } = response;

  return (
    <>
      <div className="flex w-full">
        <ProfileImage
          src={image.path || ""}
          alt="프로필 이미지"
          width={150}
          priority
        />
        <div className="flex grow flex-col justify-evenly text-base">
          <h3
            className={`font-semibold ${
              isHeroMode ? "text-sub" : "text-primary"
            }`}>
            {isHeroMode ? "히어로" : "시민"}
          </h3>
          <h3 className="">{basicInfo.nickname}</h3>
          <h3 className="">{`${calculateAge(basicInfo.birth)}세 / ${parseGender(
            basicInfo.gender
          )}`}</h3>
        </div>
      </div>
      <div className="mt-5 flex w-full items-center justify-between">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold">히어로 전환</h2>
          <HelpCircle className="cs:ml-2">
            {HELP_MESSAGES.HERO_MODE_CHANGE}
          </HelpCircle>
        </div>
        <HeroSwitch isHeroMode={!!isHeroMode} />
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
          <p>{basicInfo.introduce}</p>
        </div>
      </div>
      <LinkButton
        href={`/review/${userId}/receive`}
        className="cs:mb-3 cs:w-full">
        리뷰
      </LinkButton>
      <LinkButton href="/mission/record" className="cs:mb-3 cs:w-full">
        미션 기록
      </LinkButton>
      <LinkButton href="/mission/record" className="cs:mb-3 cs:w-full">
        찜 목록
      </LinkButton>
    </>
  );
};

export default ProfilePage;
