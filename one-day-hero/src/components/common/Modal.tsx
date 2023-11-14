"use Client";

import React, { useEffect } from "react";

interface ModalProps extends React.ComponentProps<"div"> {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ isOpen, onClose, children, ...props }: ModalProps) => {
  useEffect(() => {
    const handleModalCloseKey = (e: KeyboardEvent) => {
      if (e.key === "Backspace" || e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleModalCloseKey);

    return () => {
      document.removeEventListener("keydown", handleModalCloseKey);
    };
  }, [onClose]);

  return isOpen ? (
    <div
      className="fixed left-0 top-0 z-[100] flex h-full w-full items-center justify-center bg-black bg-opacity-30"
      onClick={onClose}>
      <div
        className="w-11/12 max-w-md rounded-md bg-background p-3 shadow-down"
        onClick={(e) => e.stopPropagation()}
        {...props}>
        {children}
      </div>
    </div>
  ) : null;
};

export default Modal;
