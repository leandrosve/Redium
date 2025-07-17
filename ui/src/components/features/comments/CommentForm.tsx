import Textarea from "@/components/common/Textarea";
import { useUserContext } from "@/context/UserContext";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import UserConfigModal from "../user/UserConfigModal";
import type { User } from "@/types/models/User";
import Avatar from "@/components/common/Avatar";
import { MessageCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import type { CommentContent } from "@/types/models/Comment";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/common/Button";

interface Props {
  postId: string;
}

const CommentForm = ({ postId }: Props) => {
  const { t } = useTranslation();
  const { user } = useUserContext();
  const [isUserConfigOpen, setIsUserConfigOpen] = useState(false);
  return (
    <div className="relative rounded-3xl">
      {!user && (
        <>
          <button
            aria-label="join"
            className="rounded-3xl absolute t-0 l-0 bg-gray-500/5 z-10 h-full w-full cursor-pointer hover:bg-gray-500/10"
            onClick={() => setIsUserConfigOpen(true)}
          />
          <UserConfigModal
            onClose={() => setIsUserConfigOpen(false)}
            isOpen={isUserConfigOpen}
          />
        </>
      )}
      <CommentFormContent user={user} />
    </div>
  );
};

interface ContentProps {
  user: User | null;
}
const CommentFormContent = ({ user }: ContentProps) => {
  const { t } = useTranslation();
  const [value, setValue] = useState("");

  return (
    <div>
      <Textarea
        disabled={!user}
        placeholder={t("comments.placeholder")}
        innerClassName="h-auto max-h-[20em]"
        maxLength={500}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        icon={
          user ? (
            <Avatar
              name={user.name}
              src={user.avatar}
              size="sm"
              className="mr-3"
            />
          ) : (
            <MessageCircle />
          )
        }
      />
      {!!value && (
        <div className="flex align-center justify-end mt-2 gap-2 animate-scale-in duration-200">
          <Button size="sm" variant="ghost" >
            {t("common.cancel")}
          </Button>

          <Button size="sm" variant="solid" color="secondary">
            {t("comments.comment")}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CommentForm;
