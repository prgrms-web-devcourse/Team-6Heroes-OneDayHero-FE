import Image from "next/image";

import DefaultThumbnail from "/public/images/OneDayHero_logo_sm.svg";
import { formatDate } from "@/app/utils/formatDate";
import { ArrayElement } from "@/types";
import { ChatRoomsResponse } from "@/types/response";

type ChatRoomItemProps = ArrayElement<ChatRoomsResponse["data"]>;

const ChatRoomItem = ({
  title,
  receiverImagePath,
  receiverNickname,
  lastSentMessage,
  lastSentMessageTime,
  headCount
}: ChatRoomItemProps) => {
  return (
    <div className="flex w-full gap-2 border-b-[1px] border-b-background-darken">
      <div>
        <Image
          src={receiverImagePath || DefaultThumbnail}
          alt={`${receiverNickname}의 프로필`}
          width={60}
          className="pointer-events-none mr-3 shrink-0 rounded-full bg-neutral-200 object-fill"
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
      <div>{headCount}</div>
    </div>
  );
};

export default ChatRoomItem;
