import React from "react";
import { useDropdown } from "./Dropdown";

export const DropdownTrigger = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const { toggle } = useDropdown();

  return (
    <span onClick={toggle} className={className}>
      {children}
    </span>
  );
};
