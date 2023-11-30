import Link from "next/link";
import { BiChevronRight } from "react-icons/bi";

import ErrorPage from "@/app/error";
import Container from "@/components/common/Container";
import HeroScore from "@/components/common/HeroScore";
import ProfileImage from "@/components/common/ProfileImage";
import { safeGetProfileFetch } from "@/services/users";
import { getServerToken } from "@/utils/auth";

interface CitizenInfoProps extends React.ComponentProps<"div"> {
  citizenId: number;
}

const CitizenInfo = async ({ citizenId, className }: CitizenInfoProps) => {
  const token = getServerToken();

  const { isError, response } = await safeGetProfileFetch(
    citizenId,
    false,
    token ?? ""
  );

  if (isError || !response) return <ErrorPage />;

  const {
    data: { basicInfo, heroScore, image }
  } = response;

  return (
    <Link href={`/citizenProfile/${citizenId}`} className="my-2 w-full">
      <Container className={`cs:m-0 cs:w-full ${className}`}>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold">시민 정보</h2>
          <BiChevronRight size="20" />
        </div>
        <div className="mt-2 flex pr-2">
          <ProfileImage
            src={image.path || ""}
            alt="프로필 이미지"
            width={60}
            height={60}
            className="cs:mr-2"
          />
          <div className="grow">
            <h3 className="text-base font-semibold">{basicInfo.nickname}</h3>
            <HeroScore score={heroScore} size="sm" />
          </div>
        </div>
      </Container>
    </Link>
  );
};

export default CitizenInfo;
