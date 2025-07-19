import { Ellipsis, PencilIcon, Trash2Icon } from "lucide-react";
import { useCallback } from "react";
import Button from "./Button";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "./dropdown";

interface Props {
  onEdit: () => void;
  onDelete: () => void;
  size?: 'sm' | 'md';
}

const sizeClasses = {
  sm: "p-4 h-4 w-4",
  md:"p-6 h-6 w-6"
}
const ActionMenu = ({ onEdit, onDelete, size='md' }: Props) => {
  const onSelect = useCallback(
    (value: string) => {
      if (value == "edit") {
        onEdit();
        return;
      }
      if (value == "delete") {
        onDelete();
      }
    },
    [onEdit, onDelete]
  );
  return (
    <Dropdown onSelect={onSelect}>
      <DropdownTrigger>
        <Button
          variant="ghost"
          className={sizeClasses[size]}
          rightIcon={<Ellipsis className="w-[1em] h-[1em] text-foreground-200" />}
        ></Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem value="edit" >
          <PencilIcon className="h-4 w-4" /> Edit
        </DropdownItem>
        <DropdownItem value="delete" >
          <Trash2Icon className="h-4 w-4"/> Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ActionMenu;
