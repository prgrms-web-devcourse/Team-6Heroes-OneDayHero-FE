import { MenuDataType } from ".";
import Modal from "../Modal";

interface KebabModalProp {
  isOpen: boolean;
  onClose: () => void;
  menuData: MenuDataType | null;
}

const KebabModal = ({ isOpen, onClose, menuData }: KebabModalProp) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {menuData?.name}
    </Modal>
  );
};

export default KebabModal;
