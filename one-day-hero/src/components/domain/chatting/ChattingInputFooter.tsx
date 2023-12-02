"use client";

import { ChangeEventHandler, useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";

import { useUserId } from "@/contexts/UserIdProvider";
import { MessageProps } from "@/hooks/useChatting";

type ChattingInputFooterProps = {
  sendMessage: (props: MessageProps) => void;
  roomId: string;
};

const ChattingInputFooter = ({
  sendMessage,
  roomId
}: ChattingInputFooterProps) => {
  const { userId } = useUserId();

  const [inputValue, setInputValue] = useState("");

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
  };

  const handleSend = () => {
    sendMessage({
      chatRoomId: roomId,
      senderId: userId,
      messageType: "TALK",
      message: inputValue,
      senderNickName: "howon"
    });

    setInputValue("");
  };

  const defaultStyle =
    "bg-background shadow-upper flex h-[4.5rem] max-w-screen-sm w-full items-center justify-around fixed bottom-0";

  return (
    <div className={`${defaultStyle}`}>
      <div className="flex-between flex h-[2.45rem] w-11/12 max-w-screen-sm items-center justify-center rounded-full bg-zinc-300 pl-3">
        <input
          className="h-9 w-11/12 rounded-full bg-zinc-300 px-2 focus:outline-0"
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.nativeEvent.isComposing) return;
            if (e.key === "Enter") handleSend();
          }}
        />
        <button
          onClick={handleSend}
          className="m-1 flex h-[2.2rem] w-[2.2rem] items-center justify-center rounded-full bg-primary hover:bg-primary-darken">
          <AiOutlineArrowUp className="m-1 h-full w-full" />
        </button>
      </div>
    </div>
  );
};

export default ChattingInputFooter;
