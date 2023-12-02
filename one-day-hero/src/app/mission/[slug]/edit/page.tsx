import { redirect } from "next/navigation";

import ErrorPage from "@/app/error";
import MissionForm from "@/components/domain/mission/create/MissionForm";
import { safeGetMissionFetch } from "@/services/missions";
import { getServerToken } from "@/utils/auth";

type MissionEditProps = {
  params: {
    slug: string;
  };
};

const MissionEditPage = async ({ params }: MissionEditProps) => {
  const missionId = params.slug;
  const token = getServerToken();

  if (!token) redirect("/login?redirect=");

  const { isError, response } = await safeGetMissionFetch(missionId, token);

  if (isError || !response) return <ErrorPage />;

  const { data } = response;
  const {
    id,
    missionCategory,
    region,
    longitude,
    latitude,
    missionInfo,
    missionImage
  } = data;

  return (
    <MissionForm
      editDefaultData={{
        id,
        missionCategeryId: missionCategory.id,
        missionImage,
        region,
        longitude,
        latitude,
        missionInfo
      }}
    />
  );
};

export default MissionEditPage;
