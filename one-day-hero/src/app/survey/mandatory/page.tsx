import { redirect } from "next/navigation";

import ErrorPage from "@/app/error";
import MandatorySurvey from "@/components/domain/survey/MandatorySurvey";
import { safeGetUserFetch } from "@/services/users";
import { getServerToken } from "@/utils/auth";

const MandatorySurveyPage = async () => {
  const token = getServerToken();

  if (!token) redirect("/login?redirect=");

  const { isError, response } = await safeGetUserFetch(token ?? "");

  if (isError || !response) return <ErrorPage />;

  return <MandatorySurvey {...response} />;
};

export default MandatorySurveyPage;
