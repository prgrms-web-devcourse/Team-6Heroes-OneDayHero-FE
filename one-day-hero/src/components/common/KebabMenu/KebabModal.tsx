"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { useToast } from "@/contexts/ToastProvider";
import { useMutationalFetch } from "@/hooks/useMutationalFetch";
import { KebabMenuDataType } from "@/types";
import { getClientToken } from "@/utils/cookie";

import Button from "../Button";
import Modal from "../Modal";

type KebabModalProps = {
  isOpen: boolean;
  onClose: () => void;
  menuData: KebabMenuDataType | null;
};

const KebabModal = ({ isOpen, onClose, menuData }: KebabModalProps) => {
  const {
    apiPath,
    method,
    name,
    requiredData,
    description,
    redirectTo,
    refresh
  } =
    menuData || ({ apiPath: "", method: "GET", name: "" } as KebabMenuDataType);
  const token = getClientToken();
  const [isPending, startTransition] = useTransition();

  const requestBody = requiredData?.reduce((acc, cur) => {
    const newAcc = { ...acc, [cur.name]: cur.default };
    return newAcc;
  }, {});

  const { mutationalFetch, isLoading } = useMutationalFetch(
    "backend",
    apiPath ?? "",
    {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: requestBody ? JSON.stringify(requestBody) : undefined
    }
  );

  const { showToast } = useToast();
  const router = useRouter();

  const handleConfirm = async () => {
    const { isError, errorMessage } = await mutationalFetch();

    if (isError) {
      showToast(`${name}에 오류가 발생했습니다. ${errorMessage}`, "error");
      return;
    }

    showToast(`${name}에 성공했습니다.`, "success");

    startTransition(() => {
      refresh && router.refresh();
      redirectTo && router.push(redirectTo);
    });
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
          onClick={handleConfirm}
          disabled={isLoading || isPending}>
          확인
        </Button>
      </div>
    </Modal>
  );
};

export default KebabModal;
