import { redirect } from "next/navigation";

import ErrorPage from "@/app/error";
import { getServerToken } from "@/app/utils/auth";
import SuggestionForm from "@/components/domain/mission/suggest/SuggestionForm";
import { useGetProfileFetch } from "@/services/users";

const MissionSuggestPage = async ({ params }: { params: { slug: string } }) => {
  const heroId = parseInt(params.slug);
  const token = getServerToken();

  if (!token) redirect("/login?redirect=");

  const { isError: heroIsError, response: heroResponse } =
    await useGetProfileFetch(heroId, false);

  if (heroIsError || !heroResponse) return <ErrorPage />;

  return <SuggestionForm heroData={heroResponse.data} heroId={heroId} />;
};

export default MissionSuggestPage;
