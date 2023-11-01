import KebabMenu from "@/components/common/KebabMenu";
import { getMission } from "@/services/missions";

const MissionDetailPage = async ({ params }: { params: { slug: string } }) => {
  const { data } = await getMission(params.slug);

  return (
    <div>
      {data.location.x}
      <KebabMenu
        menuList={[
          {
            name: "first",
            apiPath: "/test",
            requiredData: ["slug"],
            description: "정말로 삭제하시겠어요?"
          },
          { name: "second", apiPath: "/test", requiredData: ["slug"] },
          { name: "third", apiPath: "/test", requiredData: ["slug"] }
        ]}
        size={24}
      />
      <div className="h-80" />
      <KebabMenu
        menuList={[
          { name: "first", apiPath: "/test", requiredData: ["slug"] },
          { name: "second", apiPath: "/test", requiredData: ["slug"] },
          { name: "third", apiPath: "/test", requiredData: ["slug"] }
        ]}
        size={24}
      />
      <div className="h-80" />
    </div>
  );
};

export default MissionDetailPage;
