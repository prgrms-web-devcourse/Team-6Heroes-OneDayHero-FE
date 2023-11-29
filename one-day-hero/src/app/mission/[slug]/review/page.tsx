import { redirect } from "next/navigation";

import ErrorPage from "@/app/error";
import { getServerToken } from "@/app/utils/auth";
import Button from "@/components/common/Button";
import TitleBox from "@/components/common/TitleBox";
import ReviewForm from "@/components/domain/review/ReviewForm";
import { useGetChatRoomsFetch } from "@/services/chats";
import { useGetMissionFetch } from "@/services/missions";

const ReviewCreatePage = async ({ params }: { params: { slug: string } }) => {
  const missionId = params.slug;
  const token = getServerToken();

  if (!token) redirect("/login?redirect=");

  const { isError: isMissionError, response: missionResponse } =
    await useGetMissionFetch(missionId, token);
  const { isError: isChatRoomError, response: chatRoomResponse } =
    await useGetChatRoomsFetch(token);

  if (
    isMissionError ||
    isChatRoomError ||
    !missionResponse ||
    !chatRoomResponse
  )
    return <ErrorPage />;

  const missionChatRoomData = chatRoomResponse.data.find(
    ({ missionId: chatMissionId }) => chatMissionId.toString() === missionId
  );

  const {
    data: { missionCategory, missionInfo }
  } = missionResponse;

  return (
    <div className="flex w-full flex-col items-center gap-5">
      <TitleBox category={missionCategory.name} title={missionInfo.title} />
      <ReviewForm
        receiverId={missionChatRoomData?.receiverId ?? -1}
        receiverNickname={missionChatRoomData?.receiverNickname ?? ""}
        missionId={parseInt(missionId)}
        categoryId={missionCategory.id}
        missionTitle={missionInfo.title}
      />
    </div>
  );
};

export default ReviewCreatePage;
