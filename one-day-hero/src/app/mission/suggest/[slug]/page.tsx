import { redirect } from "next/navigation";

import ErrorPage from "@/app/error";
import SuggestionForm from "@/components/domain/mission/suggest/SuggestionForm";
import { safeGetProfileFetch } from "@/services/users";
import { getServerToken } from "@/utils/auth";

const MissionSuggestPage = async ({ params }: { params: { slug: string } }) => {
  const heroId = parseInt(params.slug);
  const token = getServerToken();

  if (!token) redirect("/login?redirect=");

  const { isError: heroIsError, response: heroResponse } =
    await safeGetProfileFetch(heroId, false, token);

  if (heroIsError || !heroResponse) return <ErrorPage />;

  return <SuggestionForm heroData={heroResponse.data} heroId={heroId} />;
};

export default MissionSuggestPage;
