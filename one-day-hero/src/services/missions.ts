import { apiUrl } from ".";

export const getTestMissions = async () => {
  const res = await fetch(apiUrl("/missions"));
  return res.json();
};
