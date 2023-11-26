import { redirect } from "next/navigation";

import ErrorPage from "@/app/error";
import { getServerToken } from "@/app/utils/auth";
import ChattingClientContainer from "@/components/domain/chatting/ChattingClientContainer";
import { useGetChatRecordFetch, useGetChatRoomsFetch } from "@/services/chats";
import { useGetUserFetch } from "@/services/users";

const ChattingPage = async ({ params }: { params: { slug: string } }) => {
  const roomId = params.slug;
  const token = getServerToken();

  if (!token) redirect("/login?redirect=");

  const { isError: isChatRecordError, response: chatRecordResponse } =
    await useGetChatRecordFetch(roomId, token ?? "");
  const { isError: isChatRoomError, response: chatRoomResponse } =
    await useGetChatRoomsFetch(token ?? "");
  const { isError: isMeError, response: meResponse } = await useGetUserFetch(
    token ?? ""
  );

  if (
    isChatRecordError ||
    isChatRoomError ||
    isMeError ||
    !chatRecordResponse ||
    !chatRoomResponse ||
    !meResponse
  )
    return <ErrorPage />;

  return (
    <>
      <ChattingClientContainer roomId={roomId} />
    </>
  );
};

export default ChattingPage;
