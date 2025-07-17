import useAPI from "@/hooks/useAPI";
import CommentService from "@/services/CommentService";
import type { Comment } from "@/types/models/Comment";
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface CommentsContextType {
  comments: Comment[];
  loading: boolean;
  error: string | null;
  addComment: (comment: Comment) => void;
  deleteComment: (id: string) => void;
}

const CommentsContext = createContext<CommentsContextType>({
  comments: [],
  loading: false,
  error: null,
  addComment: () => {},
  deleteComment: () => {},
});

export const CommentsProvider = ({ children , postId}: { postId: string, children: ReactNode }) => {
  const fetchFunction = useCallback(
    () => CommentService.list(postId),
    [postId]
  );
    const {
    loading,
    entity: comments,
    setEntity,
    error,
  } = useAPI<Comment[]>({ fetchFunction, initialData:[] });

  const addComment = (comment: Comment) => {
    setEntity((prev) => prev ? [...prev, comment] : [comment]);
  };

  const deleteComment = (id: string) => {
    setEntity((prev) => prev ? prev.filter((c) => c.id !== id) : []);
  };

  return (
    <CommentsContext.Provider value={{ comments, loading, error, addComment, deleteComment }}>
      {children}
    </CommentsContext.Provider>
  );
};

export const useCommentsContext = () => {
  const context = useContext(CommentsContext);
  return context;
};
