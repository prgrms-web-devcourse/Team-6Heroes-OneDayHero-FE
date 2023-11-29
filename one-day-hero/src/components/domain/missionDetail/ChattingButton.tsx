"use client";

import { useRouter } from "next/navigation";

import { getClientToken } from "@/app/utils/cookie";
import Button from "@/components/common/Button";
import { useToast } from "@/contexts/ToastProvider";
import { useUserId } from "@/contexts/UserIdProvider";
import { useCreateChatRoomFetch } from "@/services/chats";

type ChattingButtonProps = {
  missionId: number;
  citizenId: number;
};

const ChattingButton = ({ missionId, citizenId }: ChattingButtonProps) => {
  const { userId } = useUserId();
  const token = getClientToken() ?? "";

  const router = useRouter();
  const { showToast } = useToast();

  const { mutationalFetch } = useCreateChatRoomFetch(
    missionId,
    userId,
    citizenId,
    token
  );

  const handleClick = async () => {
    const { isError, response } = await mutationalFetch();

    if (isError || !response) {
      showToast("다시 시도해주세요", "error");
      return;
    }

    router.push(`/chatting/${response.data.id}`);
  };

  return (
    <Button size="sm" className="cs:grow" onClick={handleClick}>
      채팅하기
    </Button>
  );
};

export default ChattingButton;
