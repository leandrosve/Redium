import Avatar from "@/components/common/Avatar";
import { useUserContext } from "@/context/UserContext";
import { useState } from "react";
import UserConfigModal from "./UserConfigModal";

const UserDisplay = () => {
  const { user } = useUserContext();

  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  return (
    <>
      <button
        className="inline-flex gap-2 items-center text-md text-foreground-200 cursor-pointer rounded-full p-3 hover:bg-gray-400/5 "
        role="button"
        tabIndex={0}
        onClick={() => setIsOpen(true)}
      >
        <Avatar size="sm" name={user.name} src={user.avatar} />{" "}
        <span className="max-w-30 overflow-ellipsis line-clamp-1 max-sm:hidden">{user.name}</span>
      </button>
      <UserConfigModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default UserDisplay;
