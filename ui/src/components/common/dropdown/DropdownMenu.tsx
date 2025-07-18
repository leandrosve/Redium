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

  const ref = useRef<HTMLUListElement>(null);

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

  if (!isOpen) return null;

  return (
    <ul
      ref={ref}
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
