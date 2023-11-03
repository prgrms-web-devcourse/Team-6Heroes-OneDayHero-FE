import Container from "@/components/common/Container";
import IconGroup from "@/components/common/IconGroup";
import Label from "@/components/common/Label";
import MissionInfo from "@/components/common/Info/MissionInfo";
import { getMission } from "@/services/missions";
import { revalidateTag } from "next/cache";
import { BiChevronRight, BiEdit, BiMap } from "react-icons/bi";
import Button from "@/components/common/Button";
import HeroRecommendList from "@/components/domain/missionDetail/HeroRecommendList";

const MissionDetailPage = async ({ params }: { params: { slug: string } }) => {
  revalidateTag(`mission${params.slug}`);
  const {
    data: { missionCategory, missionInfo, region }
  } = await getMission(params.slug);

  return (
    <>
      <Container className="cs:w-full">
        <Label size="sm">{missionCategory.name}</Label>
        <h1 className="text-xl font-semibold">{missionInfo.title + "title"}</h1>
      </Container>
      <Container className="cs:w-full">
        <MissionInfo
          missionBounty={missionInfo.price.toString()}
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
          <div className="absolute top-0 right-1 h-6 flex items-center">
            <BiChevronRight size="20" />
          </div>
        </Button>
      </Container>
      <h1 className="text-lg font-semibold mt-4 mb-2 break-keep w-full">
        미션에 딱 맞는 히어로님을 만나보시겠어요?
      </h1>
      <HeroRecommendList
        className="w-full mb-20"
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
          <BiEdit className="absolute top-[3px] -left-7" size={24} />
          수정하기
        </div>
      </Button>
    </>
  );
};

export default MissionDetailPage;
