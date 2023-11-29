"use client";

import { useRef } from "react";

import { getClientToken } from "@/app/utils/cookie";
import { useGetSuggestedMissionListFetch } from "@/services/missions";

import SuggestedMissionItem from "./SuggestedMissionItem";

const SuggestedMissionList = () => {
  const token = getClientToken();
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data } = useGetSuggestedMissionListFetch(token ?? "", observerRef);

  return (
    <>
      {data.map(({ id, mission }) => (
        <SuggestedMissionItem key={id} proposalId={id} missionData={mission} />
      ))}
      <div ref={observerRef} />
    </>
  );
};

export default SuggestedMissionList;
