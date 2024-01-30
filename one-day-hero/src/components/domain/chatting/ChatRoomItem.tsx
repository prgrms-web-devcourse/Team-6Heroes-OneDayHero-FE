import Link from "next/link";

import ProfileImage from "@/components/common/ProfileImage";
import { ArrayElement } from "@/types";
import { ChatRoomsResponse } from "@/types/response";
import { formatDate } from "@/utils/formatDate";

type ChatRoomItemProps = ArrayElement<ChatRoomsResponse["data"]>;

const ChatRoomItem = ({
  id,
  title,
  receiverImagePath,
  receiverNickname,
  lastSentMessage,
  lastSentMessageTime
}: ChatRoomItemProps) => {
  return (
    <Link
      href={`/chatting/${id}`}
      className="border-b-background-darken flex w-full items-center gap-2 border-b-[0.063rem] py-4">
      <div className="relative h-[3.75rem] w-[3.75rem]">
        <ProfileImage
          src={receiverImagePath}
          alt={`${receiverNickname}의 프로필`}
          fill
          className="mr-3 shrink-0"
        />
      </div>
      <div className="shrink grow">
        <div className="w-[16rem] truncate text-xs text-neutral-500">
          {title}
        </div>
        <div className="flex">
          <h2 className="font-semibold">{receiverNickname}</h2>
          <h3 className="ml-3 mt-1 text-xs font-semibold">
            {lastSentMessageTime && formatDate(lastSentMessageTime)}
          </h3>
        </div>
        <p className="max-w-[50vw] truncate text-sm">{lastSentMessage}</p>
      </div>
    </Link>
  );
};

export default ChatRoomItem;
