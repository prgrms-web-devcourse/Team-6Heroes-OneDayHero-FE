import { MenuDataType } from ".";
import Button from "../Button";
import Modal from "../Modal";

interface KebabModalProp {
  isOpen: boolean;
  onClose: () => void;
  menuData: MenuDataType | null;
}

const KebabModal = ({ isOpen, onClose, menuData }: KebabModalProp) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className="text-xl font-semibold text-center mb-5">
        {menuData?.description ?? menuData?.name}
      </h1>
      <div className="flex justify-around">
        <Button theme="cancel" size="sm" onClick={onClose}>
          취소
        </Button>
        <Button theme="active" size="sm">
          확인
        </Button>
      </div>
    </Modal>
  );
};

export default KebabModal;
