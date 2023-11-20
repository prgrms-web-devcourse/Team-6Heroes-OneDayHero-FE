import { revalidateTag } from "next/cache";
import Link from "next/link";

import MissionListItem from "@/components/common/Info/MissionListItem";
import MissionProgressContainer from "@/components/common/MissionProgressContainer";
import { useGetCompleteMissionListFetch } from "@/services/missions";

const MissionRecordPage = async () => {
  /**@note mock 데이터 수정사항 반영 용도 */
  revalidateTag("complete1");

  const { data, fetchNextPage, hasNextPage } =
    await useGetCompleteMissionListFetch("1");

  return (
    <div className="flex w-full flex-col items-center gap-3">
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

export default MissionRecordPage;
