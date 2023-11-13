import Link from "next/link";

import ErrorPage from "@/app/error";
import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import MissionFullInfo from "@/components/common/Info/MissionFullInfo";
import { useGetSuggestedMissionListFetch } from "@/services/missions";
import { MissionResponse } from "@/types/response";

const SuggestedMissionPage = async () => {
  const { isError, response } = await useGetSuggestedMissionListFetch();

  if (isError || !response) return <ErrorPage />;

  const { data } = response;

  return (
    <div className="mt-20 flex w-full max-w-screen-sm flex-col items-center justify-center space-y-4">
      {data &&
        data.map((item: MissionResponse["data"]) => (
          <Link
            href={`/mission/${item.id}`}
            className="flex w-full max-w-screen-sm justify-center"
            key={item.id}>
            <Container
              className="cs:w-11/12"
              missionStatus={item.missionStatus}>
              <MissionFullInfo data={item} />
              <div className="flex justify-center gap-1">
                <Button
                  theme="cancel"
                  size="sm"
                  textSize="sm"
                  className="cs:h-10">
                  거절하기
                </Button>
                <Button
                  theme="primary"
                  size="sm"
                  textSize="sm"
                  className="cs:h-10">
                  채팅하기
                </Button>
              </div>
            </Container>
          </Link>
        ))}
    </div>
  );
};

export default SuggestedMissionPage;
