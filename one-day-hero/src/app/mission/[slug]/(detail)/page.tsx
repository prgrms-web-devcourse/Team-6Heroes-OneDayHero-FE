import { redirect } from "next/navigation";
import { BiChevronRight, BiEdit, BiMap } from "react-icons/bi";

import ErrorPage from "@/app/error";
import { getServerToken, getServerUserId } from "@/app/utils/auth";
import BookmarkButton from "@/components/common/BookmarkButton";
import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import IconGroup from "@/components/common/IconGroup";
import MissionInfo from "@/components/common/Info/MissionInfo";
import Label from "@/components/common/Label";
import ChattingButton from "@/components/domain/missionDetail/ChattingButton";
import CitizenInfo from "@/components/domain/missionDetail/CitizenInfo";
import HeroRecommendList from "@/components/domain/missionDetail/HeroRecommendList";
import { useGetMissionFetch } from "@/services/missions";

const MissionDetailPage = async ({ params }: { params: { slug: string } }) => {
  const missionId = params.slug;
  const token = getServerToken();

  if (!token) redirect("/login?redirect=");

  const { isError, response } = await useGetMissionFetch(missionId, token);

  if (isError || !response) return <ErrorPage />;

  const {
    data: {
      id,
      missionCategory,
      missionInfo,
      region,
      citizenId,
      bookmarkCount,
      isBookmarked
    }
  } = response;

  const userId = parseInt(getServerUserId() ?? "-1");
  const isOwner = userId === citizenId;

  return (
    <>
      <Container className="cs:w-full">
        <Label size="sm">{missionCategory.name}</Label>
        <h1 className="text-xl font-semibold">{missionInfo.title}</h1>
      </Container>
      <Container className="cs:w-full">
        <MissionInfo
          missionBounty={missionInfo.price}
          missionDay={missionInfo.missionDate}
          missionTime={`${missionInfo.startTime} ~ ${missionInfo.endTime}`}
        />
      </Container>
      <Container className="cs:w-full">
        <h2 className="text-base font-semibold">미션 내용</h2>
        <p className="text-base">{missionInfo.content}</p>
      </Container>
      <Container className="cs:w-full">
        <IconGroup
          title={`${region.si} ${region.gu} ${region.dong}`}
          direction="row"
          className="cs:mb-2 cs:justify-normal">
          <BiMap />
        </IconGroup>
        <Button
          className="hover:bg-inactive-darken cs:relative cs:h-6 cs:w-full cs:text-black"
          textSize="sm"
          theme="inactive">
          미션 지도보기
          <div className="absolute right-1 top-0 flex h-6 items-center">
            <BiChevronRight size="20" />
          </div>
        </Button>
      </Container>
      {/* <h1 className="mb-2 mt-4 w-full break-keep text-lg font-semibold">
        미션에 딱 맞는 히어로님을 만나보시겠어요?
      </h1>
      {isOwner && (
        <HeroRecommendList
          className="mb-20 w-full"
          heroDataList={[
            { thumbnail: "", nickname: "rabbit", heroScore: 100 },
            { thumbnail: "", nickname: "rabbit", heroScore: 100 },
            { thumbnail: "", nickname: "rabbit", heroScore: 100 },
            { thumbnail: "", nickname: "rabbit", heroScore: 100 },
            { thumbnail: "", nickname: "rabbit", heroScore: 100 },
            { thumbnail: "", nickname: "rabbit", heroScore: 100 },
            { thumbnail: "", nickname: "rabbit", heroScore: 100 }
          ]}
        />
      )} */}
      {!isOwner && <CitizenInfo citizenId={userId} />}
      {isOwner && (
        <Button size="lg">
          <div className="relative inline-block">
            <BiEdit className="absolute -left-7 top-[3px]" size={24} />
            수정하기
          </div>
        </Button>
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
    </>
  );
};

export default MissionDetailPage;
