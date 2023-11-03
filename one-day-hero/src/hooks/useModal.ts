import { useState } from "react";

const useModal = () => {
  const [showModal, setShowModal] = useState(false);

  const onOpen = () => setShowModal(true);
  const onClose = () => setShowModal(false);

  return { isOpen: showModal, onOpen, onClose };
};

export default useModal;
