"use client";

import { useRouter } from "next/navigation";

import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { useToast } from "@/contexts/ToastProvider";
import useModal from "@/hooks/useModal";
import { passRevalidateTag } from "@/services/base";
import { useCompleteMissionFetch, useCreateMatchFetch } from "@/services/chats";
import { getClientToken } from "@/utils/cookie";

interface MissionProgressButtonBarProps extends React.ComponentProps<"div"> {
  missionStatus:
    | "MATCHING"
    | "MATCHING_COMPLETED"
    | "MISSION_COMPLETED"
    | "EXPIRED";
  missionId: number;
  receiverId: number;
}

const MissionProgressButtonBar = ({
  missionStatus,
  missionId,
  receiverId,
  className = "",
  ...props
}: MissionProgressButtonBarProps) => {
  const token = getClientToken();
  const router = useRouter();

  const { mutationalFetch: createMatchFetch } = useCreateMatchFetch(
    missionId,
    receiverId,
    token ?? ""
  );
  const { mutationalFetch: completeMissionFetch } = useCompleteMissionFetch(
    missionId,
    token ?? ""
  );

  const { isOpen, onClose, onOpen } = useModal();

  const { showToast } = useToast();

  const handleMatchCompleteClick = () => {
    missionStatus === "MATCHING" && onOpen();
  };

  const handleMissionCompleteClick = () => {
    missionStatus === "MATCHING_COMPLETED" && onOpen();
  };

  const handleConfirm = async () => {
    const { isError } = await (missionStatus === "MATCHING"
      ? createMatchFetch(() => {
          passRevalidateTag(["progress", "matching"]);
        })
      : completeMissionFetch(() => {
          passRevalidateTag(["progress", "matching"]);
        }));

    if (isError) {
      showToast(
        `${
          missionStatus === "MATCHING" ? "매칭" : "미션"
        } 완료에 실패했습니다. 다시 시도해주세요`,
        "error"
      );
    } else {
      showToast(
        `${missionStatus === "MATCHING" ? "매칭" : "미션"}이 완료되었습니다`,
        "success"
      );

      onClose();
      router.refresh();
    }
  };

  const matchedState =
    missionStatus === "MATCHING_COMPLETED" ||
    missionStatus === "MISSION_COMPLETED"
      ? "active"
      : "inactive";

  const doneState =
    missionStatus === "MISSION_COMPLETED" ? "active" : "inactive";

  const defaultStyle = "flex w-full items-center justify-center";

  const buttonDefaultStyle = "shadow-moreDown h-14 w-14 rounded-full text-sm";

  const progressStyle = {
    active: "bg-primary hover:bg-primary-darken",
    inactive: "bg-inactive hover:bg-primary-darken"
  };

  return (
    <>
      <div className={`${defaultStyle} ${className}`} {...props}>
        <button className={`${progressStyle["active"]} ${buttonDefaultStyle}`}>
          매칭중
        </button>
        <span className="h-0 w-2/12 border border-black " />
        <button
          className={`${progressStyle[matchedState]} ${buttonDefaultStyle}`}
          onClick={handleMatchCompleteClick}>
          매칭완료
        </button>
        <span className="h-0 w-2/12 border border-black " />
        <button
          className={`${progressStyle[doneState]} ${buttonDefaultStyle}`}
          onClick={handleMissionCompleteClick}>
          미션완료
        </button>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <h1 className="mb-5 text-center text-xl font-semibold">
          {missionStatus === "MATCHING" && "매칭 완료"}
          {missionStatus === "MATCHING_COMPLETED" && "미션 완료"}
        </h1>
        <p className="mx-2 mb-5 break-keep">
          {missionStatus === "MATCHING" &&
            "해당 히어로에게 미션을 맡기시겠어요?"}
          {missionStatus === "MATCHING_COMPLETED" &&
            "히어로의 미션 수행이 완료되었나요?"}
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

export default MissionProgressButtonBar;
