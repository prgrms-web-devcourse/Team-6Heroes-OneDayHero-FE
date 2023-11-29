import { redirect } from "next/navigation";

import { getServerToken } from "@/app/utils/auth";
import SuggestedMissionList from "@/components/domain/mission/suggested/SuggestedMissionList";

const SuggestedMissionPage = () => {
  const token = getServerToken();

  if (!token) redirect("/login?redirect=");

  return (
    <div className="mt-20 flex w-full max-w-screen-sm flex-col items-center justify-center space-y-4">
      <SuggestedMissionList />
    </div>
  );
};

export default SuggestedMissionPage;
