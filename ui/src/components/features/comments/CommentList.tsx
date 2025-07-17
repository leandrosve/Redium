import { useTranslation } from "react-i18next";
import Skeleton from "@/components/common/Skeleton";
import ErrorMessage from "@/components/common/ErrorMessage";
import { CircleOff, MessageCircleOff } from "lucide-react";
import CommentService, { type BasicFilters } from "@/services/CommentService";
import type { Comment } from "@/types/models/Comment";
import CommentListItem from "./CommentListItem";
import { useCallback } from "react";
import useAPI from "@/hooks/useAPI";
import useCommentTree from "@/hooks/useCommentTree";
import { useCommentsContext } from "@/context/CommentsContext";

interface Props {
  postId: string;
}

const CommentList = ({ postId }: Props) => {
  const {loading, comments, error }=useCommentsContext();

  const isEmpty = !loading && comments?.length === 0 && !error;

  const { t } = useTranslation();

  return (
    <div className="flex flex-col w-full gap-2 items-stretch bg-content-100 rounded-2xl p-4">
      {loading && <Skeleton repeat={5} className="h-30" />}

      {!loading && !!comments && (
        <div className="flex flex-col gap-4 ">
          <CommentListContent comments={comments} />
        </div>
      )}

      {error && <ErrorMessage />}

      {!loading && isEmpty && (
        <div className="text-center w-full p-5 font-bold text-sm text-foreground-200 relative">
          <MessageCircleOff className="h-14 w-14 opacity-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          {t("comments.empty")}
        </div>
      )}
    </div>
  );
};

const CommentListContent = ({ comments }: { comments: Comment[] }) => {
  const commentTree = useCommentTree(comments);
  return (
    <div className="flex flex-col">
      {commentTree.map((c) => (
        <CommentListItem key={c.id} comment={c} nestingLevel={0} />
      ))}
    </div>
  );
};

export default CommentList;
