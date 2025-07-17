import Modal from "@/components/common/Modal";
import { useUserContext } from "@/context/UserContext";
import PostForm from "./PostForm";
import Avatar from "@/components/common/Avatar";
import UserConfigModal from "../user/UserConfigModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const PostFormModal = ({ isOpen, onClose }: Props) => {
  const { user } = useUserContext();

  const onCloseConfig = (reason?: 'saved' | 'cleared' | 'closed') => {
    if (reason == 'closed') {
      onClose();
      return;
    }
  } 

  if (!user) return <UserConfigModal isOpen={isOpen} onClose={onCloseConfig}/>
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex gap-2 items-center">
          <Avatar name={user.name} src={user.avatar} size="sm" /> {user.name}
        </div>
      }
    >
      <PostForm onSuccess={onClose} user={user} />
    </Modal>
  );
};

export default PostFormModal;
