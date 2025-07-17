import Textarea from "@/components/common/Textarea";
import { useUserContext } from "@/context/UserContext";
import { useMemo, useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import UserConfigModal from "../user/UserConfigModal";
import type { User } from "@/types/models/User";
import Avatar from "@/components/common/Avatar";
import { MessageCircle } from "lucide-react";
import Button from "@/components/common/Button";
import { generateId } from "@/utils/IdUtils";
import CommentService from "@/services/CommentService";
import { useCommentsContext } from "@/context/CommentsContext";
import { useOwnershipContext } from "@/context/OwnershipContext";

interface Props {
  postId: string;
  commentId?: string | null;
  autoFocus?: boolean;
  inputId?: string; // Para manejar el focus de manera sencilla
  onCancel?: () => void;
  onSuccess?: () => void;
}

const CommentForm = ({
  postId,
  commentId,
  autoFocus,
  onCancel,
  onSuccess,
}: Props) => {
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
              setTimeout(() => document.getElementById(inputId)?.focus(), 200);
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
        onCancel={onCancel}
        onSuccess={onSuccess}
        disabled={!user}
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
  onCancel?: () => void;
  onSuccess?: () => void;
  disabled?: boolean;
}
const CommentFormContent = ({
  user,
  commentId,
  postId,
  autoFocus,
  inputId,
  onCancel,
  onSuccess,
  disabled,
}: ContentProps) => {
  const { t } = useTranslation();
  const [value, setValue] = useState("");
  const sanitizedContent = useMemo(() => value.trim(), [value]);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [error, setError] = useState("");

  const { markCommentAsOwned } = useOwnershipContext();

  const { addComment } = useCommentsContext();

  const showSubmit = !disabled && (!!sanitizedContent || commentId); // Para las replies siempre muestro los botones

  const onSubmit = async (e:FormEvent) => {
    e.preventDefault();
    if (!sanitizedContent) return;
    if (!user) return;
    setIsSubmiting(true);
    setError("");
    const res = await CommentService.create(
      postId,
      sanitizedContent,
      commentId ?? null,
      user
    );

    if (res.hasError) {
      setError(res.error);
      setIsSubmiting(false);
      return;
    }

    addComment(res.data);
    markCommentAsOwned(res.data.id)
    onSuccess?.();
    setValue("");
    setIsSubmiting(false);
  };

  const handleCancel = () => {
    setValue("");
    onCancel?.();
  };
  return (
    <form onSubmit={onSubmit}>
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
          <Button size="sm" variant="ghost" onClick={handleCancel} type="reset">
            {t("common.cancel")}
          </Button>

          <Button
            size="sm"
            variant="solid"
            color="secondary"
            type="submit"
            loading={isSubmiting}
            disabled={!sanitizedContent}
          >
            {t(commentId ? "comments.reply" : "comments.comment")}
          </Button>
        </div>
      )}
    </form>
  );
};

export default CommentForm;
