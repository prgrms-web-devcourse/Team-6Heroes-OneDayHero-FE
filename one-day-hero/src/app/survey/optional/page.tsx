import { redirect } from "next/navigation";

import ErrorPage from "@/app/error";
import OptionalSurvey from "@/components/domain/survey/OptionalSurvey";
import { useGetUserFetch } from "@/services/users";
import { getServerToken } from "@/utils/auth";

const OptionalSurveyPage = async () => {
  const token = getServerToken();

  if (!token) {
    redirect("/login?redirect=");
  }

  const { isError, response } = await useGetUserFetch(token ?? "");

  if (isError || !response) return <ErrorPage />;

  return <OptionalSurvey {...response} />;
};

export default OptionalSurveyPage;
