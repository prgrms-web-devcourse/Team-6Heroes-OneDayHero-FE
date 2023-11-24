import { redirect } from "next/navigation";

import ErrorPage from "@/app/error";
import { getServerToken } from "@/app/utils/auth";
import ChatRoomItem from "@/components/domain/chatting/ChatRoomItem";
import { useGetChatRoomsFetch } from "@/services/chats";

const ChattingListPage = async () => {
  const token = getServerToken();

  if (!token) redirect("/login?redirect=");

  const { isError, response } = await useGetChatRoomsFetch(token);

  if (isError || !response) return <ErrorPage />;

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
