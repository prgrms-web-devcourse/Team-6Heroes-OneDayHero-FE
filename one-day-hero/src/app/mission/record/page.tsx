import { redirect } from "next/navigation";

import { getServerToken } from "@/app/utils/auth";
import RecordMissionList from "@/components/domain/mission/record/RecordMissionList";

const MissionRecordPage = () => {
  const token = getServerToken();

  if (!token) redirect("/login?redirect=");

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <RecordMissionList />
    </div>
  );
};

export default MissionRecordPage;
