import { useToast } from "@/components/common/Toast";
import { useCommentsContext } from "@/context/CommentsContext";
import { useUserContext } from "@/context/UserContext";
import CommentService from "@/services/api/CommentService";
import type { Comment } from "@/types/models/Comment";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  mode: "edit" | "create";
  parentId?: string | null; // Para contestar a otro comentario
  comment: Comment | null; // Para editar un comentario existente
  postId: string;
}
const useCommentForm = ({ mode, parentId, comment, postId }: Props) => {
  const { user } = useUserContext();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const { addComment, updateComment } = useCommentsContext();
  const { toast } = useToast();
  const { t } = useTranslation();

  const onSubmit = useCallback(
    async (content: string): Promise<boolean> => {
      if (!content) return false;
      if (!user) return false;
      setIsSubmiting(true);

      const res =
        mode === "edit" && comment
          ? await CommentService.update(comment.postId, comment.id, content, user)
          : await CommentService.create(postId, content, parentId ?? null, user);

      if (res.hasError) {
        let error = t(`apiErrors.${res.error}`, { defaultValue: "" });
        if (!error) error = t("common.error");
        toast(error, "danger");
        setIsSubmiting(false);
        return false;
      }

      mode === "edit" ? updateComment(res.data) : addComment(res.data);

      toast(t(mode === "edit" ? "comments.saved" : "comments.published"));
      setIsSubmiting(false);
      return true;
    },
    [setIsSubmiting, updateComment, addComment, toast]
  );

  return {
    isSubmiting,
    onSubmit,
  };
};

export default useCommentForm;
