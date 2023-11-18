import { cookies } from "next/headers";

export const getServerToken = () => {
  const cookieStore = cookies();
  return cookieStore.get("token")?.value;
};
