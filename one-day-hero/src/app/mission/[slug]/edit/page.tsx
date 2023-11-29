import { redirect } from "next/navigation";

import ErrorPage from "@/app/error";
import { getServerToken } from "@/app/utils/auth";
import MissionForm from "@/components/domain/mission/create/MissionForm";
import { useGetMissionFetch } from "@/services/missions";

type MissionEditProps = {
  params: {
    slug: string;
  };
};

const MissionEditPage = async ({ params }: MissionEditProps) => {
  const missionId = params.slug;
  const token = getServerToken();

  if (!token) redirect("/login?redirect=");

  const { isError, response } = await useGetMissionFetch(missionId, token);

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
