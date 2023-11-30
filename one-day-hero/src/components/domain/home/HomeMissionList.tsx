const DUMMY: HomeResponse["data"] = {
  missionCategories: [
    {
      id: 1,
      code: "MC_001",
      name: "서빙"
    },
    {
      id: 2,
      code: "MC_002",
      name: "주방"
    },
    {
      id: 3,
      code: "MC_003",
      name: "배달, 운전"
    }
  ],
  soonExpiredMissions: [
    {
      id: 1,
      title: "미션 제목1",
      region: {
        id: 1,
        si: "서울시",
        gu: "강남구",
        dong: "역삼동"
      },
      missionCategory: {
        id: 2,
        code: "MC_002",
        name: "주방"
      },
      missionDate: "2023-11-22",
      startTime: "09:00",
      endTime: "09:30",
      price: 10000,
      bookmarkCount: 3,
      missionStatus: "MATCHING",
      imagePath: "s3://path",
      isBookmarked: false
    },
    {
      id: 2,
      title: "미션 제목2",
      region: {
        id: 2,
        si: "서울시",
        gu: "강남구",
        dong: "역삼동"
      },
      missionCategory: {
        id: 3,
        code: "MC_003",
        name: "배달, 운전"
      },
      missionDate: "2023-11-22",
      startTime: "09:00",
      endTime: "09:30",
      price: 10000,
      bookmarkCount: 3,
      missionStatus: "MATCHING",
      imagePath: "s3://path",
      isBookmarked: false
    }
  ]
};

import Link from "next/link";
import { redirect } from "next/navigation";

import { getServerToken } from "@/app/utils/auth";
import Container from "@/components/common/Container";
import MissionFullInfo from "@/components/common/Info/MissionFullInfo";
import { useGetMainFetch } from "@/services/home";
import { HomeResponse } from "@/types/response";

const HomeMissionList = async () => {
  const token = getServerToken();

  if (!token) redirect("/login");

  const { isError, response } = await useGetMainFetch(token!);

  return (
    <div className="mt-7 flex flex-col gap-3">
      {DUMMY.soonExpiredMissions.map((list) => (
        <Link
          key={list.id}
          href={`/mission/${list.id}`}
          className="flex w-full justify-center">
          <Container className="cs:w-full">
            <MissionFullInfo
              missionCategory={list.missionCategory}
              region={list.region}
              bookmarkCount={list.bookmarkCount}
              missionInfo={{
                title: list.title,
                missionDate: list.missionDate,
                startTime: list.startTime,
                endTime: list.endTime,
                price: list.price
              }}
            />
          </Container>
        </Link>
      ))}
    </div>
  );
};

export default HomeMissionList;
