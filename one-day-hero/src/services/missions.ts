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
