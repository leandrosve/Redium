import Modal from "@/components/common/Modal";
import UserConfigForm from "./UserConfigForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const PostFormModal = ({ isOpen, onClose }: Props) => {
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Primero lo primero...">
      <UserConfigForm />
    </Modal>
  );
};

export default PostFormModal;
