import { revalidateTag } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import ErrorPage from "@/app/error";
import MissionListItem from "@/components/common/Info/MissionListItem";
import MissionProgressContainer from "@/components/common/MissionProgressContainer";
import {
  useGetOngoingMissionListFetch,
  useGetProgressMissionListFetch
} from "@/services/missions";
import { MissionResponse } from "@/types/response";

const OngoingMissionPage = async () => {
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   redirect("/api/auth/signin?callbackUrl=/mission/list/ongoing");
  // }
  /**@note mock 데이터 수정사항 반영 용도 */
  revalidateTag("progress1");

  const { data, fetchNextPage, hasNextPage } =
    await useGetProgressMissionListFetch("1");

  return (
    <div className="mt-20 w-full max-w-screen-sm space-y-4">
      {data.map((item) => (
        <Link
          href={`/mission/${item.id}`}
          className="flex w-full max-w-screen-sm justify-center"
          key={item.id}>
          <MissionProgressContainer missionStatus={item.missionStatus}>
            <MissionListItem
              className="cs:p-4"
              categories={item.missionCategory.name}
              createAt={item.missionDate}
              location="구 동"
              title={item.title}
              bookmarkCount={item.bookmarkCount}
            />
          </MissionProgressContainer>
        </Link>
      ))}
    </div>
  );
};

export default OngoingMissionPage;
