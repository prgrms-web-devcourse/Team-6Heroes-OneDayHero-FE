import ErrorPage from "@/app/error";
import SuggestionForm from "@/components/domain/mission/suggest/SuggestionForm";
import { useGetMatchingMissionListFetch } from "@/services/missions";
import { useGetUserFetch } from "@/services/users";

const MissionSuggestPage = async ({ params }: { params: { slug: string } }) => {
  /**@note TODO: getSessionID 사용하기 */
  const userId = 123;

  const { isError: missionIsError, response: missionResponse } =
    await useGetMatchingMissionListFetch(userId);
  const { isError: heroIsError, response: heroResponse } =
    await useGetUserFetch(parseInt(params.slug));

  if (missionIsError || heroIsError || !missionResponse || !heroResponse)
    return <ErrorPage />;

  return (
    <SuggestionForm
      missionListData={missionResponse.data}
      heroData={heroResponse.data}
    />
  );
};

export default MissionSuggestPage;
