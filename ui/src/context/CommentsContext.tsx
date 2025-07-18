import useAPI from "@/hooks/useAPI";
import CommentService from "@/services/api/CommentService";
import type { Comment } from "@/types/models/Comment";
import { createContext, useCallback, useContext, type ReactNode } from "react";
import { useOwnershipContext } from "./OwnershipContext";

interface CommentsContextType {
  comments: Comment[];
  loading: boolean;
  error: string | null;
  addComment: (comment: Comment) => void;
  updateComment: (comment: Comment) => void;
  deleteComment: (id: string) => void;
}

const CommentsContext = createContext<CommentsContextType>({
  comments: [],
  loading: false,
  error: null,
  addComment: () => {},
  deleteComment: () => {},
  updateComment: () => {},
});

export const CommentsProvider = ({
  children,
  postId,
}: {
  postId: string;
  children: ReactNode;
}) => {
  const { markCommentAsOwned } = useOwnershipContext();
  const fetchFunction = useCallback(
    () => CommentService.list(postId),
    [postId]
  );
  const {
    loading,
    entity: comments,
    setEntity,
    error,
  } = useAPI<Comment[]>({ fetchFunction, initialData: [] });

  const addComment = (comment: Comment) => {
    setEntity((prev) => (prev ? [...prev, comment] : [comment]));
    markCommentAsOwned(comment.id);
  };
  const updateComment = (comment: Comment) => {
    setEntity((prev) =>
      prev ? prev.map((c) => (c.id === comment.id ? comment : c)) : [comment]
    );
    markCommentAsOwned(comment.id);
  };

  const deleteComment = (id: string) => {
    setEntity((prev) => (prev ? prev.filter((c) => c.id !== id) : []));
  };

  return (
    <CommentsContext.Provider
      value={{
        comments,
        loading,
        error,
        addComment,
        deleteComment,
        updateComment,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
};

export const useCommentsContext = () => {
  const context = useContext(CommentsContext);
  return context;
};
