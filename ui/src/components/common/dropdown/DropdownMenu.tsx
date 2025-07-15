import React, { type ReactElement } from "react";
import { useDropdown } from "./Dropdown";
import type { DropdownItemProps } from "./DropdownItem";
import { join } from "@/utils/ClassUtils";

interface DropdownMenuProps {
  children: ReactElement<DropdownItemProps> | ReactElement<DropdownItemProps>[];
  className?: string;
}

export const DropdownMenu = ({ children, className }: DropdownMenuProps) => {
  const { isOpen, close } = useDropdown();

  if (!isOpen) return null;

  return (
    <ul
      className={join("absolute mt-2 border rounded-xl shadow z-10 bg-content-50/40 backdrop-blur-3xl border-subtle overflow-hidden", className)}
      style={{ right: 0 }}
      role="menu"
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as any, { onClick: () => close() })
          : child
      )}
    </ul>
  );
};
