import { redirect } from "next/navigation";

import HeroSearch from "@/components/domain/search/HeroSearch";
import { getServerToken } from "@/utils/auth";

const MissionRecordPage = () => {
  const token = getServerToken();

  if (!token) redirect("/login?redirect=");

  return <HeroSearch />;
};

export default MissionRecordPage;
