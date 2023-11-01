"use Client";

import React, { useEffect } from "react";

interface ModalProp extends React.ComponentProps<"div"> {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ isOpen, onClose, children, ...props }: ModalProp) => {
  useEffect(() => {
    const handleModalCloseKey = (e: KeyboardEvent) => {
      if (e.key === "Backspace" || e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleModalCloseKey);

    return () => {
      document.removeEventListener("keydown", handleModalCloseKey);
    };
  }, []);

  return isOpen ? (
    <div
      className="z-20 fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex justify-center items-center"
      onClick={onClose}>
      <div
        className="w-11/12 max-w-md bg-background p-3 rounded-md shadow-down"
        onClick={(e) => e.stopPropagation()}
        {...props}>
        {children}
      </div>
    </div>
  ) : null;
};

export default Modal;
