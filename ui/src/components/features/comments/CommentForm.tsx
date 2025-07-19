import { useUserContext } from "@/context/UserContext";
import { useState } from "react";
import { generateId } from "@/utils/IdUtils";
import type { Comment } from "@/types/models/Comment";
import CheckUserWrapper from "../user/CheckUserWrapper";
import CommentFormContent from "./CommentFormContent";
import { useCommentsContext } from "@/context/CommentsContext";
import CommentService from "@/services/api/CommentService";
import { useToast } from "@/components/common/Toast";
import { useTranslation } from "react-i18next";

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

const CommentForm = ({ mode = "create", postId, parentId, autoFocus, onCancel, onSuccess, comment }: Props) => {
  const { user } = useUserContext();
  const [inputId] = useState(generateId());
  const [isSubmiting, setIsSubmiting] = useState(false);
  const { addComment, updateComment } = useCommentsContext();
  const { toast } = useToast();
  const { t } = useTranslation();

  const onSubmit = async (content: string): Promise<boolean> => {
    if (!content) return false;
    if (!user) return false;
    setIsSubmiting(true);

    const res =
      mode === "edit" && comment
        ? await CommentService.update(comment.postId, comment.id, content, user)
        : await CommentService.create(postId, content, parentId ?? null, user);

    if (res.hasError) {
      toast(t("common.error"));
      setIsSubmiting(false);
      return false;
    }

    mode === "edit" ? updateComment(res.data) : addComment(res.data);

    onSuccess?.();
    toast(t(mode === "edit" ? "comments.saved" : "comments.published"));
    setIsSubmiting(false);
    return true;
  };

  return (
    <CheckUserWrapper onCompleted={() => setTimeout(() => document.getElementById(inputId)?.focus(), 200)}>
      <CommentFormContent
        user={user}
        postId={postId}
        parentId={parentId}
        autoFocus={autoFocus}
        inputId={inputId}
        onCancel={onCancel}
        disabled={!user}
        mode={mode}
        comment={comment}
        onSubmit={onSubmit}
        isSubmiting={isSubmiting}
      />
    </CheckUserWrapper>
  );
};

export default CommentForm;
