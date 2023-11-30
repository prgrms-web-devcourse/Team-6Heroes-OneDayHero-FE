"use client";

import { useRouter } from "next/navigation";

import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { useToast } from "@/contexts/ToastProvider";
import useModal from "@/hooks/useModal";
import { useChangeCitizenFetch, useChangeHeroFetch } from "@/services/users";
import { getClientToken } from "@/utils/cookie";

type HeroSwitchProps = {
  isHeroMode: boolean;
};

const HeroSwitch = ({ isHeroMode }: HeroSwitchProps) => {
  const token = getClientToken();

  const { isOpen, onOpen, onClose } = useModal();

  const router = useRouter();
  const { showToast } = useToast();

  const callback = () => {
    onClose();

    router.refresh();
  };

  const failCallback = () => {
    showToast("다시 시도해주세요", "error");
  };

  const { mutationalFetch: changeHero, isLoading: isHeroLoading } =
    useChangeHeroFetch(token ?? "", callback, failCallback);
  const { mutationalFetch: changeCitizen, isLoading: isCitizenLoading } =
    useChangeCitizenFetch(token ?? "", callback, failCallback);

  return (
    <>
      <div
        className={`relative h-8 w-20 cursor-pointer rounded-full ${
          isHeroMode ? "bg-sub-lightest" : "bg-neutral-200"
        }`}
        onClick={onOpen}>
        <div
          className={`absolute top-[0.125rem] h-7 w-7 rounded-full ${
            isHeroMode
              ? "bg-sub-darken hover:bg-sub right-[0.125rem]"
              : "bg-primary-darken hover:bg-primary left-[0.125rem]"
          }`}
        />
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <h1 className="mb-3 text-center text-xl font-semibold">
          {isHeroMode ? "시민으로 전환하시겠어요?" : "히어로로 전환하시겠어요?"}
        </h1>
        <p className="mx-2 mb-5 break-keep">
          {isHeroMode
            ? "시민이 되면 히어로 검색에서 제외되고 미션을 제안받을 수 없어요."
            : "히어로가 되면 히어로 검색에 노출되고 미션을 제안받을 수 있어요!"}
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
            theme="primary"
            size="sm"
            className="cs:h-12 cs:w-4/12"
            onClick={isHeroMode ? changeCitizen : changeHero}
            disabled={isHeroLoading || isCitizenLoading}>
            확인
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default HeroSwitch;
