"use client";

import ProfileImage from "@/components/common/ProfileImage";

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
        <ProfileImage
          src={imagePath}
          alt="profileImage"
          height={60}
          className="cs:mr-3 cs:shrink-0"
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
