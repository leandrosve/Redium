import Avatar from "@/components/common/Avatar";
import Modal from "@/components/common/Modal";
import { useUserContext } from "@/context/UserContext";
import { useState } from "react";
import UserConfigForm from "./UserConfigForm";
import type { User } from "@/types/models/User";
import Button from "@/components/common/Button";
import { LogOut } from "lucide-react";

const UserDisplay = () => {
  const { user, setUser } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = (u: User) => {
    setUser(u);
    setIsOpen(false);
  };

  const onClear = () => {
    setUser(null);
    setIsOpen(false);
  };

  if (!user) return null;
  
  return (
    <>
      <div
        className="inline-flex gap-2 items-center text-md text-foreground-200 cursor-pointer rounded-full p-3 hover:bg-gray-400/5"
        role="button"
        tabIndex={0}
        onClick={() => setIsOpen(true)}
      >
        <Avatar size="sm" name={user.name} src={user.avatar} /> {user.name}
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={"Perfil"}>
        <Button variant="outline" onClick={onClear} className="w-full">
          <LogOut /> Cerrar Sesión
        </Button>
        <UserConfigForm
          onSubmit={onSubmit}
          initialData={user}
          submitMessage="Guardar"
        />
      </Modal>
    </>
  );
};

export default UserDisplay;
