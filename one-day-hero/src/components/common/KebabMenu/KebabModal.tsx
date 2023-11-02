import { MenuDataType } from ".";
import Button from "../Button";
import Modal from "../Modal";

type KebabModalProps = {
  isOpen: boolean;
  onClose: () => void;
  menuData: MenuDataType | null;
};

const KebabModal = ({ isOpen, onClose, menuData }: KebabModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className="text-xl font-semibold text-center mb-5">
        {menuData?.description ?? menuData?.name}
      </h1>
      <div className="flex justify-around">
        <Button
          theme="cancel"
          size="sm"
          className="cs:h-12 cs:w-4/12"
          onClick={onClose}>
          취소
        </Button>
        <Button theme="active" size="sm" className="cs:h-12 cs:w-4/12">
          확인
        </Button>
      </div>
    </Modal>
  );
};

export default KebabModal;
