import { redirect } from "next/navigation";

import ErrorPage from "@/app/error";
import ChatRoomItem from "@/components/domain/chatting/ChatRoomItem";
import { useGetChatRoomsFetch } from "@/services/chats";
import { getServerToken } from "@/utils/auth";

const ChattingListPage = async () => {
  const token = getServerToken();

  if (!token) redirect("/login?redirect=");

  const { isError, response } = await useGetChatRoomsFetch(token);

  if (isError || !response) return <ErrorPage />;

  const { data } = response;

  return (
    <>
      {data.length > 0 && (
        <div className="border-b-background-darken w-full border-b-[1px]" />
      )}
      {data.map((item) => {
        return <ChatRoomItem key={item.id} {...item} />;
      })}
    </>
  );
};

export default ChattingListPage;
