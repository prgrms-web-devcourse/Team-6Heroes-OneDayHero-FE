import { apiUrl } from "@/utils/url";

export const getTestMissions = async () => {
  const res = await fetch(apiUrl("/missions"));
  return await res.json();
};
