import { join, printIf } from "../../../utils/ClassUtils";
import { useDropdown } from "./Dropdown";
import React from "react";

export interface DropdownItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export const DropdownItem = ({ value, children, className }: DropdownItemProps) => {
  const { onSelect, close } = useDropdown();

  const handleClick = () => {
    onSelect?.(value); // Llama a la lógica desde el padre
    close(); // Cierra el menu
  };

  return (
    <li
      onClick={handleClick}
      className={join(
        "flex items-center px-5 py-2 hover:bg-foreground-100/5 cursor-pointer gap-4",
        printIf("text-primary-600 dark:text-primary-300 bg-base-300/50", false),
        className
      )}
      tabIndex={0}
      role="menuitem"
    >
      {children}
    </li>
  );
};
