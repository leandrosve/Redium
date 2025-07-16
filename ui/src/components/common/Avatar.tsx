import { useMemo, useState } from "react";
import {
  generateColorForNickname,
  getInitialsForName,
} from "@/utils/FormatUtils";
import { join, printIf } from "@/utils/ClassUtils";

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

  const [error, setError] = useState(false);
  return (
    <span
      className={`text-white ${color}  overflow-hidden rounded-full flex items-center justify-center select-none relative ${sizeClasses[size]}`}
      role="img"
      aria-label={name}
    >
      {initials}
      {src && <img src={src} alt={name} className={join("h-full w-full", printIf("hidden", error))} onError={() => setError(true)}/>}
    </span>
  );
};

export default Avatar;
