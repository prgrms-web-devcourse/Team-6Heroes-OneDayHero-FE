"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEvent, useRef } from "react";

import { getClientToken } from "@/app/utils/cookie";
import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import MissionFullInfo from "@/components/common/Info/MissionFullInfo";
import Modal from "@/components/common/Modal";
import { useToast } from "@/contexts/ToastProvider";
import useModal from "@/hooks/useModal";
import {
  useGetSuggestedMissionListFetch,
  useRejectProposalFetch
} from "@/services/missions";

const SuggestedMissionList = () => {
  const token = getClientToken();
  const observerRef = useRef<HTMLDivElement | null>(null);
  const selectMissionRef = useRef<{ id: number; title: string }>({
    id: 0,
    title: ""
  });

  const { isOpen, onClose, onOpen } = useModal();
  const { showToast } = useToast();
  const router = useRouter();

  const { data } = useGetSuggestedMissionListFetch(
    "1",
    token ?? "",
    observerRef
  );

  const { mutationalFetch: rejectProposal } = useRejectProposalFetch();

  const handleRejectClick = (id: number, title: string) => (e: MouseEvent) => {
    e.preventDefault();

    selectMissionRef.current = { id, title };
    onOpen();
  };

  const handleConfirm = async () => {
    const { id, title } = selectMissionRef.current;

    const { isError } = await rejectProposal(
      `/mission-proposals/${id}/reject`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    if (isError) {
      showToast("제안 거절 중 오류가 발생했어요. 다시 시도해주세요", "error");
      return;
    }

    showToast(`${title} 미션을 거절했아요`, "success");
    onClose();

    router.refresh();
  };

  return (
    <>
      {data.map(({ id, mission }) => (
        <Link
          href={`/mission/${id}`}
          className="flex w-full max-w-screen-sm justify-center"
          key={id}>
          <Container className="cs:w-11/12" missionStatus={mission.status}>
            <MissionFullInfo
              bookmarkCount={mission.bookmarkCount}
              createdAt={mission.createdAt}
              region={mission.region}
              missionCategory={mission.missionCategory}
              missionInfo={mission.missionInfo}
            />
            <div className="flex justify-center gap-1">
              <Button
                theme="cancel"
                size="sm"
                textSize="sm"
                className="cs:h-10"
                onClick={handleRejectClick(id, mission.missionInfo.title)}>
                거절하기
              </Button>
              <Button
                theme="primary"
                size="sm"
                textSize="sm"
                className="cs:h-10">
                채팅하기
              </Button>
            </div>
          </Container>
        </Link>
      ))}
      <div ref={observerRef} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <h1 className="mb-5 text-center text-xl font-semibold">제안 거절</h1>
        <p className="mx-2 mb-5 break-keep">
          {`${selectMissionRef.current.title} 미션 제안을 거절하시겠어요?`}
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
            onClick={handleConfirm}>
            확인
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default SuggestedMissionList;
