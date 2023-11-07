import { revalidateTag } from "next/cache";
import { BiChevronRight, BiEdit, BiMap } from "react-icons/bi";

import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import IconGroup from "@/components/common/IconGroup";
import MissionInfo from "@/components/common/Info/MissionInfo";
import Label from "@/components/common/Label";
import HeroRecommendList from "@/components/domain/missionDetail/HeroRecommendList";
import { getMission } from "@/services/missions";

const MissionDetailPage = async ({ params }: { params: { slug: string } }) => {
  const userId = parseInt(params.slug);

  revalidateTag(`mission${params.slug}`);
  const {
    data: { id, missionCategory, missionInfo, region, citizenId, bookmarkList }
  } = await getMission(params.slug);

  const isOwner = userId === citizenId;

  return (
    <>
      <Container className="cs:w-full">
        <Label size="sm">{missionCategory.name}</Label>
        <h1 className="text-xl font-semibold">{missionInfo.title + "title"}</h1>
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
          className="cs:justify-normal cs:mb-2">
          <BiMap />
        </IconGroup>
        <Button
          className="cs:w-full cs:h-6 cs:text-black cs:relative hover:bg-inactive-darken"
          textSize="sm"
          theme="inactive">
          미션 지도보기
          <div className="absolute right-1 top-0 flex h-6 items-center">
            <BiChevronRight size="20" />
          </div>
        </Button>
      </Container>
      <h1 className="mb-2 mt-4 w-full break-keep text-lg font-semibold">
        미션에 딱 맞는 히어로님을 만나보시겠어요?
      </h1>
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
      <Button size="lg">
        <div className="relative inline-block">
          <BiEdit className="absolute -left-7 top-[3px]" size={24} />
          수정하기
        </div>
      </Button>
    </>
  );
};

export default MissionDetailPage;
