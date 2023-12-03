import { redirect } from "next/navigation";

import MissionSearch from "@/components/domain/search/MissionSearch";
import { getServerToken } from "@/utils/auth";

const MissionRecordPage = () => {
  const token = getServerToken();

  if (!token) redirect("/login?redirect=");

  return <MissionSearch />;
};

export default MissionRecordPage;
