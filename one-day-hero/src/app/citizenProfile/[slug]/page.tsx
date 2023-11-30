import { redirect } from "next/navigation";

import ErrorPage from "@/app/error";
import HeroScore from "@/components/common/HeroScore";
import LinkButton from "@/components/common/LinkButton";
import ProfileImage from "@/components/common/ProfileImage";
import HelpCircle from "@/components/domain/profile/HelpCircle";
import { HELP_MESSAGES } from "@/constants/helpMessage";
import { useGetProfileFetch } from "@/services/users";
import { getServerToken } from "@/utils/auth";
import { calculateAge, parseGender } from "@/utils/formatProfile";

const CitizenProfilePage = async ({ params }: { params: { slug: string } }) => {
  const citizenId = parseInt(params.slug);
  const token = getServerToken();

  if (!token) redirect("/login?redirect=");

  const { isError, response } = await useGetProfileFetch(
    citizenId,
    false,
    token
  );

  if (isError || !response) return <ErrorPage />;

  const {
    data: { basicInfo, heroScore, image }
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
          <h3 className="text-primary-darken font-semibold">시민</h3>
          <h3 className="">{basicInfo.nickname}</h3>
          <h3 className="">{`${calculateAge(basicInfo.birth)}세 / ${parseGender(
            basicInfo.gender
          )}`}</h3>
        </div>
      </div>
      <div className="mb-12 w-full">
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
      <LinkButton
        href={`/review/${citizenId}/receive`}
        className="cs:mb-3 cs:w-full">
        리뷰
      </LinkButton>
    </>
  );
};

export default CitizenProfilePage;
