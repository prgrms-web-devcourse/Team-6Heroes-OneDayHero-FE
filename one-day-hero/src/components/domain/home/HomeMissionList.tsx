"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

import ErrorPage from "@/app/error";
import Container from "@/components/common/Container";
import MissionFullInfo from "@/components/common/Info/MissionFullInfo";
import useLocation from "@/hooks/useLocation";
import { useGetMainFetch } from "@/services/home";
import { HomeResponse } from "@/types/response";
import { getClientToken } from "@/utils/cookie";

const HomeMissionList = () => {
  const [soonMissionList, setSoonMissionList] = useState<
    HomeResponse["data"]["soonExpiredMissions"] | null
  >(null);
  const { location } = useLocation();
  const token = getClientToken();

  // if (!token) redirect("/login");

  const { mutationalFetch } = useGetMainFetch(
    token!,
    location.lat,
    location.lng
  );

  useEffect(() => {
    if (location.lat === 0 || location.lng === 0) return;

    const fetchHome = async () => {
      const { isError, response } = await mutationalFetch();

      if (isError || !response) return <ErrorPage />;

      setSoonMissionList(response.data.soonExpiredMissions);
    };

    fetchHome();
  }, [location]);

  return (
    <div className="mt-7 flex flex-col gap-3">
      {soonMissionList?.length ? (
        soonMissionList?.map((mission) => (
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
