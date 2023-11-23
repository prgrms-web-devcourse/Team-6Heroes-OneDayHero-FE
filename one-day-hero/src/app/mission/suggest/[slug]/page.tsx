import ErrorPage from "@/app/error";
import SuggestionForm from "@/components/domain/mission/suggest/SuggestionForm";
import { useGetSuggestingMissionListFetch } from "@/services/missions";
import { useGetUserFetch } from "@/services/users";

const MissionSuggestPage = async ({ params }: { params: { slug: string } }) => {
  /**@note TODO: getSessionID 사용하기 */
  const userId = 123;
  const heroId = parseInt(params.slug);

  const { data, fetchNextPage, hasNextPage } =
    await useGetSuggestingMissionListFetch(userId);
  const { isError: heroIsError, response: heroResponse } =
    await useGetUserFetch(heroId);

  if (heroIsError || !heroResponse) return <ErrorPage />;

  return (
    <SuggestionForm
      missionListData={data}
      heroData={heroResponse.data}
      heroId={heroId}
    />
  );
};

export default MissionSuggestPage;
