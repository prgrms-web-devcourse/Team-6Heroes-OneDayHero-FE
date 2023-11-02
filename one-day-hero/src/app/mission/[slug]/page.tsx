import Container from "@/components/common/Container";
import Label from "@/components/common/Label";
import MissionInfo from "@/components/common/MissionInfo";
import { getMission } from "@/services/missions";

const MissionDetailPage = async ({ params }: { params: { slug: string } }) => {
  const {
    data: { missionCategory, missionInfo }
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
    </>
  );
};

export default MissionDetailPage;
