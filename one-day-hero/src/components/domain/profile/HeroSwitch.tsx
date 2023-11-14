"use client";

import { revalidateTag } from "next/cache";
import { useRouter } from "next/navigation";

import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import useModal from "@/hooks/useModal";
import { useChangeCitizenFetch, useChangeHeroFetch } from "@/services/users";

type HeroSwitchProps = {
  isHeroMode: boolean;
};

const HeroSwitch = ({ isHeroMode }: HeroSwitchProps) => {
  const { isOpen, onOpen, onClose } = useModal();

  const router = useRouter();

  const callback = () => {
    onClose();

    revalidateTag("user1");
    router.refresh();
  };

  const failCallback = () => {
    /**@note TODO: 토스트 같은거 띄우기 */
  };

  const { mutationalFetch: changeHero } = useChangeHeroFetch(
    callback,
    failCallback
  );
  const { mutationalFetch: changeCitizen } = useChangeCitizenFetch(
    callback,
    failCallback
  );

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
              ? "right-[0.125rem] bg-sub-darken"
              : "left-[0.125rem] bg-primary-darken"
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
            onClick={isHeroMode ? changeCitizen : changeHero}>
            확인
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default HeroSwitch;
