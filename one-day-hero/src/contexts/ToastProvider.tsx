"use client";

import { createContext, useContext, useState } from "react";

type ToastContextType = {
  // eslint-disable-next-line no-unused-vars
  showToast: (message: string, type: "warn" | "error" | "success") => void;
  hideToast?: () => void;
  toastActive: boolean;
  toastMessage: string;
  toastType: "warn" | "error" | "success";
};

const ToastContext = createContext<ToastContextType | null>(null);

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toastActive, setToastActive] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastType, setToastType] = useState<"warn" | "error" | "success">(
    "success"
  );

  const showToast = (message: string, type: "warn" | "error" | "success") => {
    setToastActive(true);
    setToastMessage(message);
    setToastType(type);

    setTimeout(() => {
      setToastActive(false);
    }, 3000);
  };

  const hideToast = () => {
    setToastActive(false);
  };

  return (
    <ToastContext.Provider
      value={{ showToast, hideToast, toastActive, toastMessage, toastType }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === null) {
    throw new Error("Toast Context 코드를 다시 확인해주세요.");
  }
  return context;
};

export default ToastProvider;
