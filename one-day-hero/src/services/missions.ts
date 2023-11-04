import { apiUrl } from "./urls";

export const getTestMissions = async () => {
  const res = await fetch(apiUrl("/missions"));
  return res.json();
};

export const getMission = async (missionId: string) => {
  return fetch(apiUrl(`/missions/${missionId}`)).then((data) => data.json());
};

export const getOngoingMissionList = async () => {
  return fetch(apiUrl(`/missions/list/ongoing`), {
    cache: "no-store"
  }).then((data) => data.json());
};

export const getSuggestedMissionList = async () => {
  return fetch(apiUrl(`/missions/list/suggested`), {
    cache: "no-store"
  }).then((data) => data.json());
};
