import { getMission } from "@/services/missions";

const MissionDetailPage = async ({ params }: { params: { slug: string } }) => {
  const { data } = await getMission(params.slug);

  console.log(data);
  return <div>{data.location.x}</div>;
};

export default MissionDetailPage;
