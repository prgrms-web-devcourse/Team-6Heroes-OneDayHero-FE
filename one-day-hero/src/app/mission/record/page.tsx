"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";

import { getClientToken } from "@/app/utils/cookie";
import MissionListItem from "@/components/common/Info/MissionListItem";
import MissionProgressContainer from "@/components/common/MissionProgressContainer";
import { useGetCompleteMissionListFetch } from "@/services/missions";

const MissionRecordPage = () => {
  const token = getClientToken();

  const router = useRouter();

  if (!token) router.push("/login?redirect=");

  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data } = useGetCompleteMissionListFetch(token ?? "", observerRef);

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
      <div ref={observerRef} />
    </div>
  );
};

export default MissionRecordPage;
