import { useUserContext } from "@/context/UserContext";
import { useState, type PropsWithChildren } from "react";
import UserConfigModal from "./UserConfigModal";

interface Props extends PropsWithChildren {
  onCompleted?: () => void;
}

/*** Utilizado para envolver secciones que requieren autenticacion*/
const CheckUserWrapper = ({ children, onCompleted }: Props) => {
  const { user } = useUserContext();
  const [isUserConfigOpen, setIsUserConfigOpen] = useState(false);

  return (
    <div className="relative rounded-3xl">
      {!user && (
        <>
          <button
            aria-label="join"
            className="rounded-3xl absolute t-0 l-0 bg-gray-500/5 z-10 h-full w-full cursor-pointer hover:bg-gray-500/10"
            onClick={() => setIsUserConfigOpen(true)}
          />
          <UserConfigModal
            onClose={() => setIsUserConfigOpen(false)}
            isOpen={isUserConfigOpen}
            onSaved={onCompleted}
          />
        </>
      )}
      {children}
    </div>
  );
};

export default CheckUserWrapper;
