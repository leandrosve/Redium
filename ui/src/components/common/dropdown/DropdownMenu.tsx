import React, { type ReactElement } from "react";
import { useDropdown } from "./Dropdown";
import type { DropdownItemProps } from "./DropdownItem";

interface DropdownMenuProps {
  children: ReactElement<DropdownItemProps> | ReactElement<DropdownItemProps>[];
}

export const DropdownMenu = ({ children }: DropdownMenuProps) => {
  const { isOpen, close } = useDropdown();

  if (!isOpen) return null;

  return (
    <ul
      className="absolute mt-2 border rounded-xl shadow z-10 bg-content-50/40 backdrop-blur-3xl border-subtle overflow-hidden"
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
