import React from "react";
import { useDropdown } from "./Dropdown";

export const DropdownTrigger = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { toggle } = useDropdown();

  return <span onClick={toggle}>{children}</span>;
};
