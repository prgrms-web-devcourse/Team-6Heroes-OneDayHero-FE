import KebabMenu from "@/components/common/KebabMenu";
import { getMission } from "@/services/missions";

const MissionDetailPage = async ({ params }: { params: { slug: string } }) => {
  const { data } = await getMission(params.slug);

  return (
    <div>
      {data.location.x}
      <KebabMenu
        menuList={[{ name: "first", apiPath: "/test", requiredData: ["slug"] }]}
      />
    </div>
  );
};

export default MissionDetailPage;
