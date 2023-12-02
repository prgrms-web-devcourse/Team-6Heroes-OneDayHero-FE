import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BiChevronRight, BiEdit, BiMap } from "react-icons/bi";

import ErrorPage from "@/app/error";
import BookmarkButton from "@/components/common/BookmarkButton";
import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import HorizontalScroll from "@/components/common/HorizontalScroll";
import IconGroup from "@/components/common/IconGroup";
import MissionInfo from "@/components/common/Info/MissionInfo";
import LinkButton from "@/components/common/LinkButton";
import TitleBox from "@/components/common/TitleBox";
import ChattingButton from "@/components/domain/missionDetail/ChattingButton";
import CitizenInfo from "@/components/domain/missionDetail/CitizenInfo";
import { safeGetMissionFetch } from "@/services/missions";
import { getServerToken, getServerUserId } from "@/utils/auth";

const MissionDetailPage = async ({ params }: { params: { slug: string } }) => {
  const missionId = params.slug;
  const token = getServerToken();

  if (!token) redirect("/login?redirect=");

  const { isError, response } = await safeGetMissionFetch(missionId, token);

  if (isError || !response) return <ErrorPage />;

  const {
    data: {
      id,
      missionCategory,
      missionInfo,
      region,
      citizenId,
      bookmarkCount,
      isBookmarked,
      missionImage,
      latitude,
      longitude
    }
  } = response;

  const userId = parseInt(getServerUserId() ?? "-1");
  const isOwner = userId === citizenId;

  return (
    <div className="flex w-full flex-col items-center gap-2">
      <TitleBox category={missionCategory.name} title={missionInfo.title} />
      <Container className="cs:w-full cs:py-4">
        <MissionInfo
          className="cs:ml-1"
          missionBounty={missionInfo.price}
          missionDay={missionInfo.missionDate}
          missionTime={`${missionInfo.startTime} ~ ${missionInfo.endTime}`}
        />
      </Container>
      <Container className="cs:w-full cs:pt-0 cs:px-5">
        <HorizontalScroll className="pt-4">
          {missionImage.map(({ path, id }) => (
            <Image
              key={id}
              src={path}
              alt="미션 사진"
              width={130}
              height={130}
              className="cs:rounded-2xl cs:pr-2"
            />
          ))}
        </HorizontalScroll>
        <div className="gap-1 pb-2 pt-4">
          <h2 className="ml-1 text-base font-semibold">미션 내용</h2>
          <p className="ml-1 pt-2 text-[0.9rem]">{missionInfo.content}</p>
        </div>
      </Container>
      <Container className="cs:w-full cs:p-4">
        <IconGroup
          title={`${region.si} ${region.gu} ${region.dong}`}
          direction="row"
          className="cs:mb-2 cs:justify-normal">
          <BiMap />
        </IconGroup>
        <Link
          href={{
            pathname: "/map",
            query: { lat: latitude, lng: longitude }
          }}>
          <Button
            className="hover:bg-inactive-darken cs:relative cs:h-6 cs:w-full cs:text-black"
            textSize="sm"
            theme="inactive">
            미션 지도보기
            <div className="absolute right-1 top-0 flex h-6 items-center">
              <BiChevronRight size="20" />
            </div>
          </Button>
        </Link>
      </Container>
      {!isOwner && <CitizenInfo citizenId={citizenId} />}
      {isOwner && (
        <LinkButton href={`${missionId}/edit`} className="cs:mt-7">
          <div className="relative inline-block">
            <BiEdit className="absolute -left-7 top-[0.188rem]" size={24} />
            수정하기
          </div>
        </LinkButton>
      )}
      {!isOwner && (
        <div className="mt-12 flex w-full justify-between gap-3">
          <BookmarkButton
            bookmarkCount={bookmarkCount}
            isBookmarked={isBookmarked}
            missionId={id}
            size="lg"
            className="cs:grow"
          />
          <ChattingButton
            missionId={parseInt(missionId)}
            citizenId={citizenId}
          />
        </div>
      )}
    </div>
  );
};

export default MissionDetailPage;
