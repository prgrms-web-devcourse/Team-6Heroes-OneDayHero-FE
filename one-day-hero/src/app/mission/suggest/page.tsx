import ErrorPage from "@/app/error";
import Container from "@/components/common/Container";
import MissionFullInfo from "@/components/common/Info/MissionFullInfo";
import { useGetMatchingMissionListFetch } from "@/services/missions";

const MissionSuggestPage = async () => {
  /**@note TODO: getSessionID 사용하기 */
  const userId = 123;

  const { isError, response } = await useGetMatchingMissionListFetch(userId);

  if (isError || !response) return <ErrorPage />;

  const {
    data: {
      missionResponses: { content }
    }
  } = response;

  return (
    <div className="flex w-full max-w-screen-sm flex-col items-center justify-center space-y-4">
      {content.map((item) => (
        <Container key={item.missionId} className="cs:w-11/12">
          <MissionFullInfo
            data={{
              id: 1,
              missionCategory: {
                id: 1,
                code: "MC_001",
                name: "서빙"
              },
              citizenId: 15,
              region: {
                id: 1,
                si: "서울시",
                gu: "마포구",
                dong: "동교동"
              },
              location: {
                x: 1234252.23,
                y: 1234252.23
              },
              missionInfo: {
                title: "더미 데이터 제목입니다.",
                content: "내용1",
                missionDate: "2023-12-4",
                startTime: "10:00",
                endTime: "10:30",
                deadlineTime: "10:00",
                price: 10000
              },
              bookmarkCount: 5,
              isBookmarked: true,
              missionStatus: "MATCHING_COMPLETED",
              missionImage: {
                originalName: "xxx.jpeg",
                path: "~~~~"
              }
            }}
          />
        </Container>
      ))}
    </div>
  );
};

export default MissionSuggestPage;
