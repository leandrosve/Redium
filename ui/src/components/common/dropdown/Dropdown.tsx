import {
  createContext,
  useContext,
  useState, type ReactNode
} from "react";

interface DropdownContextType {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  onSelect?: (value: string) => void;
}

// Mini contexto para permitir composición y que el dropdown sea mas reutilizable
const DropdownContext = createContext<DropdownContextType | null>(null);

export const useDropdown = () => {
  const ctx = useContext(DropdownContext);
  if (!ctx) throw new Error("useDropdown debe usarse dentro de <Dropdown>");
  return ctx;
};

interface DropdownProps {
  onSelect?: (value: string) => void;
  children: ReactNode;
}

export const Dropdown = ({ children, onSelect }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);
  return (
    <DropdownContext.Provider value={{ isOpen, toggle, close, onSelect }}>
      <div className="relative inline-block">{children}</div>
    </DropdownContext.Provider>
  );
};
