import Textarea from "@/components/common/Textarea";
import { useUserContext } from "@/context/UserContext";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import UserConfigModal from "../user/UserConfigModal";
import type { User } from "@/types/models/User";
import Avatar from "@/components/common/Avatar";
import { MessageCircle } from "lucide-react";
import Button from "@/components/common/Button";
import { generateId } from "@/utils/IdUtils";

interface Props {
  postId: string;
  commentId?: string | null;
  autoFocus?: boolean;
  inputId?: string; // Para manejar el focus de manera sencilla
}

const CommentForm = ({ postId, commentId, autoFocus }: Props) => {
  const { user } = useUserContext();
  const [isUserConfigOpen, setIsUserConfigOpen] = useState(false);
  const [inputId] = useState(generateId());
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
            onSaved={() => {
              setTimeout(() =>document.getElementById(inputId)?.focus(),200);
            }}
          />
        </>
      )}
      <CommentFormContent
        user={user}
        postId={postId}
        commentId={commentId}
        autoFocus={autoFocus}
        inputId={inputId}
      />
    </div>
  );
};

interface ContentProps {
  user: User | null;
  commentId?: string | null;
  postId: string;
  autoFocus?: boolean;
  inputId?: string;
}
const CommentFormContent = ({
  user,
  commentId,
  autoFocus,
  inputId,
}: ContentProps) => {
  const { t } = useTranslation();
  const [value, setValue] = useState("");
  const sanitizedValue = useMemo(() => value.trim(), [value]);

  const showSubmit = !!sanitizedValue || commentId; // Para las replies siempre muestro los botones 
  return (
    <div>
      <Textarea
        disabled={!user}
        id={inputId}
        placeholder={t(
          commentId ? "comments.replyPlaceholder" : "comments.placeholder"
        )}
        innerClassName="h-auto"
        maxLength={500}
        value={value}
        autoFocus={autoFocus}
        displayCharCount={!commentId}
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
      {showSubmit && (
        <div className="flex align-center justify-end mt-2 gap-2 animate-scale-in duration-200">
          <Button size="sm" variant="ghost">
            {t("common.cancel")}
          </Button>

          <Button size="sm" variant="solid" color="secondary" disabled={!sanitizedValue}>
            {t(commentId ? "comments.reply" : "comments.comment")}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CommentForm;
