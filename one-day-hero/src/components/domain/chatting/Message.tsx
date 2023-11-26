import ProfileImage from "@/components/common/ProfileImage";

type MessageProps = {
  message: string;
  ninkName: string;
  imagePath: string;
  sentAt: string;
  isMine: boolean;
};

const Message = ({
  message,
  ninkName,
  imagePath,
  sentAt,
  isMine
}: MessageProps) => {
  return (
    <div
      className={`mb-4 flex w-full max-w-sm gap-2 ${
        isMine ? "ml-auto flex-row-reverse" : "mr-auto flex-row"
      }`}>
      <div className="shrink-0">
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
        <div className="max-w-[60vw] break-words rounded-xl bg-white p-4">
          {message}
        </div>
      </div>
      <div className="flex flex-col-reverse">
        <p className="text-xs">{sentAt}</p>
      </div>
    </div>
  );
};

export default Message;
