"use client";

import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { PiWarningCircleFill } from "react-icons/pi";
import { TiDelete } from "react-icons/ti";

import { useToast } from "@/contexts/ToastProvider";

const defaultStyle =
  "shadow-down w-[300px] rounded-2xl font-semibold opacity-80 bg-white border border-gray-200 fixed inset-x-1/2 translate-x-[-50%] z-50";

const Toast = () => {
  const { toastActive, toastMessage, toastType } = useToast();

  useEffect(() => {
    if (!toastActive) return;
  }, [toastActive]);

  const iconType = {
    success: <FaCheckCircle size={22} className="text-primary" />,
    warn: <PiWarningCircleFill size={22} className="text-sub" />,
    error: <TiDelete size={22} className="text-red-600" />
  };

  return (
    <>
      {toastActive && (
        <div className={`${defaultStyle} animate-show-toast`}>
          <div className="flex items-center gap-3 p-4">
            <div className="flex-shrink-0">{iconType[toastType]}</div>
            <div className="text-sm text-gray-700">{toastMessage}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Toast;
