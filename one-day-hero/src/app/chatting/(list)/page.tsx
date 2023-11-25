import { redirect } from "next/navigation";

import ErrorPage from "@/app/error";
import { getServerToken } from "@/app/utils/auth";
import ChatRoomItem from "@/components/domain/chatting/ChatRoomItem";
import { useGetChatRoomsFetch } from "@/services/chats";

const ChattingListPage = async () => {
  const token = getServerToken();

  if (!token) redirect("/login?redirect=");

  const { isError, errorMessage, response } = await useGetChatRoomsFetch(token);
  console.log(errorMessage);

  if (isError || !response) return <ErrorPage />;
  console.log(response);

  const { data } = response;

  return (
    <>
      {data.map((item) => {
        return <ChatRoomItem key={item.id} {...item} />;
      })}
    </>
  );
};

export default ChattingListPage;
