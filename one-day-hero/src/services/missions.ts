import { apiUrl } from "./urls";

export const getTestMissions = async () => {
  const res = await fetch(apiUrl("/missions"));
  return res.json();
};

export const getMission = async (missionId: string) => {
  return fetch(apiUrl(`/missions/${missionId}`)).then((data) => data.json());
};
