import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { LogOut } from "lucide-react";
import UserConfigForm from "./UserConfigForm";
import { useUserContext } from "@/context/UserContext";
import type { User } from "@/types/models/User";
import { useTranslation } from "react-i18next";
import { useOwnershipContext } from "@/context/OwnershipContext";

interface Props {
  isOpen: boolean;
  onSaved?: () => void;
  onCleared?: () => void;
  onClose: (reason?: "saved" | "cleared" | "closed") => void;
}
const UserConfigModal = ({ isOpen, onSaved, onCleared, onClose }: Props) => {
  const { user, setUser } = useUserContext();
  const { clearAll } = useOwnershipContext();


  const onSubmit = (u: User) => {
    setUser(u);
    onSaved?.();
    onClose("saved");
  };

  const onLogOut = () => {
    setUser(null);
    clearAll();
    onCleared?.();
    location.reload();
    onClose("cleared");
  };
  const { t } = useTranslation();
  return (
    <Modal isOpen={isOpen} onClose={() => onClose("closed")}>
      <h2 className="text-lg font-semibold text-foreground-100 mb-4">
        {t(user ? "user.profile" : "user.firstThingFirst")}
      </h2>
      {!user && <p className="font-bold">{t("user.requireInfo")}</p>}

      {!!user && (
        <div>
          <h3 className="font-bold">{t("user.logout")}</h3>
          <div className="flex">
            <p className="flex-1">
              {t("user.logoutMessage")}
            </p>
            <Button
              variant="solid"
              color="secondary"
              onClick={onLogOut}
              className=" shrink-0"
            >
              <LogOut /> {t("user.logout")}
            </Button>
          </div>
        </div>
      )}
      <hr  className="border-subtle mt-4"/>

      <UserConfigForm
        onSubmit={onSubmit}
        initialData={user}
        submitMessage={t(user ? "common.save" : "common.continue")}
      />
    </Modal>
  );
};

export default UserConfigModal;
