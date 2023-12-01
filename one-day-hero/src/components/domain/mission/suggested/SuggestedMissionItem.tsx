"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useTransition } from "react";

import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import MissionFullInfo from "@/components/common/Info/MissionFullInfo";
import Modal from "@/components/common/Modal";
import { useToast } from "@/contexts/ToastProvider";
import { useUserId } from "@/contexts/UserIdProvider";
import useModal from "@/hooks/useModal";
import { useCreateChatRoomFetch } from "@/services/chats";
import {
  useApproveProposalFetch,
  useRejectProposalFetch
} from "@/services/missions";
import { MissionItemResponse } from "@/types/response";
import { getClientToken } from "@/utils/cookie";

type SuggestedMissionItemProps = {
  proposalId: number;
  missionData: MissionItemResponse;
};

const SuggestedMissionItem = ({
  proposalId,
  missionData
}: SuggestedMissionItemProps) => {
  const token = getClientToken() ?? "";

  const { userId } = useUserId();

  const { isOpen, onClose, onOpen } = useModal();
  const { showToast } = useToast();
  const router = useRouter();
  const [isRejectPending, startRejectTranstion] = useTransition();
  const [isApprovePending, startApproveTranstion] = useTransition();

  const { mutationalFetch: rejectProposal, isLoading: isRejectLoading } =
    useRejectProposalFetch(proposalId, token);
  const { mutationalFetch: approveProposal, isLoading: isApproveLoading } =
    useApproveProposalFetch(proposalId, token);
  const { mutationalFetch: createChatRoom, isLoading: isCreateChatLoading } =
    useCreateChatRoomFetch(
      missionData.id,
      userId,
      missionData.citizenId,
      token
    );

  const handleRejectClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    onOpen();
  };

  const handleChattingClick: MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();

    const { isError: isApproveError, errorMessage: approveErrorMessage } =
      await approveProposal();

    if (isApproveError) {
      showToast(approveErrorMessage ?? "다시 시도해주세요", "error");
      return;
    }

    const { isError, errorMessage, response } = await createChatRoom();

    if (isError || !response) {
      showToast(errorMessage ?? "다시 시도해주세요", "error");
      return;
    }

    startApproveTranstion(() => {
      router.push(`/chatting/${response.data.id}`);
    });
  };

  const handleConfirm = async () => {
    const { isError } = await rejectProposal();

    if (isError) {
      showToast("제안 거절 중 오류가 발생했어요. 다시 시도해주세요", "error");
      return;
    }

    showToast(`${missionData.missionInfo.title} 미션을 거절했아요`, "success");
    onClose();

    startRejectTranstion(() => {
      router.refresh();
    });
  };

  return (
    <>
      <Link
        href={`/mission/${missionData.id}`}
        className="flex w-full max-w-screen-sm justify-center">
        <Container className="cs:w-11/12" missionStatus={missionData.status}>
          <MissionFullInfo
            bookmarkCount={missionData.bookmarkCount}
            region={missionData.region}
            missionCategory={missionData.missionCategory}
            missionInfo={missionData.missionInfo}
            missionImagePath={missionData.imagePath}
          />
          <div className="flex justify-center gap-1">
            <Button
              theme="cancel"
              size="sm"
              textSize="sm"
              className="cs:h-10"
              onClick={handleRejectClick}>
              거절하기
            </Button>
            <Button
              theme="primary"
              size="sm"
              textSize="sm"
              className="cs:h-10"
              onClick={handleChattingClick}
              disabled={
                isApproveLoading || isApprovePending || isCreateChatLoading
              }>
              채팅하기
            </Button>
          </div>
        </Container>
      </Link>
      <Modal isOpen={isOpen} onClose={onClose}>
        <h1 className="mb-5 text-center text-xl font-semibold">제안 거절</h1>
        <p className="mx-2 mb-5 break-keep">
          {`${missionData.missionInfo.title} 미션 제안을 거절하시겠어요?`}
        </p>
        <div className="flex justify-around">
          <Button
            theme="cancel"
            size="sm"
            className="cs:h-12 cs:w-4/12"
            onClick={onClose}>
            취소
          </Button>
          <Button
            theme="active"
            size="sm"
            className="cs:h-12 cs:w-4/12"
            onClick={handleConfirm}
            disabled={isRejectLoading || isRejectPending}>
            확인
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default SuggestedMissionItem;
