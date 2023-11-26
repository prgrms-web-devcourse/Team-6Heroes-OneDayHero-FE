import Link from "next/link";

import { formatDate } from "@/app/utils/formatDate";
import ProfileImage from "@/components/common/ProfileImage";
import { ArrayElement } from "@/types";
import { ChatRoomsResponse } from "@/types/response";

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
      className="flex w-full items-center gap-2 border-b-[1px] border-b-background-darken py-4">
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
            {formatDate(lastSentMessageTime)}
          </h3>
        </div>
        <div className="text-sm">{lastSentMessage}</div>
      </div>
      {headCount > 0 && (
        <div className="h-7 w-7 rounded-full bg-active text-center text-white">
          {headCount}
        </div>
      )}
    </Link>
  );
};

export default ChatRoomItem;
