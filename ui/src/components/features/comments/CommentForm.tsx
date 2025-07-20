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
import useCommentForm from "@/hooks/useCommentForm";

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
  const [inputId] = useState(generateId());

  const { isSubmiting, onSubmit } = useCommentForm({ mode: mode, postId, parentId, comment });

  const handleSubmit = async (content: string) => {
    const res = await onSubmit(content);
    if (res) {
      onSuccess?.();
      return true;
    }
    return false;
  };

  return (
    <CheckUserWrapper onCompleted={() => setTimeout(() => document.getElementById(inputId)?.focus(), 200)}>
      <CommentFormContent
        postId={postId}
        parentId={parentId}
        autoFocus={autoFocus}
        inputId={inputId}
        onCancel={onCancel}
        mode={mode}
        comment={comment}
        onSubmit={handleSubmit}
        isSubmiting={isSubmiting}
      />
    </CheckUserWrapper>
  );
};

export default CommentForm;
