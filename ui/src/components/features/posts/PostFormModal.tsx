import Modal from "@/components/common/Modal";
import UserConfigForm from "@/components/features/user/UserConfigForm";
import { useUserContext } from "@/context/UserContext";
import type { User } from "@/types/models/User";
import PostForm from "./PostForm";
import Avatar from "@/components/common/Avatar";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const PostFormModal = ({ isOpen, onClose }: Props) => {
  const { user } = useUserContext();
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        user ? (
          <div className="flex gap-2 items-center">
            <Avatar name={user.name} src={user.avatar} size="sm" /> {user.name}
          </div>
        ) : (
          "Primero lo primero..."
        )
      }
    >
      {user ? <PostForm onSuccess={onClose} user={user} /> : <UserConfigStep />}
    </Modal>
  );
};

const UserConfigStep = () => {
  const { user, setUser } = useUserContext();
  const onSubmitUser = (u: User) => setUser(u);
  return (
    <div>
      <div>
        ¿Quién eres? Dinos tu nombre y elige un avatar para que los demás te
        reconozcan.
      </div>
      <UserConfigForm
        initialData={user}
        onSubmit={onSubmitUser}
        submitMessage="Continuar"
      />
    </div>
  );
};

export default PostFormModal;
