"use client";
import Container from "@/components/common/Container";
import FooterButton from "@/components/common/FooterButton";
import MissionFullInfo from "@/components/common/Info/MissionFullInfo";
import { MatchingMissionListResponse, UserResponse } from "@/types/response";

type SuggestionFormProps = {
  missionListData: MatchingMissionListResponse["data"];
  heroData: UserResponse["data"];
};

const SuggestionForm = ({ missionListData, heroData }: SuggestionFormProps) => {
  const {
    missionResponses: { content }
  } = missionListData;
  return (
    <form id="suggest">
      <div className="flex w-full max-w-screen-sm flex-col items-center justify-center space-y-4">
        <h2 className="break-keep text-xl font-semibold">
          {`"${heroData.basicInfo.nickname}"`} 님에게 제안할 미션을 골라주세요!
        </h2>
        {content.map((item) => (
          <Container key={item.missionId} className="cs:m-0 cs:w-full">
            <MissionFullInfo data={dummyInfo} />
          </Container>
        ))}
      </div>
      <FooterButton formId="suggest">미션 제안하기</FooterButton>
    </form>
  );
};

const dummyInfo = {
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
  missionStatus: "MATCHING_COMPLETED" as const,
  missionImage: {
    originalName: "xxx.jpeg",
    path: "~~~~"
  }
};

export default SuggestionForm;
