"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import Button from "@/components/common/Button";
import { useToast } from "@/contexts/ToastProvider";
import { useUserId } from "@/contexts/UserIdProvider";
import { useCreateChatRoomFetch } from "@/services/chats";
import { getClientToken } from "@/utils/cookie";

type ChattingButtonProps = {
  missionId: number;
  citizenId: number;
};

const ChattingButton = ({ missionId, citizenId }: ChattingButtonProps) => {
  const { userId } = useUserId();
  const token = getClientToken() ?? "";

  const router = useRouter();
  const { showToast } = useToast();
  const [isPending, startTransition] = useTransition();

  const { mutationalFetch, isLoading } = useCreateChatRoomFetch(
    missionId,
    userId,
    citizenId,
    token
  );

  const handleClick = async () => {
    const { isError, errorMessage, response } = await mutationalFetch();

    if (isError || !response) {
      showToast(errorMessage ?? "다시 시도해주세요", "error");
      return;
    }

    startTransition(() => {
      router.push(`/chatting/${response.data.id}`);
    });
  };

  return (
    <Button
      size="sm"
      className="cs:grow"
      onClick={handleClick}
      disabled={isLoading || isPending}>
      채팅하기
    </Button>
  );
};

export default ChattingButton;
