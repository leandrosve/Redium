import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string | ReactNode;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    // Quitar scrollbar del <html> cuando el modal esta abierto
    if (isOpen) {
      document.documentElement.classList.add("no-scroll");
    } else {
      document.documentElement.classList.remove("no-scroll");
    }
    () => {
      document.documentElement.classList.remove("no-scroll");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <ModalContent isOpen={isOpen} onClose={onClose} title={title}>
      {children}
    </ModalContent>,
    document.body
  );
};

const ModalContent = ({ onClose, title, children }: ModalProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <div
        className="bg-content-100 rounded-2xl p-6 shadow-xl max-w-lg w-full animate-scale-in -mt-40 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="ghost"
          className="absolute end-1 top-1 p-3 h-11 w-11"
          onClick={onClose}
        >
          <X />
        </Button>
        {title && (
          <h2 className="text-lg font-semibold text-foreground-100 mb-4">
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
