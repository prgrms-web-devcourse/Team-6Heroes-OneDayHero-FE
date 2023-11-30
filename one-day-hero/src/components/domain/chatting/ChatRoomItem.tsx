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
  lastSentMessageTime,
  headCount
}: ChatRoomItemProps) => {
  return (
    <Link
      href={`/chatting/${id}`}
      className="border-b-background-darken flex w-full items-center gap-2 border-b-[1px] py-4">
      <div>
        <ProfileImage
          src={receiverImagePath}
          alt={`${receiverNickname}의 프로필`}
          height={60}
          className="mr-3 shrink-0"
        />
      </div>
      <div className="shrink grow">
        <div className="text-xs text-neutral-500">{title}</div>
        <div className="flex">
          <h2 className="font-semibold">{receiverNickname}</h2>
          <h3 className="ml-3 mt-1 text-xs font-semibold">
            {lastSentMessageTime && formatDate(lastSentMessageTime)}
          </h3>
        </div>
        <p className="max-w-[50vw] truncate text-sm">{lastSentMessage}</p>
      </div>
      {headCount > 0 && (
        <div className="bg-active h-7 w-7 rounded-full text-center text-white">
          {headCount}
        </div>
      )}
    </Link>
  );
};

export default ChatRoomItem;
