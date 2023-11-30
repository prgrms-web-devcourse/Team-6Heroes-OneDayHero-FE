import Link from "next/link";
import { redirect } from "next/navigation";

import ErrorPage from "@/app/error";
import Container from "@/components/common/Container";
import MissionFullInfo from "@/components/common/Info/MissionFullInfo";
import { useGetMainFetch } from "@/services/home";
import { getServerToken } from "@/utils/auth";

const HomeMissionList = async () => {
  const token = getServerToken();

  if (!token) redirect("/login");

  const { isError, response } = await useGetMainFetch(token!);

  if (isError || !response) return <ErrorPage />;

  const {
    data: { soonExpiredMissions }
  } = response;

  return (
    <div className="mt-7 flex flex-col gap-3">
      {soonExpiredMissions.length ? (
        soonExpiredMissions.map((mission) => (
          <Link
            key={mission.id}
            href={`/mission/${mission.id}`}
            className="flex w-full justify-center">
            <Container className="cs:w-full">
              <MissionFullInfo
                missionImagePath={mission.imagePath}
                missionCategory={mission.missionCategory}
                region={mission.region}
                bookmarkCount={mission.bookmarkCount}
                missionInfo={{
                  title: mission.title,
                  missionDate: mission.missionDate,
                  startTime: mission.startTime,
                  endTime: mission.endTime,
                  price: mission.price
                }}
              />
            </Container>
          </Link>
        ))
      ) : (
        <h1>아직 생성된 미션이 없어요..</h1>
      )}
    </div>
  );
};

export default HomeMissionList;
