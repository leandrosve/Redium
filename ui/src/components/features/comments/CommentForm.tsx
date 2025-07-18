import Textarea from "@/components/common/Textarea";
import { useUserContext } from "@/context/UserContext";
import {
  useMemo,
  useState,
  type FormEvent
} from "react";
import { useTranslation } from "react-i18next";
import type { User } from "@/types/models/User";
import Avatar from "@/components/common/Avatar";
import { MessageCircle } from "lucide-react";
import Button from "@/components/common/Button";
import { generateId } from "@/utils/IdUtils";
import CommentService from "@/services/CommentService";
import { useCommentsContext } from "@/context/CommentsContext";
import { useOwnershipContext } from "@/context/OwnershipContext";
import type { Comment } from "@/types/models/Comment";
import CheckUserWrapper from "../user/CheckUserWrapper";

interface Props {
  mode?: "create" | "edit";
  postId: string;
  comment: Comment | null; // Para la edicion
  parentId?: string | null;
  autoFocus?: boolean;
  inputId?: string; // Para manejar el focus de manera sencilla
  onCancel?: () => void;
  onSuccess?: () => void;
}

const CommentForm = ({
  mode = "create",
  postId,
  parentId,
  autoFocus,
  onCancel,
  onSuccess,
  comment,
}: Props) => {
  const { user } = useUserContext();
  const [inputId] = useState(generateId());
  return (
    <CheckUserWrapper
      onCompleted={() =>
        setTimeout(() => document.getElementById(inputId)?.focus(), 200)
      }
    >
      <CommentFormContent
        user={user}
        postId={postId}
        parentId={parentId}
        autoFocus={autoFocus}
        inputId={inputId}
        onCancel={onCancel}
        onSuccess={onSuccess}
        disabled={!user}
        mode={mode}
        comment={comment}
      />
    </CheckUserWrapper>
  );
};

interface ContentProps {
  mode?: "create" | "edit";
  comment: Comment | null; // Para la edicion
  user: User | null;
  parentId?: string | null;
  postId: string;
  autoFocus?: boolean;
  inputId?: string;
  onCancel?: () => void;
  onSuccess?: () => void;
  disabled?: boolean;
}
const CommentFormContent = ({
  user,
  parentId,
  postId,
  autoFocus,
  inputId,
  onCancel,
  onSuccess,
  disabled,
  comment,
  mode = "create",
}: ContentProps) => {
  const { t } = useTranslation();
  const [value, setValue] = useState(comment?.content ?? "");
  const sanitizedContent = useMemo(() => value.trim(), [value]);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [error, setError] = useState("");

  const { markCommentAsOwned } = useOwnershipContext();

  const { addComment, updateComment } = useCommentsContext();

  const showSubmit =
    mode == "edit" || (!disabled && (!!sanitizedContent || parentId)); // Para las replies siempre muestro los botones

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!sanitizedContent) return;
    if (!user) return;
    setIsSubmiting(true);
    setError("");

    const res = mode === "edit" && comment
      ? await CommentService.update(comment.postId, comment.id, sanitizedContent, user)
      : await CommentService.create(postId, sanitizedContent, parentId ?? null, user);

    if (res.hasError) {
      setError(res.error);
      return;
    }

    mode === "edit" ? updateComment(res.data) : addComment(res.data);
    markCommentAsOwned(res.data.id);
    onSuccess?.();
    setValue("");
    setIsSubmiting(false);
  };

  const handleCancel = () => {
    setValue("");
    onCancel?.();
  };

  let icon = null;
  if (mode === "create") {
    icon = user ? (
      <Avatar name={user.name} src={user.avatar} size="sm" className="mr-3" />
    ) : (
      <MessageCircle />
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <Textarea
        disabled={!user}
        id={inputId}
        placeholder={t(
          mode == "edit"
            ? "comments.editPlaceholder"
            : parentId
            ? "comments.replyPlaceholder"
            : "comments.placeholder"
        )}
        innerClassName={`h-auto pr-12 ${
          mode == "edit" ? "text-sm" : "text-md"
        }`}
        maxLength={500}
        value={value}
        autoFocus={autoFocus}
        displayCharCount={!parentId}
        onChange={(e) => setValue(e.target.value)}
        icon={icon}
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
            {t(parentId ? "comments.reply" : "comments.comment")}
          </Button>
        </div>
      )}
    </form>
  );
};

export default CommentForm;
