import { redirect } from "next/navigation";

import ErrorPage from "@/app/error";
import ChattingClientContainer from "@/components/domain/chatting/ChattingClientContainer";
import Message from "@/components/domain/chatting/Message";
import {
  safeGetChatRecordFetch,
  safeGetChatRoomsFetch
} from "@/services/chats";
import { safeGetMissionFetch } from "@/services/missions";
import { safeGetUserFetch } from "@/services/users";
import { getServerToken, getServerUserId } from "@/utils/auth";
import { formatHour } from "@/utils/formatTime";

const ChattingPage = async ({ params }: { params: { slug: string } }) => {
  const roomId = params.slug;
  const token = getServerToken();
  const userId = getServerUserId() ?? "-1";

  if (!token) redirect("/login?redirect=");

  const { isError: isChatRecordError, response: chatRecordResponse } =
    await safeGetChatRecordFetch(roomId, token);
  const { isError: isChatRoomError, response: chatRoomResponse } =
    await safeGetChatRoomsFetch(token);
  const { isError: isMeError, response: meResponse } =
    await safeGetUserFetch(token);

  const thisRoomData = chatRoomResponse?.data.find(
    ({ id }) => id.toString() === roomId
  );

  const { isError: isMissionError, response: missionResponse } =
    await safeGetMissionFetch((thisRoomData?.missionId ?? 0).toString(), token);

  if (
    isMissionError ||
    isChatRecordError ||
    isChatRoomError ||
    isMeError ||
    !chatRecordResponse ||
    !chatRoomResponse ||
    !meResponse ||
    !missionResponse ||
    !thisRoomData
  )
    return <ErrorPage />;

  return (
    <>
      <ChattingClientContainer
        roomId={roomId}
        missionData={missionResponse.data}
        myImagePath={meResponse.data.image.path || ""}
        receiverId={thisRoomData.receiverId}
        receiverImagePath={thisRoomData.receiverImagePath}
        headCount={thisRoomData.headCount}
        senderNickname={meResponse.data.basicInfo.nickname}>
        {chatRecordResponse.data.map(
          ({ message, senderNickName, sentMessageTime, senderId }) => {
            const isMine = senderId === parseInt(userId);
            return (
              <Message
                key={`${senderId}_${sentMessageTime}`}
                imagePath={
                  isMine
                    ? meResponse.data.image.path || ""
                    : thisRoomData.receiverImagePath
                }
                message={message}
                ninkName={senderNickName}
                sentAt={formatHour(sentMessageTime)}
                isMine={senderId === parseInt(userId)}
              />
            );
          }
        )}
      </ChattingClientContainer>
    </>
  );
};

export default ChattingPage;
