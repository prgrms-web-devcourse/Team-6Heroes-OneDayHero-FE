import { apiUrl } from "./urls";

export const getTestMissions = async () => {
  const res = await fetch(apiUrl("/missions"));
  return res.json();
};

export const getMission = async (missionId: string) => {
  try {
    const response = await fetch(apiUrl(`/missions/${missionId}`));
    return response.json();
  } catch (err) {
    console.error(err);
  }
};
