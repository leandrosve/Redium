import Avatar from "@/components/common/Avatar";
import { join, printIf } from "@/utils/ClassUtils";
import React from "react";

const avatarSeeds = [...new Array(54)].map((_, i) => (i + 1).toString());

interface Props {
  onChange: (url: string) => void;
  value: string | null;
}
const prefix = "https://api.dicebear.com/9.x/bottts-neutral/svg?seed=";

const AvatarSelector = ({ onChange, value }: Props) => {
  const handleSelectAvatar = (e: React.MouseEvent | React.KeyboardEvent) => {
    const target = e.target as HTMLElement;
    const avatar = target.closest("[data-avatar]");
    if (!avatar) return;
    const seed = avatar.getAttribute("data-avatar");
    if (seed) {
      const url = prefix + seed;
      onChange(url);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault(); // evitar scroll con Space
      handleSelectAvatar(e);
    }
  };
  return (
    <div
      className="flex flex-wrap gap-2 items-center justify-center max-h-40 overflow-y-auto py-2"
      onClick={handleSelectAvatar}
      onKeyDown={handleKeyDown}
    >
      {avatarSeeds.map((seed) => {
        const url = prefix + seed;
        return (
          <AvatarOption
            key={seed}
            url={url}
            selected={value == url}
            seed={seed}
          />
        );
      })}
    </div>
  );
};

const AvatarOption = ({
  url,
  seed,
  selected,
}: {
  url: string;
  selected: boolean;
  seed: string;
}) => {
  return (
    <span
      key={seed}
      className={join(
        "cursor-pointer rounded-full border-3 border-transparent",
        printIf(" border-primary-400", selected)
      )}
      tabIndex={0}
      data-avatar={seed}
    >
      <Avatar name="" src={url} />
    </span>
  );
};
export default AvatarSelector;
