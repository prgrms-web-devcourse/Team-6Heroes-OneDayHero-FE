const DUMMY: HomeResponse["data"] = {
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
      bookmarkCount: 3,
      missionStatus: "MATCHING",
      imagePath: "s3://path",
      isBookmarked: false
    }
  ]
};

import { redirect } from "next/navigation";

import { getServerToken } from "@/app/utils/auth";
import MissionFullInfo from "@/components/common/Info/MissionFullInfo";
import { useGetMainFetch } from "@/services/home";
import { HomeResponse } from "@/types/response";

const HomeMissionList = async () => {
  const token = getServerToken();

  if (!token) redirect("/login");

  const { isError, response } = await useGetMainFetch(token!);

  return (
    <div>
      {DUMMY.soonExpiredMissions.map((list) => (
        <MissionFullInfo
          key={list.id}
          missionCategory={list.missionCategory}
          region={list.region}
          bookmarkCount={list.bookmarkCount}
          missionImagePath={list.imagePath}
          missionInfo={{
            title: list.title,
            missionDate: list.missionDate
          }}
        />
      ))}
    </div>
  );
};

export default HomeMissionList;
