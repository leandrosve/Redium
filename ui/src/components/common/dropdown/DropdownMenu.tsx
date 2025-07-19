import React, { useEffect, useRef, type ReactElement } from "react";
import { useDropdown } from "./Dropdown";
import type { DropdownItemProps } from "./DropdownItem";
import { join } from "@/utils/ClassUtils";

interface DropdownMenuProps {
  children: ReactElement<DropdownItemProps> | ReactElement<DropdownItemProps>[];
  className?: string;
  position?: "left" | "right";
}

export const DropdownMenu = ({ children, className, position = "left" }: DropdownMenuProps) => {
  const { isOpen, close } = useDropdown();

  if (!isOpen) return null;

  return (
    <ul
      className={join(
        "absolute mt-2 border top-full rounded-xl shadow z-10 bg-content-100 dark:bg-base backdrop-blur-3xl border-subtle overflow-hidden",
        position == "right" ? "left-0" : "right-0",
        className
      )}
      role="menu"
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child as any, { onClick: () => close() }) : child
      )}
    </ul>
  );
};
