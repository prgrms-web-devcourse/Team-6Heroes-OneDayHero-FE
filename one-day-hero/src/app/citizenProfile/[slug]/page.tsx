import Image from "next/image";

import DefaultThumbnail from "/public/images/OneDayHero_logo_sm.svg";
import ErrorPage from "@/app/error";
import { calculateAge, parseGender } from "@/app/utils/formatProfile";
import HeroScore from "@/components/common/HeroScore";
import LinkButton from "@/components/common/LinkButton";
import { useGetUserFetch } from "@/services/users";

const CitizenProfilePage = async ({ params }: { params: { slug: string } }) => {
  const { isError, response } = await useGetUserFetch(parseInt(params.slug));

  if (isError || !response) return <ErrorPage />;

  const {
    data: { basicInfo }
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
      <LinkButton href="/mission/record" className="cs:mb-3 cs:w-full">
        리뷰
      </LinkButton>
    </>
  );
};

export default CitizenProfilePage;
