import { redirect } from "next/navigation";

import ErrorPage from "@/app/error";
import { getServerToken, getServerUserId } from "@/app/utils/auth";
import { formatHour } from "@/app/utils/formatTime";
import ChattingClientContainer from "@/components/domain/chatting/ChattingClientContainer";
import Message from "@/components/domain/chatting/Message";
import { useGetChatRecordFetch, useGetChatRoomsFetch } from "@/services/chats";
import { useGetMissionFetch } from "@/services/missions";
import { useGetUserFetch } from "@/services/users";

const ChattingPage = async ({ params }: { params: { slug: string } }) => {
  const roomId = params.slug;
  const token = getServerToken();
  const userId = getServerUserId() ?? "-1";

  if (!token) redirect("/login?redirect=");

  const { isError: isChatRecordError, response: chatRecordResponse } =
    await useGetChatRecordFetch(roomId, token);
  const { isError: isChatRoomError, response: chatRoomResponse } =
    await useGetChatRoomsFetch(token);
  const { isError: isMeError, response: meResponse } =
    await useGetUserFetch(token);

  const thisRoomData = chatRoomResponse?.data.find(
    ({ id }) => id.toString() === roomId
  );

  const { isError: isMissionError, response: missionResponse } =
    await useGetMissionFetch((thisRoomData?.missionId ?? 0).toString(), token);

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
        receiverImagePath={thisRoomData.receiverImagePath}>
        {chatRecordResponse.data.map(
          ({ message, senderNickName, sentMessageTime, senderId }) => {
            return (
              <Message
                key={`${senderId}_${sentMessageTime}`}
                imagePath={thisRoomData.receiverImagePath}
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
