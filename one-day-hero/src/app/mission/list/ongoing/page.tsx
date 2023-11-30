import { redirect } from "next/navigation";

import OngoingMissionList from "@/components/domain/mission/ongoing/OngoingMissionList";
import { getServerToken } from "@/utils/auth";

const OngoingMissionPage = () => {
  const token = getServerToken();

  if (!token) redirect("/login?redirect=");

  return (
    <div className="mt-20 w-full max-w-screen-sm space-y-4">
      <OngoingMissionList />
    </div>
  );
};

export default OngoingMissionPage;
