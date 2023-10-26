import { apiUrl } from "@/services";

export const getTestMissions = async () => {
  const res = await fetch(apiUrl("/missions"));
  return await res.json();
};
