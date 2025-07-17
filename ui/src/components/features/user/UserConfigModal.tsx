import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { LogOut } from "lucide-react";
import UserConfigForm from "./UserConfigForm";
import { useUserContext } from "@/context/UserContext";
import type { User } from "@/types/models/User";
import { useTranslation } from "react-i18next";

interface Props {
  isOpen: boolean;
  onSaved?: () => void;
  onCleared?: () => void;
  onClose: (reason?: 'saved' | 'cleared' | 'closed') => void;
}
const UserConfigModal = ({ isOpen, onSaved, onCleared, onClose }: Props) => {
  const { user, setUser } = useUserContext();

  const onSubmit = (u: User) => {
    setUser(u);
    onSaved?.();
    onClose('saved');
  };

  const onClear = () => {
    setUser(null);
    onCleared?.();
    onClose('cleared');
  };
  const { t } = useTranslation();
  return (
    <Modal isOpen={isOpen} onClose={() => onClose('closed')}>
      <h2 className="text-lg font-semibold text-foreground-100 mb-4">
        {t(user ? "user.profile" : "user.firstThingFirst")}
      </h2>
      {!user && <p className="font-bold">{t("user.requireInfo")}</p>}

      {!!user && (
        <Button variant="outline" onClick={onClear} className="w-full">
          <LogOut /> {t("user.logout")}
        </Button>
      )}
      <UserConfigForm
        onSubmit={onSubmit}
        initialData={user}
        submitMessage={t(user ? "common.save" : "common.continue")}
      />
    </Modal>
  );
};

export default UserConfigModal;
