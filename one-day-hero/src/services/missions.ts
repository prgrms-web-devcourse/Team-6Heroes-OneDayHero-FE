import { MissionResponse } from "@/app/mission/record/page";

import { apiUrl } from "./urls";

export const getTestMissions = async () => {
  const res = await fetch(apiUrl("/missions"));
  return res.json();
};

export const getMission = async (missionId: string) => {
  return fetch(apiUrl(`/missions/${missionId}`)).then((data) => data.json());
};

export const getCompletedMission = async (): Promise<{
  data: MissionResponse[];
}> => {
  const response = await fetch(apiUrl(`/missions/record`), {
    next: { tags: ["record"] }
  });

  return response.json();
};

export const postBookmark = async (missionId: number, userId: number) => {
  const response = await fetch(apiUrl("/bookmarks"), {
    method: "POST",
    body: JSON.stringify({
      missionId,
      userId
    })
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
};

export const deleteBookmark = async (missionId: number, userId: number) => {
  const response = await fetch(apiUrl("/bookmarks"), {
    method: "DELETE",
    body: JSON.stringify({
      missionId,
      userId
    })
  });

  return response.json();
};

export const getOngoingMissionList = async () => {
  return fetch(apiUrl(`/missions/list/ongoing`), {
    next: { tags: [`ongoing`] }
  }).then((data) => data.json());
};

export const getSuggestedMissionList = async () => {
  return fetch(apiUrl(`/missions/list/suggested`), {
    next: { tags: [`suggested`] }
  }).then((data) => data.json());
};
