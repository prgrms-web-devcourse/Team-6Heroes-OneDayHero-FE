"use client";

import Link from "next/link";
import { useRef } from "react";

import MissionListItem from "@/components/common/Info/MissionListItem";
import MissionProgressContainer from "@/components/common/MissionProgressContainer";
import { useGetProgressMissionListFetch } from "@/services/missions";
import { getClientToken } from "@/utils/cookie";

const OngoingMissionList = () => {
  const token = getClientToken();
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data } = useGetProgressMissionListFetch(token ?? "", observerRef);

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
              location={`${item.si} ${item.gu} ${item.dong}`}
              title={item.title}
              bookmarkCount={item.bookmarkCount}
              imageSrc={item.imagePath}
            />
          </MissionProgressContainer>
        </Link>
      ))}
      <div ref={observerRef} />
    </>
  );
};

export default OngoingMissionList;
