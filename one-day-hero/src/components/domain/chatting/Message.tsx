"use client";

import Image from "next/image";

import DefaultThumbnail from "/public/images/OneDayHero_logo_sm.svg";

type MessageProps = {
  message: string;
  ninkName: string;
  imagePath: string;
  sentAt: string;
  userId: number;
};

const Message = ({
  message,
  ninkName,
  imagePath,
  sentAt,
  userId
}: MessageProps) => {
  const isMine = true;

  return (
    <div
      className={`flex w-full max-w-sm gap-2 ${
        isMine ? "ml-auto flex-row-reverse" : "mr-auto flex-row"
      }`}>
      <div>
        <Image
          src={imagePath || DefaultThumbnail}
          alt="profileImage"
          width={60}
          className="pointer-events-none mr-3 shrink-0 rounded-full bg-neutral-200 object-fill"
        />
      </div>
      <div className="shrink grow">
        <p className={`mb-2 text-xs ${isMine ? "text-right" : "text-left"}`}>
          {ninkName}
        </p>
        <div className="rounded-xl bg-white p-4">{message}</div>
      </div>
      <div className="flex flex-col-reverse">
        <p className="text-xs">{sentAt}</p>
      </div>
    </div>
  );
};

export default Message;
