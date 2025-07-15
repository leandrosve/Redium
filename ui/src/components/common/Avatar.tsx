import { useMemo } from "react";
import {
  generateColorForNickname,
  getInitialsForName,
} from "@/utils/FormatUtils";

interface Props {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-7 h-7",
  md: "w-10 h-10",
  lg: "w-16 h-16",
};

const Avatar = ({ name, src, size = "md" }: Props) => {
  const [color, initials] = useMemo(() => {
    return [generateColorForNickname(name), getInitialsForName(name)];
  }, [name]);

  return (
    <span
      className={`text-white ${color}  overflow-hidden rounded-full flex items-center justify-center select-none relative ${sizeClasses[size]}`}
      role="img"
      aria-label={name}
    >
      {initials}
    </span>
  );
};

export default Avatar;
