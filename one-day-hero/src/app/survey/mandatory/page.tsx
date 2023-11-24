import { redirect } from "next/navigation";

import ErrorPage from "@/app/error";
import { getServerToken } from "@/app/utils/auth";
import MandatorySurvey from "@/components/domain/survey/MandatorySurvey";
import { useGetUserFetch } from "@/services/users";

const MandatorySurveyPage = async () => {
  const token = getServerToken();

  if (!token) redirect("/login?redirect=");

  const { isError, response } = await useGetUserFetch(token ?? "");

  // console.log("res", response);

  if (isError || !response) return <ErrorPage />;

  return <MandatorySurvey {...response} />;
};

export default MandatorySurveyPage;
