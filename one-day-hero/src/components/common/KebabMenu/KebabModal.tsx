"use client";

import { useRouter } from "next/navigation";

import { getClientToken } from "@/app/utils/cookie";
import { useToast } from "@/contexts/ToastProvider";
import { useMutationalFetch } from "@/services/base";
import { KebabMenuDataType } from "@/types";

import Button from "../Button";
import Modal from "../Modal";

type KebabModalProps = {
  isOpen: boolean;
  onClose: () => void;
  menuData: KebabMenuDataType | null;
};

const KebabModal = ({ isOpen, onClose, menuData }: KebabModalProps) => {
  const { apiPath, method, name, requiredData, description, redirectTo } =
    menuData || ({ apiPath: "", method: "GET", name: "" } as KebabMenuDataType);

  const token = getClientToken();

  const requestBody = requiredData?.reduce((acc, cur) => {
    const newAcc = { ...acc, [cur.name]: cur.default };
    return newAcc;
  }, {});

  const { mutationalFetch } = useMutationalFetch(apiPath ?? "", {
    method: method,
    headers: { Authorization: `Bearer ${token}` },
    body: requestBody ? JSON.stringify(requestBody) : undefined
  });

  const { showToast } = useToast();
  const router = useRouter();

  const handleConfirm = async () => {
    const { isError, response } = await mutationalFetch();

    if (isError) {
      showToast(`${name}에 오류가 발생했습니다. 다시 시도해주세요.`, "error");
      return;
    }

    showToast(`${name}에 성공했습니다.`, "success");
    redirectTo && router.push(redirectTo);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className="mb-5 text-center text-xl font-semibold">
        {description ?? name}
      </h1>
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
  );
};

export default KebabModal;
