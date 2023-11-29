import { cookies } from "next/headers";

export const getServerToken = () => {
  const cookieStore = cookies();
  return cookieStore.get("token")?.value;
};

export const getServerUserId = () => {
  const cookieStore = cookies();
  return cookieStore.get("userId")?.value;
};
