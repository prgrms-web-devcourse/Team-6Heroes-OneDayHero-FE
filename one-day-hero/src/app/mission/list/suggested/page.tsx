import { revalidateTag } from "next/cache";
import Link from "next/link";

import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import MissionFullInfo from "@/components/common/Info/MissionFullInfo";
import { useGetSuggestedMissionListFetch } from "@/services/missions";

const SuggestedMissionPage = async () => {
  /**@note mock 데이터 수정사항 반영 용도 */
  revalidateTag("suggested1");

  const { data, fetchNextPage, hasNextPage } =
    await useGetSuggestedMissionListFetch("1");

  return (
    <div className="mt-20 flex w-full max-w-screen-sm flex-col items-center justify-center space-y-4">
      {data.map(({ id, mission }) => (
        <Link
          href={`/mission/${id}`}
          className="flex w-full max-w-screen-sm justify-center"
          key={id}>
          <Container className="cs:w-11/12" missionStatus={mission.status}>
            <MissionFullInfo
              bookmarkCount={mission.bookmarkCount}
              createdAt={mission.createdAt}
              region={mission.region}
              missionCategory={mission.missionCategory}
              missionInfo={mission.missionInfo}
            />
            <div className="flex justify-center gap-1">
              <Button
                theme="cancel"
                size="sm"
                textSize="sm"
                className="cs:h-10">
                거절하기
              </Button>
              <Button
                theme="primary"
                size="sm"
                textSize="sm"
                className="cs:h-10">
                채팅하기
              </Button>
            </div>
          </Container>
        </Link>
      ))}
    </div>
  );
};

export default SuggestedMissionPage;
