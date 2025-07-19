import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

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

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      document.documentElement.classList.remove("no-scroll-menu");
      return;
    }
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        close();
      }
    };
    document.documentElement.classList.add("no-scroll-menu");

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.documentElement.classList.remove("no-scroll-menu");
    };
  }, [isOpen, close]);
  
  return (
    <DropdownContext.Provider value={{ isOpen, toggle, close, onSelect }}>
      <div className="relative inline-block" ref={ref}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};
