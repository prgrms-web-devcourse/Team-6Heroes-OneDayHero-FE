import Link from "next/link";

import ErrorPage from "@/app/error";
import MissionListItem from "@/components/common/Info/MissionListItem";
import MissionProgressContainer from "@/components/common/MissionProgressContainer";
import { useGetOngoingMissionListFetch } from "@/services/missions";
import { MissionResponse } from "@/types/response";

const OngoingMissionPage = async () => {
  const { isError, response } = await useGetOngoingMissionListFetch();

  if (isError || !response) return <ErrorPage />;

  const { data } = response;

  return (
    <div className="mt-20 w-full max-w-screen-sm space-y-4">
      {data &&
        data.map((item: MissionResponse["data"]) => (
          <Link
            href={`/mission/${item.id}`}
            className="flex w-full max-w-screen-sm justify-center"
            key={item.id}>
            <MissionProgressContainer missionStatus={item.missionStatus}>
              <MissionListItem
                className="cs:p-4"
                categories={item.missionCategory.name}
                createAt={item.missionInfo.missionDate}
                location={item.region.gu + " " + item.region.dong}
                title={item.missionInfo.title}
                bookmarkCount={item.bookmarkCount}
              />
            </MissionProgressContainer>
          </Link>
        ))}
    </div>
  );
};

export default OngoingMissionPage;
