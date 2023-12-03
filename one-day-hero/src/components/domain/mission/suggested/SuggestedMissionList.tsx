"use client";

import { useRef } from "react";

import { useGetSuggestedMissionListFetch } from "@/services/missions";
import { getClientToken } from "@/utils/cookie";

import SuggestedMissionItem from "./SuggestedMissionItem";

const SuggestedMissionList = () => {
  const token = getClientToken();
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data, refreshPage } = useGetSuggestedMissionListFetch(
    token ?? "",
    observerRef
  );

  return (
    <>
      {data.map(({ id, mission }) => (
        <SuggestedMissionItem
          key={id}
          proposalId={id}
          missionData={mission}
          refreshPage={refreshPage}
        />
      ))}
      <div ref={observerRef} />
    </>
  );
};

export default SuggestedMissionList;
