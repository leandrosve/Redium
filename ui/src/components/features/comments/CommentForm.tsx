import { useUserContext } from "@/context/UserContext";
import { useState, type FormEvent } from "react";
import { generateId } from "@/utils/IdUtils";
import type { Comment } from "@/types/models/Comment";
import CheckUserWrapper from "../user/CheckUserWrapper";
import CommentFormContent from "./CommentFormContent";
import { useOwnershipContext } from "@/context/OwnershipContext";
import { useCommentsContext } from "@/context/CommentsContext";
import CommentService from "@/services/api/CommentService";

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
  const [isSubmiting, setIsSubmiting] = useState(false);
  const { addComment, updateComment } = useCommentsContext();

  const onSubmit = async (content: string) => {
    if (!content) return;
    if (!user) return;
    setIsSubmiting(true);

    const res =
      mode === "edit" && comment
        ? await CommentService.update(comment.postId, comment.id, content, user)
        : await CommentService.create(postId, content, parentId ?? null, user);

    if (res.hasError) {
      // mostrar toast
      return;
    }

    mode === "edit" ? updateComment(res.data) : addComment(res.data);
   
    onSuccess?.();
    setIsSubmiting(false);
  };
  
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
        onSubmit={onSubmit}
        isSubmiting={isSubmiting}
      />
    </CheckUserWrapper>
  );
};

export default CommentForm;
