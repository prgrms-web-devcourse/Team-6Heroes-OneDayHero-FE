import Container from "@/components/common/Container";
import IconGroup from "@/components/common/IconGroup";
import Label from "@/components/common/Label";
import MissionInfo from "@/components/common/MissionInfo";
import { getMission } from "@/services/missions";
import { revalidateTag } from "next/cache";
import { BiMap } from "react-icons/bi";

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
        <h2 className="text-md font-semibold">미션 내용</h2>
        <p>{missionInfo.content}</p>
      </Container>
      <Container className="cs:w-full">
        <IconGroup title={`${region.si} ${region.gu} ${region.dong}`}>
          <BiMap />
        </IconGroup>
      </Container>
    </>
  );
};

export default MissionDetailPage;
