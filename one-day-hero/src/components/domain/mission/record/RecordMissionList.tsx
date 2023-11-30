"use client";

import Link from "next/link";
import { useRef } from "react";

import { getClientToken } from "@/app/utils/cookie";
import MissionListItem from "@/components/common/Info/MissionListItem";
import MissionProgressContainer from "@/components/common/MissionProgressContainer";
import { useGetCompleteMissionListFetch } from "@/services/missions";

const RecordMissionList = () => {
  const token = getClientToken();
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data } = useGetCompleteMissionListFetch(token ?? "", observerRef);

  return (
    <>
      {data.map((item) => (
        <Link
          href={`/mission/${item.id}`}
          className="flex w-full max-w-screen-sm justify-center"
          key={item.id}>
          <MissionProgressContainer missionStatus={item.missionStatus}>
            <MissionListItem
              className="cs:p-4"
              categories={item.missionCategory.name}
              missionDate={item.missionDate}
              location="구 동"
              title={item.title}
              bookmarkCount={item.bookmarkCount}
            />
          </MissionProgressContainer>
        </Link>
      ))}
      <div ref={observerRef} />
    </>
  );
};

export default RecordMissionList;
